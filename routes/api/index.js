const router = require('express').Router();
const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');
const userPropRoutes = require('./userPropRoutes');
const reviewRoutes = require('./reviewRoutes');
const chatRoutes = require('./chatRoutes');

router.use('/users', userRoutes);
router.use('/prop', userPropRoutes);
router.use('/image', imageRoutes);
router.use('/reviews', reviewRoutes);
router.use('/chat', chatRoutes);

module.exports = router;