import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    user:{
        type: String,
        required: true,
      },
      productname:{
        type:String,
        required:true,
      },
      details:{
        type:String,
        required:true,
      }
    }
);
const Products = mongoose.model("Products", ProductSchema);
export default Products;