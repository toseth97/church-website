import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["worship", "fellowship", "outreach", "conference", "charity", "other"],
      default: "other",
    },
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

EventSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
