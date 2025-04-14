import express from "express";
import {IAlbum, IAlbumMutation} from "../types";
import {imagesUpload} from "../multer";
import Album from "../model/Album";

const albumRouter = express.Router();

albumRouter.get("/", async (req, res, next) => {
    const artistId = req.query.artist as string;
    let albums;

    if (artistId) {
        albums = await Album.find({artist: artistId}).populate("artist");
        res.send(albums);
        return;
    }
    albums = await Album.find().populate("artist");
    res.send(albums);
});

albumRouter.post("/", imagesUpload.single("cover"), async (req, res, next) => {
   try {
       if (!req.body.artist?.trim() || !req.body.album_year?.trim() || !req.body.title?.trim()) {
           res.status(400).send({error: "Fields are mandatory and must not be empty"});
           return;
       }

       const newAlbum: IAlbumMutation = {
           artist: req.body.artist,
           album_year: req.body.album_year,
           title: req.body.title,
           cover: req.file ? "covers/" + req.file.filename : null,
       };

       const album = new Album(newAlbum);
       await album.save();
       res.send(newAlbum);
   } catch (err) {
       next(err);
   }
});

export default albumRouter;