import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collection = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'user required'],
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: "services",
        required: [true, 'service required'],
    },
}, { timestamps: true });


export default mongoose.model("booking", collection);