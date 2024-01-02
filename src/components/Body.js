import { useDispatch, useSelector } from "react-redux";
import { productsArr } from "../constants";
import Header from "./Header";
import Cart from "./Cart";
import { addToCart, cartOpen } from "../RTK/cartSlice";

const Body = () => {
  const isCartOpen = useSelector((store) => store.cart.isCartOpen);
  const cartItems = useSelector((store) => store.cart.cartItems);

  const dispatch = useDispatch();

  function addItemToCart(item, cartItems) {
    const findItem = cartItems.find((data) => data.id === item.id);
    if (findItem) alert("you already added this item");
    else dispatch(addToCart(item));
  }

  return (
    <section className="relative">
      <Header showCart={true} />
      {isCartOpen && <Cart />}

      <div className="p-16 2xl:container w-full bg-fuchsia-300 mx-auto">
        <h1 className="text-8xl text-center">The Generics</h1>
      </div>

      <div className="2xl:container text-black mx-auto flex flex-col items-center">
        <h3 className="font-sans text-2xl pt-4">Arts</h3>
        <section className="grid grid-cols-2 place-items-center gap-x-56">
          {productsArr.map((item) => {
            return (
              <div className="p-7" key={item.id}>
                <h4 className="p-3 text-center font-bold text-lg">
                  {item.title}
                </h4>
                <img src={item.imageUrl}></img>
                <div className="flex justify-between p-1">
                  <h5>₹{item.price}</h5>
                  <button
                    className="p-2 bg-green-600 rounded-md text-white"
                    onClick={() => addItemToCart(item, cartItems)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </section>
        <div className="pb-5">
          <button
            className="text-md text-white bg-blue-500 p-3 rounded-md font-bold"
            onClick={() => dispatch(cartOpen())}
          >
            See On Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Body;
