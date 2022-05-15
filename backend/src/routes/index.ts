import express from 'express';

import stores from './stores.route';
import auth from './auth.route';
import upload from './upload.route';
import payment from './payment.route';

const router = express.Router();

router.use('/stores', stores);
router.use(auth);
router.use('/upload', upload);
router.use(payment);

export default router;
