import mongoose from "mongoose";

type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  accessToken: string[];
};

const tagSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true } }, { timestamps: true });

const categorySchema = new mongoose.Schema(
  { name: { type: String, required: true, unique: true } },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, requried: true, unique: true },
    price: { type: Number, required: true },
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "v1Tags", required: true }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "v1Categories",
      required: true,
    },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "v1Users" },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    accessToken: [String],
  },
  {
    timestamps: true,
  }
);

const Tags = mongoose.model("v1Tags", tagSchema);
const Categories = mongoose.model("v1Categories", categorySchema);
const Products = mongoose.model("v1Products", productSchema);
const Users = mongoose.model("v1Users", userSchema);

export { UserType, Tags, Categories, Products, Users };
