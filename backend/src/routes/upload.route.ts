import logger from '@/config/logger';
import { Store } from '@/models/store.model';
import ApiError from '@/utils/ApiError';
import express from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import multer from 'multer';
import { read as readXlsx, utils } from 'xlsx';
import Decimal from 'decimal.js';
import { IPayment, Payment } from '@/models/payment.model';
import { Schema } from 'mongoose';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const paymentColumns: Array<{ name: keyof IPayment; type: 'date' | 'string' }> = [
  { name: 'documentNumber', type: 'string' },
  { name: 'date', type: 'string' },
  { name: 'amount', type: 'string' },
  { name: 'payer', type: 'string' },
  { name: 'payerINN', type: 'string' },
  { name: 'payerKPP', type: 'string' },
  { name: 'payerAccount', type: 'string' },
  { name: 'payerBic', type: 'string' },
  { name: 'payerCorr', type: 'string' },
  { name: 'receiver', type: 'string' },
  { name: 'receiverINN', type: 'string' },
  { name: 'receiverKPP', type: 'string' },
  { name: 'receiverAccount', type: 'string' },
  { name: 'receiverBic', type: 'string' },
  { name: 'receiverCorr', type: 'string' },
];

const parsers = {
  date: (str: string): Date => new Date(str),
  string: (str: string): string => str,
};

router.post(
  '/payment',
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  upload.single('file'),
  async (req: Express.Request, res, next) => {
    try {
      const fileBuffer = req.file.buffer;

      const workbook = readXlsx(fileBuffer, {
        type: 'buffer',
        raw: true,
        cellDates: true,
        cellNF: false,
        cellText: false,
      });

      const sheetNames = workbook.SheetNames;

      const sheet = workbook.Sheets[sheetNames[0]];

      const aoa = utils.sheet_to_json(sheet, { header: 1, raw: false, rawNumbers: true }).slice(1);

      for (const row of aoa) {
        const object: Partial<IPayment> = {};

        for (const fieldIndex in paymentColumns) {
          const field = paymentColumns[fieldIndex];
          object[field.name] = parsers[field.type](row[fieldIndex]) as any;
        }

        const payment = new Payment(object);

        await payment.save();
      }

      res.json({ result: aoa });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
