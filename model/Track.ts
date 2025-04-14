import mongoose, {Schema, Types} from "mongoose";
import Album from "./Album";

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    album: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Album",
        validate: {
            validator: async (value: Types.ObjectId) =>{
                const album = await Album.findOne(value)
                return !!album
            }
        }
    },
    duration: String,
});

const Track = mongoose.model("Track", trackSchema);
export default Track;