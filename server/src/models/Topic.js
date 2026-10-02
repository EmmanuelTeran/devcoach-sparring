import mongoose from 'mongoose';

const reviewHistorySchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    userInput: {
      type: String,
      default: '',
    },
    aiFeedback: {
      type: String,
      default: '',
    },
    reviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['hard_skill', 'soft_skill'],
    },
    type: {
      type: String,
      required: true,
      enum: ['theory', 'practice'],
    },
    srsStage: {
      type: Number,
      default: 0,
    },
    easeFactor: {
      type: Number,
      default: 2.5,
      min: 1.3,
    },
    intervalDays: {
      type: Number,
      default: 0,
    },
    nextReviewAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    level: {
      type: String,
      enum: ['junior', 'mid', 'senior'],
      default: 'junior',
    },
    history: [reviewHistorySchema],
  },
  {
    timestamps: true,
  }
);

// Índice compuesto para optimizar la consulta de temas pendientes
topicSchema.index({ nextReviewAt: 1, srsStage: 1 });

export const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);
