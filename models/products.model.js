import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productName: {type: String, required:true},
    price: {type: Number, required:true},
    image: {type: String, required: true},
    productDescription: {type: String, required: true},
    department: {type: String, required: true},
    id: {type: Number, required:true}
})

const Products=mongoose.model("Product",productSchema)

export default Products