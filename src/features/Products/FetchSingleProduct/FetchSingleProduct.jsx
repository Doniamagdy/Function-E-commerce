import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../../../services/products.service";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";

const errorMessage = "Can not display product now, please try again later";
const emptyStateMessage = "No product found";
function FetchSingleProduct() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  // or it can be destructed
  //const { productId } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const data = await getSingleProduct(params.productId);
        setProduct(data);
      } catch (error) {
        console.log(error);
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

  return (
    <div className="w-1/2 mx-auto">
      <ProductCard
        image={product.thumbnail}
        title={product.title}
        price={product.price}
        description={product.description}
        category={product.category}
      />
    </div>
  );
}

export default FetchSingleProduct;
