import mongoose from 'mongoose';

const sessionLogSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
      index: true,
    },
    challenge: {
      type: String,
      default: '',
    },
    userSolution: {
      type: String,
      default: '',
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      default: '',
    },
    missingTradeoffs: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    reviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const SessionLog = mongoose.models.SessionLog || mongoose.model('SessionLog', sessionLogSchema);
