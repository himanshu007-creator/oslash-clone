import mongoose, { Document } from "mongoose";

export interface ShortURL extends Document {
  shortlink: string;
  description: string;
  url: string;
  tags: string[];
  visits: Number;
}

const schema = new mongoose.Schema({
  shortLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  vistis: {
    type: Number,
    default: 0,
  },
});
const shortUrl = mongoose.model<ShortURL>("shortUrl", schema);

export default shortUrl;
