const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        priceGoc: {
            type: Number,
            required: true,
        },
        priceSale: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
            },
        ],

    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Product', productSchema)
