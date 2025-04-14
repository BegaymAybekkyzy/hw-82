import express from "express";
import Album from "../model/Album";
import {ITrackMutation} from "../types";
import Track from "../model/Track";

const trackRouter = express.Router();

trackRouter.get("/", async (req, res, next) => {
   try {
       const albumId = req.query.album as string;
       const artistId = req.query.artist as string;
       let tracks;

       if (albumId) {
           tracks = await Track.find({album: albumId}).populate("album");
           res.send(tracks);
           return;
       }

       if (artistId) {
           const albums = await Album.find({artist: artistId});
           const allTracks = [];

           for (const album of albums) {
               const tracks = await Track.find({album: album._id}).populate("album");
               allTracks.push(...tracks);
           }

           res.send(allTracks);
           return;
       }

       tracks = await Track.find().populate("album");
       res.send(tracks);
   } catch (err) {
       next(err);
   }
});

trackRouter.post("/", async (req, res, next) => {
    try {
        if (!req.body.album?.trim() || !req.body.title?.trim()) {
            res.status(400).send({error: "Fields are mandatory and must not be empty"});
            return;
        }

        const newTrack: ITrackMutation = {
            album: req.body.album,
            title: req.body.title,
            duration: req.body.duration ? req.body.duration : null,
        };

        const track = new Track(newTrack);
        await track.save();
        res.send(newTrack);
    } catch (err) {
        next(err);
    }
});

export default trackRouter;