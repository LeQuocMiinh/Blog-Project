const generatePagination = async (collection, page_current, limit) => {
    try {
        const page = parseInt(page_current) || 1,
            perPage = parseInt(limit) || 10,
            skip = (page - 1) * perPage,
            data = await collection.find({}).skip(skip).limit(perPage),
            total = await collection.countDocuments(),
            totalPages = Math.ceil(total / perPage),
            next = (totalPages - page) > 0 ? page + 1 : null,
            previous = page > 1 ? page - 1 : null;

        return {
            data: data,
            total: total,
            perPage: perPage,
            current: page,
            next: next,
            prev: previous,
            totalPages: totalPages
        };
    } catch (error) {
        throw new Error("Đã xảy ra lỗi trong quá trình phân trang: " + error.message);
    }
}


module.exports = { generatePagination };
