
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    summary: {
        type: String,
        trim: true,
        required: true
    },
    time: {
        type: Date
    },
    photoURL: {
        type: String,
        default:"https://pbs.twimg.com/media/DW_I8JBU0AE2SSB.jpg"
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [
        {
           type: Schema.Types.ObjectId,
           ref: "Note" 
        }
    ]
})

const News = mongoose.model("News", NewsSchema);
module.exports = News;