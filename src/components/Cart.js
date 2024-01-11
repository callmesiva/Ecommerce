import { useDispatch, useSelector } from "react-redux";
import { cartOpen, removeFromCart, clearCart } from "../RTK/cartSlice";
import axios from "axios";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();

  async function removeItemCart(item) {
    try {
      let userId = localStorage.getItem("userId");
      await axios.delete(`http://127.0.0.1:3800/cartInfo/${userId}/${item.id}`);
      dispatch(removeFromCart(item));
    } catch (error) {
      console.log("Error removeItemCart ", error);
    }
  }

  async function clearCartItem() {
    try {
      let userId = localStorage.getItem("userId");
      if (cartItems.length) {
        await axios.delete(
          `http://127.0.0.1:3800/cartInfo/${userId}/${"empty"}`
        );
        dispatch(clearCart());
        alert("Thanks For Purchasing..!");
      } else {
        alert("Add something to purchase");
      }
    } catch (err) {
      console.error("Error clearCart", err);
    }
  }

  return (
    <div className="fixed right-0 top-11">
      <div className="w-96 bg-white border-2 rounded-xl shadow-xl text-black border-black h-96">
        <h1 className="font-bold text-center text-lg py-3">Cart</h1>
        <ul className="flex justify-around pb-3">
          <li>Item</li>
          <li>Price</li>
          <li>Quantity</li>
        </ul>

        <section className="h-1/2 overflow-auto">
          {cartItems.map((item) => {
            return (
              <div
                className="flex justify-around gap-4 py-3 border-b-2"
                key={item.id}
              >
                <div className="gap-y-2 items-center w-20">
                  <img src={item.imageUrl} className="size-10"></img>
                  <h5 className="text-wrap">{item.title}</h5>
                </div>

                <h3>{item.price}</h3>
                <div className="flex flex-col w-20 items-center gap-y-4">
                  <input
                    className="size-5 border-2 text-center border-gray-500"
                    value={0}
                    readOnly
                  ></input>
                  <button
                    className="w-16 h-6 rounded-md bg-red-600 text-white"
                    onClick={() => removeItemCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <div className="flex justify-evenly pt-7">
          <button
            className="w-20 h-10 bg-red-600 text-white rounded-md"
            onClick={() => dispatch(cartOpen())}
          >
            Close
          </button>
          <button
            className="w-20 h-10 bg-green-400 text-white rounded-md"
            onClick={() => clearCartItem()}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
