// 1- Create async fn to fetch products
// 2- To deal with data use axios package axios: method(URL)
import axios from "axios";

export const getProducts = async () => {
  let response = await axios.get("https://dummyjson.com/products");
  console.log(response);
  
  return response.data;
};
