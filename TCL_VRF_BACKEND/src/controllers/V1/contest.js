import { Contest, Participant } from "../../models";
import Db from "../../services/queries";
import ContestCampaign from "../../lib/contest";
import { ContractAddresses, NetworkRPCURL } from '../../contracts/constants';

export default class ContestControllers {
    /**
     *
     * @param {*} payload
     */
    static async createNew(payload) {
        try {
            try {
                //payload.announceDate = new Date(payload.announceDate)
                console.log(payload.announceDate)
                await Db.saveData(Contest, {
                    ...payload
                });

                return true
            }
            catch (_err) {
                throw _err
            }
        }
        catch (_err) {
            throw _err
        }
    }

    static async participate(payload) {
        try {

            const isSameIdExistInContestCollection = await Db.getData(Contest, { _id: payload.contestId })
            const isSameIdExistInParticipantCollection = await Db.getData( Participant, { contestId: payload.contestId } )
            
            if(!isSameIdExistInContestCollection) throw new Error("contest of given id does not exist");
            
            if(isSameIdExistInParticipantCollection.length === 0) {
                
                const {contestId, task} = payload;
                const walletAddress = [ payload.walletAddress ];

                await Db.saveData(Participant, {
                    contestId,
                    task,
                    walletAddress
                })

                return true;
            }
            else {
                console.log(isSameIdExistInParticipantCollection)

                const {contestId, task} = payload;
                var walletAddress = isSameIdExistInParticipantCollection[0].walletAddress;

                if(walletAddress.indexOf(payload.walletAddress) > -1) {
                    throw new Error("address already exist")
                }

                walletAddress.push(payload.walletAddress);

                await Db.findAndUpdate( Participant, { contestId }, { walletAddress } )

                return true;
            }
        }
        catch (_err) {
            throw _err
        }
    }

    static async removeContestant(payload) {
        try {
            // const contest = await Db.getDataOne(Contest, { contestId: payload.contestId })
            const participant = await Db.getDataOne(Participant, { contestId: payload.contestId })
            if(!participant) throw new Error("participant of given id does not exist");

            // var { constantsAddresses } = contest;
            var { walletAddress } = participant;

            if(walletAddress.indexOf(payload.walletAddress) > -1) {
                walletAddress =  walletAddress.filter(address => address !== payload.walletAddress)
            }
            else {
                throw new Error("Given address does not exist")
            }
            await Db.updateOne(Participant, { contestId: payload.contestId }, { walletAddress })

            return true
        }
        catch (_err) {
            throw _err
        }
    }

    static async getParticipants(payload) {
        try {
            const rows = await Db.getData(Participant,  { contestId: payload.contestId })
            const addresses = rows.map(row => row.walletAddress);

            return addresses
        }
        catch (_err) {
            throw _err
        }
    }

    static async getWinners(payload) {
        try {
            console.log(payload)
            const rows = await Db.getData(Contest, { _id: payload.contestId })
            const winners = [...rows.map(row => row.winners)];
            return winners
        }
        catch (_err) {
            throw _err
        }
    }

    static async getAllContests() {
        try {
            const contests = await Db.getData(Contest, {});
            return contests
        }
        catch (_err) {

        }
    }

    static async drawContest(payload) {
        try {
            const contest = await Db.getDataOne(Contest, { _id: payload.contestId })
            const participate = await Db.getDataOne(Participant, { contestId: payload.contestId })
            if(!contest || !participate) throw new Error("can't find contest or participate that matched with contest id")
            
            const { contestAnnounced, winnerCount } = contest;
            const { walletAddress } = participate;

            if(contestAnnounced) {
                throw new Error("Contest already anounced")
            }
            
            if(winnerCount <= 0 || !winnerCount) {
                throw new Error("Invalid winnerCount")
            }

            if(!walletAddress || walletAddress.length < winnerCount) {
                throw new Error("number of walletAddress must be greater than winnerCount")
            }

            const contestController = new ContestCampaign(NetworkRPCURL, process.env.PRIVATE_KEY, ContractAddresses.ContestCampaign);
            
            try {
                await contestController.requestRandomWords()
                await contestController.txWait(30)
                const randomRes = await contestController.expand(winnerCount, walletAddress.length)
                const randomRes_SafeNumber = randomRes.map(value => parseInt(value['_hex'], 16))

                const winnerList = randomRes_SafeNumber.map(value => walletAddress[value])
                await Db.updateOne(Contest, { _id: payload.contestId }, { winners: winnerList, contestAnnounced: true, announceDate: new Date() })
                return true
            }
            catch (_err) {
                throw _err
            }
        }
        catch (_err) {
            throw _err
        }
    }

