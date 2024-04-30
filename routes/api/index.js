const router = require('express').Router();
const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');
const userPropRoutes = require('./userPropRoutes');
const reviewRoutes = require('./reviewRoutes');
const chatRoutes = require('./chatRoutes');
const reportRoutes = require('./reportRoutes');

router.use('/users', userRoutes);
router.use('/prop', userPropRoutes);
router.use('/image', imageRoutes);
router.use('/reviews', reviewRoutes);
router.use('/chat', chatRoutes);
router.use('/report', reportRoutes);

module.exports = router;