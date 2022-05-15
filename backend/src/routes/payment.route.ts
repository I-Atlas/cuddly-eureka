import { Payment } from '@/models/payment.model';
import express from 'express';
import passport from 'passport';

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

export default router;
