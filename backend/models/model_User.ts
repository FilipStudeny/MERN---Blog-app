import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;
const validator = mongooseUniqueValidator;

const user_Schema = new Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 3 },
        user_image: { type: String, required: true },
        posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post'  }], //relation bewtean post and user

    },{ timestamps: true }
    );

user_Schema.plugin(validator);


export const USER: mongoose.Model<any> = mongoose.model("User", user_Schema);
