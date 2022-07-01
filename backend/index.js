const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const cloudinary = require('./cloudinary')
const fs = require('fs');

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2048 * 2048 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype === "video/mp4" || file.mimetype === "application/pdf" || file.mimetype === "application/msword") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
});

const uploadSingleImage = upload.single('file');

app.post('/upload', async function (req, res) {

    uploadSingleImage(req, res, async function (err) {

        if (err) {
            return res.status(400).json({ message: err.message })
        }

        // Everything went fine.
        const file = req.file;
        
        const uploader = async (path) => await cloudinary.uploads(path, 'DEV');
        const onlinePath = await uploader(file.path)
        fs.unlinkSync(file.path)

        res.status(200).json({
            online_path: onlinePath, 
            path: file.path,
            filename: file.filename,
            mimetype: file.mimetype,
            originalname: file.originalname,
            size: file.size,
            fieldname: file.fieldname,
            status: true,
            message: "data berhasil diupload!!"
        })

    })
})

app.listen(5002, () => {
    console.log("Server is listening on port: 5002");
});