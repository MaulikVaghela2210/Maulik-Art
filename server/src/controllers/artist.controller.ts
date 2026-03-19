import { Request, Response } from "express";
import Artist from "../models/artist.model";
import cloudinary from "../config/cloudinary";

export const getArtists = async (req: Request, res: Response) => {

  const artists = await Artist.find();
  res.json(artists);

};

export const addArtist = async (req: Request, res: Response) => {

try {

const file = req.file;

if (!file) {
return res.status(400).json({message:"Image required"});
}

cloudinary.uploader.upload_stream(
{ folder: "artists" },
async (error, result: any) => {

if (error) {
return res.status(500).json(error);
}

const artist = await Artist.create({

name: req.body.name,
role: req.body.role,
desc: req.body.desc,

img: result.secure_url,

social:{
facebook:req.body.facebook,
twitter:req.body.twitter,
instagram:req.body.instagram,
linkedin:req.body.linkedin
}

});

res.json(artist);

}
).end(file.buffer);

} catch (error) {

console.log(error);
res.status(500).json({message:"Server error"});

}

};

export const deleteArtist = async (req: Request, res: Response) => {

  await Artist.findByIdAndDelete(req.params.id);
  res.json({ message: "Artist deleted" });

};

export const updateArtist = async (req: Request, res: Response) => {
  try {

    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(artist);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};