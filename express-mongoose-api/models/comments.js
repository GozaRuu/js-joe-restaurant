const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    dish: {
      type: Schema.Types.ObjectId,
      ref: "Dish",
      requied: true
    }
  },
  {
    timestamps: true
  }
);

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
