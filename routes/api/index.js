const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const imageRoutes = require('./imageRoutes');
const userPropRoutes = require('./userPropRoutes');

router.use('/users', userRoutes);
router.use('/prop', userPropRoutes);
// router.use('/images', imageRoutes);

module.exports = router;