import { ethers } from 'ethers';
import { ContestContractABI } from '../../contracts/abi'

class ContestCampaign {
    constructor(rpcUrl, privateKey, contractAddress) {
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl)
        this.wallet = new ethers.Wallet(privateKey)
        this.signer = this.wallet.connect(this.provider)
        this.contract = new ethers.Contract(contractAddress, ContestContractABI, this.provider)
        this.signedContract = new ethers.Contract(contractAddress, ContestContractABI, this.signer)
    }

    async requestRandomWords() {
        try {
            const txPending = await this.signedContract.requestRandomWords()
            const txConfirm = await txPending.wait()
            return txConfirm
        }
        catch (_err) {
            throw _err
        }
    }

    async expand(size, range) {
        try {
            const res = await this.contract.expand(size, range)
            return res
        }
        catch (_err) {
            throw _err
        }
    }

    txWait(second) {
        return new Promise(resolve => setTimeout(resolve, second * 1000))
    }
}

export default ContestCampaign