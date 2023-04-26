`use strict`;

/**
 * modules imported here
 **/

import MONGOOSE from 'mongoose';
const Schema = MONGOOSE.Schema;

const contest = new Schema(
  {
    name: { type: String, default: '' },
    allowedNumber: { type: Number, default: 0 },
    winnerCount: { type: Number, default: 0 },
    contestAnnounced: { type: Boolean, default: false },
    announceDate: {type: Date},
    thumbnailImage: { type: String, default: '' },
    prizeWorth: { type: Number, default: 0 },
    task: { type: Object, default: {} },
    winners: { type: Object, default: [] },
    constantsAddresses: { type: Object, default: [] },
    keepTillTimestamp: { type: Date, default: Date.now() }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    versionKey: false
  },
);

contest.plugin(require('mongoose-beautiful-unique-validation'))

const Contest = MONGOOSE.model(`contests`, contest, 'contest');
export default Contest;