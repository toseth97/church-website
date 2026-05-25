import mongoose from "mongoose";

const TestimonySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    testimony: {
      type: String,
      required: [true, "Testimony text is required"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "Member",
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

TestimonySchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Testimony || mongoose.model("Testimony", TestimonySchema);
