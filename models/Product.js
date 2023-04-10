const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;
// schema design
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name for this product'],
            trim: true,
            unique: [true, 'Name must be unique'],
            lowerCase: true,
            minLength: [3, 'name must be at least 3 characters'],
            maxLength: [100, 'name is too large'],
        },

        description: {
            type: String,
            required: true,
        },

        unit: {
            type: String,
            required: true,
            enum: {
                values: ['kg', 'litre', 'pcs', 'bag'],
                message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
            },
        },
        // imageURLs: {
        //     type: String,
        //     required: true,
        //     validate: {
        //         validator: (value) => {
        //             if (!Array.isArray(value)) {
        //                 return false;
        //             }
        //             let isValid = true;
        //             value.forEach((url) => {
        //                 if (!validator.isURL(url)) {
        //                     isValid = false;
        //                 }
        //             });
        //             return isValid;
        //         },
        //         message: 'Please provide valid image urls',
        //     },
        // },

        imageURLs: [
            {
                type: String,
                required: true,
                validate: [validator.isURL, 'wrong url'],
            },
        ],

        category: {
            type: String,
            required: true,
        },

        brand: {
            name: {
                type: String,
                required: true,
            },
            id: {
                type: ObjectId,
                ref: 'Brand',
                required: true,
            },
        },
    },
    {
        timestamps: true,
    },
);
// mongoose middleware for saving data : pre / post
productSchema.pre('save', function (next) {
    console.log('Befor saving data');
    if (this.quantity === 0) {
        this.status = 'out-of-stock';
    }

    next();
});

// productSchema.post('save', function(doc, next) {
//     console.log('after saving data');

//     next();
// });

// instance method
productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
};

// Schema => model => query
// model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
