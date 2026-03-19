import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

role:{
type:String,
required:true
},

desc:String,

img:{
type:String,
required:true
},

social:{
facebook:String,
twitter:String,
instagram:String,
linkedin:String
}

});

export default mongoose.model("Artist",artistSchema);