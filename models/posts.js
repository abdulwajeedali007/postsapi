import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title can't be empty"],
    },
    image: {
      type: String,
      default: "Image url",
    },
    description: {
      type: String,
      required: [true, "description can't be empty"],
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// module.export = mongoose.model("POSTS", PostSchema);
export default mongoose.model("Post", PostSchema);
