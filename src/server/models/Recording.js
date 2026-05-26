import mongoose from "mongoose";

const RecordingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: "Untitled Recording",
        },
        description: {
            type: String,
            default: "",
        },
        audioUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 0, // in seconds
        },
        startedAt: {
            type: Date,
            required: true,
        },
        stoppedAt: {
            type: Date,
            required: true,
        },
        linkedLiveStreamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LiveStream",
            default: null,
        },
        downloadCount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["recording", "processing", "completed", "failed"],
            default: "completed",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

// Calculate duration before saving
RecordingSchema.pre("save", function (next) {
    if (this.startedAt && this.stoppedAt) {
        this.duration = Math.floor((this.stoppedAt - this.startedAt) / 1000); // convert to seconds
    }
    next();
});

RecordingSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    },
});

export default mongoose.models.Recording ||
    mongoose.model("Recording", RecordingSchema);
