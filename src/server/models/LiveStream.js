import mongoose from "mongoose";

const LiveStreamSchema = new mongoose.Schema(
  {
    isLive: {
      type: Boolean,
      default: false,
    },
    audioUrl: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "Sunday Worship Service",
    },
    startedAt: {
      type: Date,
      default: null,
    },
    stoppedAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

LiveStreamSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.LiveStream || mongoose.model("LiveStream", LiveStreamSchema);
