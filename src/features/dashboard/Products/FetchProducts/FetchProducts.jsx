import React, { useEffect, useState } from "react";
import { getProducts } from "../../../../services/products.service";
import Spinner from "../../../../components/Spinner/Spinner";

function FetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-3 text-left font-semibold">#</th>
                <th className="p-3 text-left font-semibold">Image</th>
                <th className="p-3 text-left font-semibold">Title</th>
                <th className="p-3 text-left font-semibold">Price</th>
                <th className="p-3 text-left font-semibold">Brand</th>
                <th className="p-3 text-left font-semibold">Category</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-left font-semibold"></th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-gray-600 text-sm">
              {products?.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td>{row.id}</td>
                  <td>
                    <img loading="lazy" className="w-12 h-12 object-cover" alt={row.title} src={row.thumbnail} />
                  </td>
                  <td className="p-3">{row.title}</td>
                  <td className="p-3">${row.price}</td>
                  <td className="p-3">{row.brand}</td>
                  <td className="p-3">{row.category}</td>
                  <td className="p-3">{row.availabilityStatus}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default FetchProducts;
