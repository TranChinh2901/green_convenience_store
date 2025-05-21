const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
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
            min: 0
        },
        priceGoc: {
            type: Number,
            required: true,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        images: [{
            data: Buffer,
            contentType: String
        }],
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
            min: 0
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        status: {
            type: String,
            enum: ['còn hàng', 'hiện đã ngừng kinh doanh', 'hết hàng'],
            default: 'còn hàng'
        },
        discountPercent: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
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
productSchema.virtual('discountedPrice').get(function () {
    if (this.discountPercent > 0) {
        return this.priceGoc * (1 - this.discountPercent / 100);
    }
    return this.price;
});

module.exports = mongoose.model('Product', productSchema);
