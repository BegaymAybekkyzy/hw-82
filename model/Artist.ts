import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: null,
    },
    info: {
        type: String,
        default: null,
    },
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;