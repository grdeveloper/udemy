import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

interface UserInputs {
  username: string;
  password: string;
}

interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  createUser(inputs: UserInputs): UserDocument;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(document, returnDocument) {
        returnDocument.id = document._id;
        delete returnDocument._id;
        delete returnDocument.__v;
        delete returnDocument.password;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.get("password"), salt);
    this.set("password", hashedPassword);
  }
  done();
});

userSchema.statics.createUser = (inputs: UserInputs) => new User(inputs);

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
