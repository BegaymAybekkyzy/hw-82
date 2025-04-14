import express from "express";
import {IArtist, IArtistMutation} from "../types";
import {imagesUpload} from "../multer";
import Artist from "../model/Artist";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res, next) => {
    try {
        const artist: IArtist[] = await Artist.find();
        res.send(artist);
    } catch (err) {
        next(err);
    }
});

artistRouter.post("/", imagesUpload.single("photo"), async (req, res, next) => {
    try {
        if (!req.body.name?.trim()) {
            res.status(400).send({error: "Name is required"});
            return;
        }

        const newArtist: IArtistMutation = {
            name: req.body.name,
            info: req.body.info ? req.body.info : null,
            photo: req.file ? "photos/" + req.file.filename : null,
        }

        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch (err) {
        next(err)
    }
});

export default artistRouter;