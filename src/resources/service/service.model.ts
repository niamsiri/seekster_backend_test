import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collection = new Schema({
    name: {
        type: String,
        required: [true, 'name required'],
    },
    price: {
        type: String,
        required: [true, 'price required'],
    },
    picture: {
        type: String,
        required: [true, 'picture required'],
    },
    description: {
        type: String,
        required: [true, 'description required'],
    },
}, { timestamps: true });


export default mongoose.model("services", collection);