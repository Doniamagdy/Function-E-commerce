import axios from "axios";

export const addToCart = async ({ userId, productId, productQuantity }) => {
  const response = await axios.post("https://dummyjson.com/carts/add", {
    userId: userId,
    products: [
      {
        id: productId,
        quantity: productQuantity,
      },
    ],

    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.data);

  return response.data;
};

// delete cart

export const deleteCart = async () => {
  const response = await axios.delete("https://dummyjson.com/carts/1");
  console.log(response.data);

  return response.data;
};