    // static async loginWithPhonenumber(payload) {
    //     try {
    //         let userMetadata,
    //             offerBonus = true;
    //         const dataToInsert = { deviceId: payload.deviceId };

    //         if (process.env.NODE_ENV == "local") {
    //             userMetadata =  {phoneNumber: "+919875676763"} ;
    //         } else {
    //             console.log("---userMetadatauserMetadata---1>>", payload);
    //             userMetadata = {phoneNumber: payload.phoneNumber};
    //             console.log("---userMetadatauserMetadata---2>>", userMetadata);
    //         }

    //         const userExist = await Db.getDataOne(
    //             Contest,
    //             { phone: payload.phoneNumber }
    //         )

    //         if(userExist) return userExist

    //         //get current bonus amounts set in the system
    //         const appConstants = await Db.getDataOne(
    //             AppConstants,
    //             {},
    //             {},
    //             { lean: true }
    //         );

    //         if (payload.deviceId) {
    //             //check if referral is valid and same device hasn't been used for the same referral code
    //             if (payload.referredBy && payload.referalCode) {
    //                 const sameReferralSameDeviceUser = await Db.getDataOne(
    //                     Contest,
    //                     {
    //                         referredBy: payload.referredBy,
    //                         deviceId: payload.deviceId,
    //                     },
    //                     { _id: 1 },
    //                     { lean: true }
    //                 );

    //                 const refferProvider = await Db.getDataOne(
    //                     Contest,
    //                     { _id: payload.referredBy },
    //                 )

    //                 if(refferProvider.createdRefer !== payload.referalCode || payload.referalCode === "") {
    //                     console.log(refferProvider.createdRefer, payload.referalCode)
    //                     throw "Refer code is not valid"
    //                 }
    //                 else {
    //                     if (sameReferralSameDeviceUser)
    //                         throw "This device is already registered through a referral";
    //                     else {
    //                         dataToInsert["referredBy"] = payload.referredBy;
    //                         dataToInsert["referalCode"] = payload.referalCode;
    //                         // dataToInsert["createdRefer"] = "";
    //                         await Db.findAndUpdate(
    //                             Contest,
    //                             { _id: payload.referredBy },
    //                             { $set: { createdRefer: null } },
    //                             { lean: true, upsert: true }
    //                         )
    //                     }
    //                 }
    //             }

    //             //if another user from same device exists, avoid any bonus
    //             const anotherUserFromSameDevice = await Db.getDataOne(
    //                 Contest,
    //                 { deviceId: payload.deviceId },
    //                 { _id: 1 },
    //                 { lean: true }
    //             );

    //             if (anotherUserFromSameDevice) {
    //                 console.log("No bonus")
    //                 offerBonus = false;
    //             }
    //         }
            

    //         if (userMetadata && userMetadata.phoneNumber) {
    //             dataToInsert["phone"] = userMetadata.phoneNumber;
    //             dataToInsert["vipayId"] = userMetadata.phoneNumber + "@vipay";
                
    //             dataToInsert["vipayWallet.balance"] = appConstants.joiningBonus;
                
    //             if (offerBonus) {
    //                 console.log("On bonus")
    //                 try {
    //                     if (dataToInsert["referredBy"]) {
    //                         //if coming through a valid referral
    //                         dataToInsert["vipayWallet.balance"] =
    //                         dataToInsert["vipayWallet.balance"] +
    //                             appConstants.refereeBonus;
    //                         // dataToInsert["referrerBonus"] =
    //                             // appConstants.referrerBonus;
    //                     }
    //                 } catch (_err) {}
    //             }

    //             const userData = await Db.findAndUpdate(
    //                 Contest,
    //                 { phone: userMetadata.phoneNumber },
    //                 { $setOnInsert: dataToInsert },
    //                 { upsert: true, lean: true, new: true }
    //             );

    //             userData.token = await generateToken({ _id: userData._id });

    //             //give referrer bonus
    //             if (dataToInsert["referredBy"] && offerBonus)
    //                 await Db.updateOne(
    //                     Contest,
    //                     { _id: dataToInsert["referredBy"] },
    //                     {
    //                         $inc: {
    //                             "vipayWallet.balance":
    //                                 appConstants.referrerBonus,
    //                         },
    //                     },
    //                     { lean: true }
    //                 );

    //             return userData;
    //         } else throw "Invalid Credentials";
    //     } catch (err) {
    //         console.error(JSON.stringify(err));
    //         throw err;
    //     }
    // }
}