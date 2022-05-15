import { Payment } from '@/models/payment.model';
import express from 'express';
import passport from 'passport';
import { ReturnRequest } from '@/models/returnRequest.model';
import * as xlsx from 'xlsx';
import Decimal from 'decimal.js';

const router = express.Router();

router.get('/', passport.authenticate(['jwt', 'anonymous'], { session: false }), async (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;
  const safePage = parseInt(page as string, 10);
  const safePerPage = parseInt(perPage as string, 10);
  // logger.debug('%o', req.user)
  const payments = await Payment.find()
    .limit(safePage * 1)
    .skip((safePage - 1) * safePerPage)
    .exec();

  const count = await Payment.countDocuments();

  res.json({
    payments,
    totalPages: Math.ceil(count / safePerPage),
    currentPage: page,
  });
});

router.get(
  '/:documentNumber/report',
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  async (req, res, next) => {
    const allPaymentNumbers = [req.params.documentNumber];
    const fetchedPayments = await Payment.find({ documentNumber: { $in: allPaymentNumbers } }).exec();
    const fetchedRequests = await ReturnRequest.find({ documentNumber: { $in: allPaymentNumbers } }).exec();

    const paymentsWithReturnRequests = fetchedPayments.map((payment) => {
      const requests = fetchedRequests.filter((rr) => rr.documentNumber === payment.documentNumber);

      return {
        data: payment,
        returnRequests: requests.sort((a, b) => Number(a.requestNumber) - Number(b.requestNumber)),
      };
    });

    // console.log({ all: ['documentNumber', allPaymentNumbers] }, JSON.stringify(paymentsWithReturnRequests, null, 2));

    const reportWorkbook = xlsx.utils.book_new();

    const returnRequestsResult = paymentsWithReturnRequests
      .map(({ data: payment, returnRequests }) => {
        const paymentAmount = new Decimal(payment.amount);
        let returnedAmount = new Decimal(0);
        const result = [];

        for (const request of returnRequests) {
          const requestAmount = new Decimal(request.requestAmount);

          let state = null;
          const requestResult = [payment.documentNumber, request.requestNumber];

          if (request.receiverINN !== payment.payerINN) {
            state = 'Неверный ИНН';
          } else if (request.receiverKPP !== payment.payerKPP) {
            state = 'Неверный КПП';
          } else if (request.receiverAccount !== payment.payerAccount) {
            state = 'Неверный Расч. Сч.';
          } else if (request.receiverBic !== payment.payerBic) {
            state = 'Неверный БИК';
          } else if (request.receiverCorr !== payment.payerCorr) {
            state = 'Неверный Кор Сч.';
          } else if (requestAmount.plus(returnedAmount).greaterThan(paymentAmount)) {
            state = 'Неверная сумма';
          } else {
            returnedAmount = returnedAmount.plus(requestAmount);
            state = 'Соответствует';
          }

          result.push([...requestResult, state]);
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
  }
);

export default router;
