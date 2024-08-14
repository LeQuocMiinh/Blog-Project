const generatePagination = async (collection, page_current, limit, search = null) => {
    try {
        let query = {};
        if (search || search != null) {
            query = { title: { $regex: search, $options: 'i' } };
        }
        const page = parseInt(page_current) || 1,
            perPage = parseInt(limit) || 10;
        const skip = (page - 1) * perPage;
        const data = await collection.find(query).sort({ createdAt: -1 }).skip(skip).limit(perPage),
            countData = data.length,
            totalPost = await collection.countDocuments(),
            totalPages = Math.ceil(totalPost / perPage),
            next = (totalPages - page) > 0 ? page + 1 : null,
            previous = page > 1 ? page - 1 : null;
        if (data?.parent) {

        }
        return {
            data: data,
            countData: countData,
            perPage: perPage,
            current: page,
            next: next,
            prev: previous,
            totalPages: totalPages,
            totalPost: totalPost
        };
    } catch (error) {
        next(error);
    }
}


module.exports = { generatePagination };
