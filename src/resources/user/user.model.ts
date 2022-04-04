import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collection = new Schema({
    username: {
        type: String,
        required: [true, 'username required'],
    },
    password: {
        type: String,
        required: [true, 'password required'],
    },
    fullName: {
        type: String,
        required: [true, 'fullName required'],
    },
}, { timestamps: true });

export default mongoose.model("users", collection);