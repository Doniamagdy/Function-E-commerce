import React, { useContext, useEffect, useState } from "react";
import { getSingleProduct } from "../../../services/products.service";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { addToCart } from "../../../services/cart.service";
import {CartContext} from "../../../context/CartProvider";
import { notify } from "../../../utils/toastify";


const errorMessage = "Can not display product now, please try again later";
const emptyStateMessage = "No product found";
function FetchSingleProduct() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  // or it can be destructed
  //const { productId } = useParams();
  const [count, setCount] = useState(0);
  const {cartItems, setCartItems} = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const data = await getSingleProduct(params.productId);
        setProduct(data);
      } catch (error) {
        // console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [params.productId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{errorMessage}</p>;
  }

  if (Object.keys(product).length === 0) {
    return <p>{emptyStateMessage}</p>;
  }

  const handleAddProductToCart = async () => {
    try {
      if(count === 0){
        notify("Please select quantity","error")
        return
      }
      const data = await addToCart({
        userId: 1,
        productId: params.productId,
        productQuantity: count,
      });
      console.log(data);
      notify("Product added successfully to the cart", "success")
      
      if(data){
        navigate("/cart")
      }

if(data.products.length > 0){
 setCartItems([
...cartItems,{
  id:data.products[0].id,
  title:data.products[0].title,
  price:data.products[0].price,
  quantity:data.products[0].quantity,
  total:data.products[0].total
}
      ])
}
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/2 p-6 mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <ProductCard
        image={product.thumbnail}
        title={product.title}
        price={product.price}
        description={product.description}
        category={product.category}
      />

      <div>
        <Button text={"+"} onClick={() => setCount(count + 1)} />
        <span>{count}</span>
        <Button text={"-"} onClick={() => count > 0 && setCount(count - 1)  } />
        <Button text={"Add to cart"} onClick={handleAddProductToCart} />
      </div>
      
    </div>
  );
}

export default FetchSingleProduct;
