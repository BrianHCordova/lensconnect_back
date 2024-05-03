const express = require("express");
const router = express.Router();
const { User, Specialty, ServeLocation, Portfolio } = require("../../models");
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
    const images = await Portfolio.findAll({
        include: [User],
        where: {
            isProfilePic: false
        }
    })

    for (let i=0; i<images.length; i++) {

        const getObjectParams = {
            Bucket: bucketName,
            Key: images[i].image
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        images[i].dataValues.imageUrl = url
        images[i].dataValues.column= i % 4 + 1
        
       
    }
    res.send(images)
})

router.get('/:id', async (req, res) => {
    const images = await Portfolio.findAll({
        include: [User],
        where: {
            UserId: req.params.id
        }
    })

    for (let i=0; i<images.length; i++) {

        const getObjectParams = {
            Bucket: bucketName,
            Key: images[i].image
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        images[i].dataValues.imageUrl = url
       
    }
    res.send(images)
})


router.post('/profilepic/:id', upload.single('image'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)

    const randomImageName= crypto.randomUUID()
    const params = {
        Bucket: bucketName,
        Key: randomImageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    const post = await Portfolio.create({
        image: randomImageName,
        UserId: req.params.id,
        isProfilePic: true

    })

    res.json(post)
})

router.post('/multipleFiles/:id', upload.array('multipleFiles'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.files)

    // req.file.buffer
    const itemsToUpload = req.files

    // if (Array.isArray(itemsToUpload) && itemsToUpload.length > 0) {
    //     res.json(itemsToUpload)
    // }

    for (const items of itemsToUpload) {

        const randomImageName= crypto.randomUUID()
        const params = {
            Bucket: bucketName,
            Key: randomImageName,
            Body: items.buffer,
            ContentType: items.mimetype,
        }
    
        const command = new PutObjectCommand(params)
        await s3.send(command)
    
        const post = await Portfolio.create({
            image: randomImageName,
            UserId: req.params.id
    
        })
    }
    

    

    res.json({msg: 'images uploaded'})
})

router.delete('/:id', async (req, res) => {
    const image = await Portfolio.findByPk(req.params.id)
    if (!image) {
        res.status(404).send("Post not found")
        return
    }
    console.log(image)
    const params = {
        Bucket: bucketName,
        Key: image.image
    }

    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    await Portfolio.destroy({where: {id: req.params.id}})
    res.json({msg: "Image deleted"})
})

module.exports = router