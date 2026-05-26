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
        streamCode: {
            type: String,
            unique: true,
            sparse: true,
            default: null,
        },
        startedAt: {
            type: Date,
            default: null,
        },
        stoppedAt: {
            type: Date,
            default: null,
        },
        recordingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recording",
            default: null,
        },
        recordingPath: {
            type: String,
            default: null,
        },
        recordingFileName: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

LiveStreamSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    },
});

export default mongoose.models.LiveStream ||
    mongoose.model("LiveStream", LiveStreamSchema);
