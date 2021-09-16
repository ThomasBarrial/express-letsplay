import { Wilder } from "../models";
import mongoose, { Schema } from "mongoose";

// Declaring Wilders Schema
const WilderSchema = new Schema<Wilder>({
  name: { 
    type: String,
    unique: true
  },
  city: String,
  skills: [{
    title: String,
    votes: Number,
  }],
});

const WilderModel = mongoose.model("wilder", WilderSchema);

// * Wilders CRUD with Mongoose
export const wildersDAO = {
  findAll: async () => {
    return await WilderModel.find();
  },
  findWilder: async (id: string) => {
    return await WilderModel.findById(id);
  },
  createWilder: async ({ name, city, skills }: Wilder) => {
    await WilderModel.init();
    const wilder = new WilderModel({
      name,
      city,
      skills,
    });
    return await wilder.save();
  },
  updateWilder: async (id: string, data: any) => {
    return await WilderModel.findByIdAndUpdate(
      id,
      data,
    ).then(() => {
      return WilderModel.findById(id);
    });
  },
  deleteWilder: async (id: string) => {
    return await WilderModel.findByIdAndDelete(id);
  }
}