import { Schema, Document, model, Date } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IPayment {
  documentNumber: string;
  date: string;
  amount: string;
  payer: string;
  payerINN: string;
  payerKPP: string;
  payerAccount: string;
  payerBic: string;
  payerCorr: string;
  receiver: string;
  receiverINN: string;
  receiverKPP: string;
  receiverAccount: string;
  receiverBic: string;
  receiverCorr: string;
}

export default interface IPaymentModel extends Document, IPayment {}

const schema = new Schema(
  {
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    payer: {
      type: String,
      required: true,
    },
    payerINN: {
      type: String,
      required: true,
    },
    payerKPP: {
      type: String,
      required: true,
    },
    payerAccount: {
      type: String,
      required: true,
    },
    payerBic: {
      type: String,
      required: true,
    },
    payerCorr: {
      type: String,
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

export const Payment = model<IPaymentModel>('payments', schema);
