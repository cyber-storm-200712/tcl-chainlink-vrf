import {
  SWAGGER_RESPONSE_MESSAGE,
  STATUS_MSG,
} from '../../../config/AppConstraints';
import {
  failActionFunction,
  sendError,
  sendSuccess,
} from '../../../utils/response';
import { LANGUAGE } from '../../../config/AppConstraints'
import Joi from 'joi';
import { logger } from '../../../utils/universalFunctions';
import { ContestControllers } from '../../../controllers/V1';
const CONTEST_ROUTER = [
  {
    method: 'POST',
    path: '/',
    options: {
      handler: async (request, reply) => {
        return sendSuccess(
          STATUS_MSG.SUCCESS.DEFAULT,
          'dataToSend',
          request.headers['accept-language'] || LANGUAGE.EN,
        )
      }
    }
  },
  {
    method: 'POST',
    path: '/addNewContest',
    options: {
      handler: async (request, reply) => {
        try {
          request.payload.language =
            request.headers['accept-language'] || LANGUAGE.EN;
          let dataToSend = await ContestControllers.createNew(request.payload);
          return sendSuccess(
            STATUS_MSG.SUCCESS.DEFAULT,
            dataToSend,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        } catch (err) {
          logger.error(JSON.stringify(err));
          return sendError(
            err,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        }
      },
      description: 'create new contest',
      notes: 'contest creation through ethers api call',
      tags: ['api', 'contest'],
      validate: {
        failAction: failActionFunction,
        payload: Joi.object({
          name: Joi.string().required(),
          allowedNumber: Joi.number().required(),
          winnerCount: Joi.number().required(),
          announceDate: Joi.date().required(),
          keepTillTimestamp: Joi.date().required(),
          thumbnailImage: Joi.string().required(),
          prizeWorth: Joi.number().required(),
          task: Joi.array().optional()
        }),
      }
    },
  },
  {
    method: 'POST',
    path: '/drawContest',
    options: {
      handler: async (request, reply) => {
        try {
          request.payload.language =
            request.headers['accept-language'] || LANGUAGE.EN;
          let dataToSend = await ContestControllers.drawContest(request.payload);
          return sendSuccess(
            STATUS_MSG.SUCCESS.DEFAULT,
            dataToSend,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        } catch (err) {
          logger.error(JSON.stringify(err));
          return sendError(
            err,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        }
      },
      description: 'create new contest',
      notes: 'contest creation through ethers api call',
      tags: ['api', 'contest'],
      validate: {
        failAction: failActionFunction,
        payload: Joi.object({
          contestId: Joi.string().required()
        }),   
      }
    },
  },
  {
    method: 'POST',
    path: '/participate',
    options: {
      handler: async (request, reply) => {
        try {
          request.payload.language =
            request.headers['accept-language'] || LANGUAGE.EN;
          let dataToSend = await ContestControllers.participate(request.payload);
          return sendSuccess(
            STATUS_MSG.SUCCESS.DEFAULT,
            dataToSend,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        } catch (err) {
          logger.error(JSON.stringify(err));
          return sendError(
            err,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        }
      },
      description: 'create new contest',
      notes: 'contest creation through ethers api call',
      tags: ['api', 'contest'],
      validate: {
        failAction: failActionFunction,
        payload: Joi.object({
          contestId: Joi.string().required(),
          task: Joi.array().required(),
          walletAddress: Joi.string().required()
        }),
      }
    },
  },
  {
    method: 'POST',
    path: '/removeContestant',
    options: {
      handler: async (request, reply) => {
        try {
          request.payload.language =
            request.headers['accept-language'] || LANGUAGE.EN;
          let dataToSend = await ContestControllers.removeContestant(request.payload);
          return sendSuccess(
            STATUS_MSG.SUCCESS.DEFAULT,
            dataToSend,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        } catch (err) {
          logger.error(JSON.stringify(err));
          return sendError(
            err,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        }
      },
      description: 'create new contest',
      notes: 'contest creation through ethers api call',
      tags: ['api', 'contest'],
      validate: {
        failAction: failActionFunction,
        payload: Joi.object({
          contestId: Joi.string().required(),
          walletAddress: Joi.string().required()
        }),
      }
    },
  },
  {
    method: 'GET',
    path: '/getParticipants',
    options: {
      handler: async (request, reply) => {
        try {
          let dataToSend = await ContestControllers.getParticipants(request.query);
          return sendSuccess(
            STATUS_MSG.SUCCESS.DEFAULT,
            dataToSend,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        } catch (err) {
          logger.error(JSON.stringify(err));
          return sendError(
            err,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        }
      },
      description: 'create new contest',
      notes: 'contest creation through ethers api call',
      tags: ['api', 'contest'],
      validate: {
        failAction: failActionFunction,
        query: Joi.object({
          contestId: Joi.string().required()
        }),
      }
    },
  },
  {
    method: 'GET',
    path: '/getWinners',
    options: {
      handler: async (request, reply) => {
        try {
          let dataToSend = await ContestControllers.getWinners(request.query);
          return sendSuccess(
            STATUS_MSG.SUCCESS.DEFAULT,
            dataToSend,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        } catch (err) {
          logger.error(JSON.stringify(err));
          return sendError(
            err,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        }
      },
      description: 'create new contest',
      notes: 'contest creation through ethers api call',
      tags: ['api', 'contest'],
      validate: {
        failAction: failActionFunction,
        query: Joi.object({
          contestId: Joi.string().required()
        }),
      }
    },
  },
  {
    method: 'GET',
    path: '/getAllContests',
    options: {
      handler: async (request, reply) => {
        try {
          let dataToSend = await ContestControllers.getAllContests();
          return sendSuccess(
            STATUS_MSG.SUCCESS.DEFAULT,
            dataToSend,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        } catch (err) {
          logger.error(JSON.stringify(err));
          return sendError(
            err,
            request.headers['accept-language'] || LANGUAGE.EN,
          );
        }
      },
      description: 'create new contest',
      notes: 'contest creation through ethers api call',
      tags: ['api', 'contest'],
      validate: {
        failAction: failActionFunction,
      }
    },
  },
];

export default CONTEST_ROUTER;
