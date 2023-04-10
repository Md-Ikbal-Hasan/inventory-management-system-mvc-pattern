const Product = require('../models/Product');
const {
    getProductService,
    createProductService,
    updateProductByIdService,
    bulkUpdateProductService,
    deleteProductByIdService,
    bulkDeleteProductService,
} = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        console.log(filters);

        // sort , page , limit => exclued
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach((field) => delete filters[field]);

        // gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        filters = JSON.parse(filtersString);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        // select fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        // for pagination
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            // 50 products
            // each page 10 product
            // page 1 -> 1 - 10
            // page 2 -> 11 - 20
            // page 3 -> 21 - 30
            // page 4 -> 31 - 40
            // page 5 -> 41 - 50
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const products = await getProductService(filters, queries);

        res.status(200).json({
            status: 'success',
            message: 'Data find successfully',
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const result = await createProductService(req.body);
        result.logger();

        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result,
        });
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message,
        });
    }
};

exports.updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductByIdService(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'could not update the product',
            error: error.message,
        });
    }
};

exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'could not update the product',
            error: error.message,
        });
    }
};
exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'fail',
                message: 'could not delete the given product',
                error: 'could not delete the product',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Data deleted successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'could not delete the product',
            error: error.message,
        });
    }
};

exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductService(req.body.ids);

        res.status(200).json({
            status: 'success',
            message: 'Data deleted successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'could not delete the given product',
            error: error.message,
        });
    }
};

exports.fileUpload = async (req, res) => {
    try {
        res.status(200).json(req.file);
    } catch (error) {}
};
