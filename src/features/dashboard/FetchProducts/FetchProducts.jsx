import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/products.service";

function FetchProducts() {
  let [productTitle, setProductTitle] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProductTitle(data.products)
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  
  return <div>
  
{productTitle.map((productObject)=>(<p>{productObject.title}</p>
)

)}


  </div>;
}

export default FetchProducts;
