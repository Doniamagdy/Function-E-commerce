import React, { useEffect, useState } from "react";
import { getProducts, searchProduct } from "../../../services/products.service";
import Spinner from "../../../components/Spinner/Spinner";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";

const errorMessage = "Can not display products now, please try again later";
const emptyStateMessage = "No products found";
function FetchProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const handlesSearch = async (value) => {
    try {
      const data = await searchProduct(value);
      setAllProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <SearchBar value={search} onChange={setSearch} onSearch={handlesSearch} />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {allProducts.map((product) => (
          <Link to={`/singleProduct/${product.id}`} key={product.id}>
            <ProductCard
              image={product.thumbnail}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default FetchProducts;
