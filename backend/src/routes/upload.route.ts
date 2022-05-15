import express from 'express';
import passport from 'passport';
import multer from 'multer';
import * as xlsx from 'xlsx';
import { IPayment, Payment } from '@/models/payment.model';
import { IReturnRequest } from '@/models/returnRequest.model';
import Decimal from 'decimal.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const paymentColumns: Array<{ name: keyof IPayment; type: 'date' | 'string' }> = [
  { name: 'documentNumber', type: 'string' },
  { name: 'date', type: 'date' },
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

const returnRequestColumns: Array<{ name: keyof IReturnRequest; type: 'date' | 'string' }> = [
  { name: 'requestNumber', type: 'string' },
  { name: 'requestDate', type: 'date' },
  { name: 'requestAmount', type: 'string' },
  { name: 'documentNumber', type: 'string' },
  { name: 'date', type: 'date' },
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
  '/',
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  upload.fields([{ name: 'payments' }, { name: 'returnRequests' }]),
  async (req: Express.Request, res, next) => {
    try {
      const paymentFiles = req.files['payments'];
      const returnRequestFiles = req.files['returnRequests'];

      const payments: IPayment[] = [];
      const returnRequests: IReturnRequest[] = [];

      for (const file of paymentFiles) {
        const workbook = xlsx.read(file.buffer, {
          type: 'buffer',
          raw: true,
          cellDates: true,
          cellNF: false,
          cellText: false,
        });

        const sheetNames = workbook.SheetNames;

        const sheet = workbook.Sheets[sheetNames[0]];

        const aoa = xlsx.utils.sheet_to_json(sheet, { header: 1, raw: false, rawNumbers: true }).slice(1);

        for (const row of aoa) {
          const object: Partial<IPayment> = {};

          for (const fieldIndex in paymentColumns) {
            const field = paymentColumns[fieldIndex];
            object[field.name] = parsers[field.type](row[fieldIndex]) as any;
          }

          payments.push(object as IPayment);
        }
      }

      for (const file of returnRequestFiles) {
        const workbook = xlsx.read(file.buffer, {
          type: 'buffer',
          raw: true,
          cellDates: true,
          cellNF: false,
          cellText: false,
        });

        const sheetNames = workbook.SheetNames;

        const sheet = workbook.Sheets[sheetNames[0]];

        const aoa = xlsx.utils.sheet_to_json(sheet, { header: 1, raw: false, rawNumbers: true }).slice(1);

        for (const row of aoa) {
          const object: Partial<IReturnRequest> = {};

          for (const fieldIndex in returnRequestColumns) {
            const field = returnRequestColumns[fieldIndex];
            object[field.name] = parsers[field.type](row[fieldIndex]) as any;
          }

          returnRequests.push(object as IReturnRequest);
        }
      }

      const paymentsWithReturnRequests = payments.map((payment) => {
        const requests = returnRequests.filter((rr) => rr.documentNumber === payment.documentNumber);

        return {
          data: payment,
          returnRequests: requests.sort((a, b) => Number(a.requestNumber) - Number(b.requestNumber)),
        };
      });

      console.log({ paymentsWithReturnRequests });

      const reportWorkbook = xlsx.utils.book_new();

      const returnRequestsResult = paymentsWithReturnRequests
        .map(({ data: payment, returnRequests }) => {
          const paymentAmount = new Decimal(payment.amount);
          let returnedAmount = new Decimal(0);
          const result = [];

          for (const request of returnRequests) {
            const requestAmount = new Decimal(request.requestAmount);

            const requestResult = [payment.documentNumber, request.requestNumber];

            if (request.receiverINN !== payment.payerINN) {
              result.push([...requestResult, 'Неверный ИНН']);
            } else if (request.receiverKPP !== payment.payerKPP) {
              result.push([...requestResult, 'Неверный КПП']);
            } else if (request.receiverAccount !== payment.payerAccount) {
              result.push([...requestResult, 'Неверный Расч. Сч.']);
            } else if (request.receiverBic !== payment.payerBic) {
              result.push([...requestResult, 'Неверный БИК']);
            } else if (request.receiverCorr !== payment.payerCorr) {
              result.push([...requestResult, 'Неверный Кор Сч.']);
            } else if (requestAmount.plus(returnedAmount).greaterThan(paymentAmount)) {
              result.push([...requestResult, 'Неверная сумма']);
            } else {
              returnedAmount = returnedAmount.plus(requestAmount);
              result.push([...requestResult, 'Соответствует']);
            }
          }

          return result;
        })
        .flat();

      const reportSheet = xlsx.utils.aoa_to_sheet(returnRequestsResult);

      xlsx.utils.book_append_sheet(reportWorkbook, reportSheet);

      const fileName = 'Report.xlsx';
      res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      const wbout = xlsx.write(reportWorkbook, { bookType: 'xlsx', type: 'buffer' });
      res.send(Buffer.from(wbout));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
