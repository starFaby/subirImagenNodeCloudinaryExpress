const { Router } = require('express');
const router = Router();

const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const fs = require('fs-extra');//para saber donde esta mi imagen
router.get('/', async (req, res) => {
    const photos = await Photo.find();
    res.render('image', { photos });
});

router.get('/images/add', async (req, res) => {
    const photos = await Photo.find();
    console.log(photos);
    res.render('imageForm', { photos });
});
router.post('/images/add', async (req, res) => {
    const { txtTitulo, txtDescripcion } = req.body;
    console.log(req.body);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);
    const newPhoto = new Photo({
        title: txtTitulo,
        description: txtDescripcion,
        imageurl: result.url,
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);//indica la direccion y lo elimina
    res.redirect('/');
});
router.get('/images/delete/:photo_id', async (req, res)=>{
    const { photo_id } = req.params;
    const photo =  await Photo.findByIdAndDelete(photo_id);    
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result);
    res.redirect('/images/add');
    
})
module.exports = router;
//me quedo en 1:42