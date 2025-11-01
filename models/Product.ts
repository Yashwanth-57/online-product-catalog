import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category?: string;
  slug: string;
  inventory?: number;
  lastUpdated?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    slug: { type: String, required: true, unique: true },
    inventory: { type: Number },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//  Auto-generate slug before save
ProductSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
