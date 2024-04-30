const router = require('express').Router();
const express = require('express')
const jwt = require('jsonwebtoken')

const apiRoutes = require('./api')
const homeRoutes = require('./homeRoutes')

router.use('/', homeRoutes)
router.use('/api', apiRoutes)

router.get("/tokenData",(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        const tokenData = jwt.verify(token,process.env.JWT_SECRET);
        res.json({
            validToken:true,
            userId:tokenData.id
        })
    } catch (error) {
        console.log(error)
        res.json({validToken:false})
    }
})

module.exports = router;