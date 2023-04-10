const {
    createBrandService,
    getBrandsService,
    getBrandByIdService,
    updateBrandService,
} = require('../services/brand.services');

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully created the brand',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't create the brand",
        });
    }
};

// exports.createBrand = async (req, res, next) => {
//     try {
//         const result = await createBrandService(req.body);

//         res.status(200).json({
//             status: 'success',
//             message: 'Successfully created the brand',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             status: 'fail',
//             error: "Couldn't create the brand",
//         });
//     }
// };

exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandsService();
        res.status(200).json({
            status: 'Success',
            message: 'Successfully get the brands',
            data: brands,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't get the brands",
        });
    }
};

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getBrandByIdService(id);

        if (!brand) {
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't find a brand with this id",
            });
        }

        res.status(200).json({
            status: 'success',
            data: brand,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error: "Couldn't get the brands",
        });
    }
};

exports.updateBrand = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateBrandService(id, req.body);

        console.log(result);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't update the brand with this id",
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated the brand',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error: "Couldn't update the brand",
        });
    }
};
