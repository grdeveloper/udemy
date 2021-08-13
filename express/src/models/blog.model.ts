import * as mongoose from 'mongoose';

interface BlogInputs {
  blog: string;
  title: string;
  imageUrl: string;
  user: string;
}

interface BlogDocument extends mongoose.Document {
  blog: string;
  title: string;
  imageUrl: string;
  user: string;
  createdAt: Date;
}

interface BlogModel extends mongoose.Model<BlogDocument> {
  createBlog(inputs: BlogInputs): BlogDocument;
}

const blogSchema = new mongoose.Schema({
  blog: {type: String, required: true},
  title: {type: String, required: true},
  imageUrl: {type: String},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  toJSON: {
    transform(document, returnDocument) {
      returnDocument.id = returnDocument._id;
      delete returnDocument._id;
      delete returnDocument.__v;
      delete returnDocument.updatedAt;
    }
  },
  timestamps: true,
});

blogSchema.statics.createBlog = (inputs: BlogInputs) => new Blog(inputs);

export const Blog = mongoose.model<BlogDocument, BlogModel>('Blog', blogSchema);
