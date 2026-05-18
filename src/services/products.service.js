// 1- Create async fn to fetch products
// 2- To deal with data use axios package axios: method(URL)
import axios from "axios";

//1- get all products for users
export const getProducts = async () => {
  let response = await axios.get("https://dummyjson.com/products");
  return response.data;
};


// 2. function get single product
export const getSingleProduct = async (id)=>{
  let response = await axios.get(`https://dummyjson.com/products/${id}`)
return response.data
}
