const { createCategoryService, getCategoriesService } = require('../services/category.services');

exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully created the category',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Category is not created',
            error: error.message,
        });
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const result = await getCategoriesService();
        res.status(200).json({
            status: 'Success',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Category is not found',
            error: error.message,
        });
    }
};
