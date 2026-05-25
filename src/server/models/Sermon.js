import mongoose from "mongoose";

const SermonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    speaker: {
      type: String,
      required: [true, "Speaker name is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Sermon date is required"],
    },
    audioUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["sunday", "wednesday", "friday", "special", "series", "other"],
      default: "sunday",
    },
    tags: [{
      type: String,
      trim: true,
    }],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

SermonSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Sermon || mongoose.model("Sermon", SermonSchema);
