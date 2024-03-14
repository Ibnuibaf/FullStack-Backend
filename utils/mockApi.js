import axios from "axios"
import Products from "../models/products.model.js";
export const fetchAndStoreData=async()=>{
    try {
        console.log("Products Adding to the Database...");
        const response=await axios.get('https://64e0caef50713530432cafa1.mockapi.io/api/products')
        await Products.insertMany(response.data)
        console.log("Products Added successfully into the Database !");
    } catch (error) {
        console.error(error);
        setTimeout(fetchAndStoreData,5000)
    }
}