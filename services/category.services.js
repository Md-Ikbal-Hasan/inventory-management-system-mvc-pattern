const Category = require('../models/Category');

exports.createCategoryService = async (data) => {
    console.log('data:', data);
    const result = await Category.create(data);
    console.log(result);
    return result;
};

exports.getCategoriesService = async () => {
    const result = await Category.find({});
    return result;
};
