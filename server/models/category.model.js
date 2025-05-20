const { mongoose } = require("mongoose")

const categorySchema = new mongoose.Schema({
    //create category schema
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    imageBanner: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('Category', categorySchema)