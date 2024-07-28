const axios = require('axios');
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageFromURL = (imageURL) => {
    return new Promise((resolve, reject) => {
        axios({
            url: imageURL,
            responseType: 'stream'
        })
        .then(response => {
            const stream = cloudinary.uploader.upload_stream({
                folder: 'blog-images',
                fetch_format: "auto", // Định dạng tệp
                quality: "auto",
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url);
            });
            response.data.pipe(stream);
        })
        .catch(error => reject(error));
    });
}


module.exports = { uploadImageFromURL };
