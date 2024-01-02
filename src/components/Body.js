import { useDispatch, useSelector } from "react-redux";
import { productsArr } from "../constants";
import Header from "./Header";
import Cart from "./Cart";
import { addToCart, cartOpen } from "../RTK/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Login";
import axios from "axios";

const Body = () => {
  const isCartOpen = useSelector((store) => store.cart.isCartOpen);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const userId = useSelector((store) => store.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenId = localStorage.getItem("authToken");

  async function addItemToCart(item, cartItems) {
    const findItem = cartItems.find((data) => data.id === item.id);
    if (findItem) alert("you already added this item");
    else {
      let url = `https://crudcrud.com/api/07b5b57472db4783886c89a2a93506b6/cart/${userId}`;
      await axios.post(url, item);
      dispatch(addToCart(item));
    }
  }

  // console.log("checkingBody");
  // useEffect(() => {
  //   if (!tokenId) navigate("/login");
  //   console.log("useEffectChecking");
  // }, [tokenId, navigate]);

  return tokenId ? (
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
              <Link to={"/store/product/" + item.id} key={item.id}>
                <div className="p-7">
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
              </Link>
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
  ) : (
    <Login />
  );
};

export default Body;
