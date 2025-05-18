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
        image: {
            type: String,
            required: true,
        },
        images: [String],
        color: {
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
        status: {
            type: String,
            enum: ['active', 'inactive', 'out_of_stock'],
            default: 'active'
        },
        discountPercent: {
            type: Number,
            default: 0
        },
        isDealHot: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Product', productSchema)
