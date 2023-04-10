const Product = require('../models/Product');
const Brand = require('../models/Brand');

exports.getProductService = async (filters, queries) => {
    // const products = await Product.find(filters);
    // const products = await Product.find({ price: { $gt: 100 } });
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const total = await Product.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);
    return { total, page, products };
};

exports.createProductService = async (data) => {
    // save or create
    // const product = new Product(data);
    // const result = await product.save();
    const product = await Product.create(data);
    const { _id: productId, brand } = product;

    // update a brand
    const res = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });
    console.log(res.nModified);
    return product;
};

exports.updateProductByIdService = async (productId, data) => {
    const result = await Product.updateOne(
        { _id: productId },
        { $set: data },
        { runValidators: true },
    );
    return result;
};

exports.bulkUpdateProductService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids }, data.data, {
    //     runValidators: true,
    // });

    // update multiple data object in database at a time with different data
    const products = [];

    data.ids.forEach((product) => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    });

    const result = await Promise.all(products);
    return result;
};
exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};

exports.bulkDeleteProductService = async (ids) => {
    console.log(ids);
    const result = await Product.deleteMany({ _id: ids });
    return result;
};
