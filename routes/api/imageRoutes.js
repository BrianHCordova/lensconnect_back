const express = require("express");
const router = express.Router();
const { User, Specialties, ServeLocation, Portfolio } = require("../../models");
const multer = require('multer')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
require('dotenv').config();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")




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

router.get('/', async (req, res) => {
    const images = await Portfolio.findAll()

    for (const image of images) {

        const getObjectParams = {
            Bucket: bucketName,
            Key: image.image
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        image.imageUrl = url
    }
    res.json(images)
})


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

    const post = await Portfolio.create({
        image: req.file.originalname

    })

    res.json(post)
})

router.delete('/:id', async (req, res) => {
    const image = await Portfolio.findByPk({where: { id: req.params.id}})
    if (!image) {
        res.status(404).send("Post not found")
        return
    }

    const params = {
        Bucket: bucketName,
        Key: image.image
    }

    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    await Portfolio.delete({where: {id: req.params.id}})

})

module.exports = router