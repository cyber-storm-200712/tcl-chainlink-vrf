`use strict`;

/**
 * modules imported here
 **/

import MONGOOSE from 'mongoose';
const Schema = MONGOOSE.Schema;

const participant = new Schema(
  {
    participantId: { type: Number, default: 0 },
    contestId: { type: String, default: '' },
    walletAddress: { type: Object, default: [] },
    task: { type: Object, default: [] },
    winners: { type: Object, default: {} },
    participantDate: { type: Date, default: new Date() }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    versionKey: false
  },
);

participant.plugin(require('mongoose-beautiful-unique-validation'))

const Participant = MONGOOSE.model(`participants`, participant, 'participant');
export default Participant;