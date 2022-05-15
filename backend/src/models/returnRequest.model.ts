import { Schema, Document, model, Date } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IReturnRequest {
  requestNumber: string;
  requestDate: Date;
  requestAmount: string;
  documentNumber: string;
  date: Date;
  receiver: string;
  receiverINN: string;
  receiverKPP: string;
  receiverAccount: string;
  receiverBic: string;
  receiverCorr: string;
}

export default interface IReturnRequestModel extends Document, IReturnRequest {}

const schema = new Schema(
  {
    requestNumber: {
      type: String,
      required: true,
      unique: true,
    },
    requestDate: {
      type: Date,
      required: true,
    },
    requestAmount: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    receiverINN: {
      type: String,
      required: true,
    },
    receiverKPP: {
      type: String,
      required: true,
    },
    receiverAccount: {
      type: String,
      required: true,
    },
    receiverBic: {
      type: String,
      required: true,
    },
    receiverCorr: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(uniqueValidator);

export const ReturnRequest = model<IReturnRequestModel>('returnRequests', schema);
