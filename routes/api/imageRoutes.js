const express = require("express");
const router = express.Router();
const { User, Specialties, ServeLocation, Portfolio } = require("../../models");
const multer = require('multer')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
require('dotenv').config();

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.post('/', upload.single('image'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)

    // req.file.buffer
    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    const post = await Portfolio.

    res.json({msg: "uploaded"})
})

module.exports = router