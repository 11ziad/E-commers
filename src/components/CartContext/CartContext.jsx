import axios from "axios"
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem('userToken')
  };

  const [cart, setCart] = useState(null);

  async function addCart(productId) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers });
      toast.success(data.message || 'Added to cart'
);
      displayCart();
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || 'Failed to add product to cart');
    }
  }

  async function displayCart() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setCart(data);
    } catch (err) {
      // console.log(err);
      toast.error('Failed to load basket');
    }
  }

  async function deleteCart(id) {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers });
      setCart(data);
      toast.success('The product has been removed from the cart');
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || 'Failed to delete product');
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setCart(data);
      toast.success(data.message || 'The basket has been cleared');
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || 'Failed to clear basket');
    }
  }

  async function updateCart(id, count) {
    try {
      const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers });
      setCart(data);
      toast.success('Updated successfully');
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || 'Failed to update quantity');
    }
  }

  useEffect(() => {
    displayCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addCart, clearCart, deleteCart, updateCart, displayCart }}>
      {children}
    </CartContext.Provider>
  );
}
