import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import Button from "../../components/Button/Button";
import { deleteCart } from "../../services/cart.service";
import { notify } from "../../utils/toastify.js";


function Cart() {
  const { cartItems } = useContext(CartContext);

  const handleDelete = async()=>{
    try{
      const data = await deleteCart()
      console.log(data);
      notify("Your cart has been deleted successfully","success")

    }catch(error){
console.log(error)
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="space-y-4 ">
        {cartItems?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white  p-4 hover:shadow-lg transition"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-500">Price: {item.price} $</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-green-600">${item.total}</p>
            </div>
          </div>
        ))}
      </div>

      <Button text={"Delete"} onClick={handleDelete} />
      <Button text={"Checkout"} onClick={()=>alert("Your order has been submitted successfully!")}/>
    </div>
  );
}

export default Cart;
