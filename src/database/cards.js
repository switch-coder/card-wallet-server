import mongoose from "mongoose";

export const Card = mongoose.model("Card", { name: String, store: String, img: String, cardNumber: String, isCutting: Boolean, bgColor: String, color: String })