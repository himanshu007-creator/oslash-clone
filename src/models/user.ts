import mongoose, { Document, Schema } from "mongoose";

export interface ShortURL extends Document {
  _id: any;
  _doc: any;
  username: string;
  password: string;
  links: [
    {
      shortlink: string;
      description: string;
      url: string;
      tags?: string[];
      visits: Number;
      created_at: String;
    }
  ];
}

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  links: [
    {
      shortlink: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      tags: [{ type: String }],
      visits: {
        type: Number,
        default: 0,
      },
      created_at: { type: Date, required: true, default: new Date() },
    },
  ],
});

const shortUrl = mongoose.model<ShortURL>("shortUrl", schema);

export default shortUrl;
