import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, clearCart } from '../services/CartService';
import { Cart } from '../types/types';

export default function ShoppingCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch((err) => console.error('Failed to fetch cart:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (course_id: number) => {
    await removeFromCart(course_id);
    const updated = await getCart();
    setCart(updated);
  };

  const handleClear = async () => {
    await clearCart();
    setCart(null);
  };

  const subtotal = cart?.items?.reduce((total, item) => total + (item.discounted_price || item.price), 0) || 0;

  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-slate-900">Shopping Cart</h1>

      {loading ? (
        <p className="text-center mt-8 text-gray-500">Loading cart...</p>
      ) : !cart || cart.items.length === 0 ? (
        <p className="text-center mt-8 text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <div key={item.course_id} className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200">
                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{item.course_title}</h3>
                    <p className="text-sm text-slate-500">Course ID: {item.course_id}</p>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="text-sm font-semibold text-slate-900">
                      {item.discounted_price
                        ? <>
                            <span className="line-through text-gray-500 mr-2">{item.price.toLocaleString()}₫</span>
                            <span>{item.discounted_price.toLocaleString()}₫</span>
                          </>
                        : <span>{item.price.toLocaleString()}₫</span>}
                    </div>

                    <button
                      onClick={() => handleRemove(item.course_id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
            <ul className="text-slate-500 font-medium space-y-4 text-sm">
              <li className="flex justify-between">Subtotal <span className="text-slate-900 font-semibold">{subtotal.toLocaleString()}₫</span></li>
              <hr className="border-slate-300" />
              <li className="flex justify-between font-semibold text-slate-900 text-base">Total <span>{subtotal.toLocaleString()}₫</span></li>
            </ul>

            <div className="mt-8 space-y-4">
              <button type="button" className="text-sm px-4 py-2.5 w-full font-medium bg-slate-800 hover:bg-slate-900 text-white rounded-md">Buy Now</button>
              <button onClick={handleClear} type="button" className="text-sm px-4 py-2.5 w-full font-medium bg-slate-100 text-slate-900 border border-gray-300 rounded-md">Clear Cart</button>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <img src='https://readymadeui.com/images/master.webp' alt="card1" className="w-10 object-contain" />
              <img src='https://readymadeui.com/images/visa.webp' alt="card2" className="w-10 object-contain" />
              <img src='https://readymadeui.com/images/american-express.webp' alt="card3" className="w-10 object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
