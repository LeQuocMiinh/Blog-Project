const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { APIError } = require('../../utils/api-errors');

class MediaController {

    /**
     * Khởi tạo các thuộc tính ban đầu 
     */
    constructor() {
        // Cấu hình Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: 'blog-images',
                quality: "auto",
                public_id: (req, file) => file.originalname.split('.')[0],
            },
        });

        this.upload = multer({ storage });
    }

    // [GET] - Get all images form Cloudinary
    async getAllMedia(req, res, next) {
        try {
            const next_cursor = req.query.next_cursor;
            const result = await cloudinary.api.resources({
                type: 'upload',
                prefix: 'blog-images',
                max_results: 30,
                next_cursor: next_cursor,
            });
            res.json({
                data: result.resources,
                next: result.next_cursor,
                message: 'Lấy tất cả hình ảnh thành công',
                status: true,
            });

        } catch (error) {
            next(error);
        }
    }

    // [POST] - Upload images to Cloudinary
    async uploadMedia(req, res, next) {
        try {
            res.json({
                message: 'Tải hình ảnh lên thành công',
                status: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] - Delete images on Cloudinary
    async deleteMedia(req, res, next) {
        try {
            const ids = req.params.id.split(',');
            if (!ids) {
                throw new APIError(400, 'Ảnh không tồn tại!');
            }

            const deleted = ids.map(id => {
                const publicId = `blog-images/${id}`;
                return cloudinary.uploader.destroy(publicId);
            });

            const results = await Promise.all(deleted);

            const hasFailed = results.some(result => result.result !== 'ok');
            if (hasFailed) {
                throw new APIError(400, 'Một số ảnh không tồn tại hoặc không thể xóa!');
            }

            res.json({
                message: 'Xóa ảnh thành công',
                status: true,
            });
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new MediaController();
