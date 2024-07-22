const mongoose = require('mongoose');
const slugify = require('slugify');

const generateSlug = async (schema) => {
    // sử dụng hook pre-save của mongoose
    await schema.pre('save', async function (next) {
        // kiểm tra xem tiêu đề đã thay đổi chưa kể từ lần cuối lưu hoặc kiểm tra tiêu đề lần đầu được tạo mới 
        // tạo slug bằng thư viện slugify
        this.slug = slugify(this.title, { lower: true, strict: true });
        // tìm xem đã tồn tại slug nào chưa
        const model = mongoose.model(this.constructor.modelName);
        let existsSlug = await model.findOne({ slug: this.slug });
        let index = 1;
        // nếu trùng slug thì thêm số phía sau
        while (existsSlug) {
            this.slug = slugify(`${this.title}-${index}`, { lower: true, strict: true });
            existsSlug = await model.findOne({ slug: this.slug });
            index++;
        }

        next();
    })
}

module.exports = { generateSlug };