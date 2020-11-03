import mongoose from "mongoose";


export const User = mongoose.model("User", { ID: String, name: String, passwordHash: String, token: String, cards: ['Card'] })