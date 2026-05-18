import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/products.service";
import Spinner from "../../../components/Spinner/Spinner";
import ProductCard from "../../../components/ProductCard/ProductCard";

const errorMessage = "Can not display products now, please try again later";
const emptyStateMessage = "No products found";
function FetchProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data.products);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <Spinner />;
  }  
  if (error) {
    return <h2 className="text-center font-semibold">{errorMessage}</h2>;
  }  
  if (allProducts.length === 0) {
    return <h2 className="text-center font-semibold">{emptyStateMessage}</h2>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {allProducts.map((product) => (
        <ProductCard
          key={product.id}
          image={product.thumbnail}
          title={product.title}
          price={product.price}
          description={product.description}
          category={product.category}
        />
      ))}
    </div>
  );
}

export default FetchProducts;
