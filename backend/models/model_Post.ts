import mongoose from "mongoose";

const Schema = mongoose.Schema;

const post_Schema = new Schema({
        title: { type: String, required: true, },
        description: { type: String, required: true, },
        image: { type: String },
        creator_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User'  }, //relation bewtean post and user
        creator_name: { type: String, required: true, ref: 'User'  }, //relation bewtean post and user
    },
    { timestamps: true }
    );

export const POST: mongoose.Model<any> = mongoose.model("Post", post_Schema);
