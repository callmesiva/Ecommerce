import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, cartOpen } from "../RTK/cartSlice";
import { productsArr, externalApi } from "../constants";
import Header from "./Header";
import Cart from "./Cart";
import Login from "./Login";
import IsReload from "./IsReload";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const isCartOpen = useSelector((store) => store.cart.isCartOpen);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const tokenId = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  async function addItemToCart(item, cartItems) {
    const findItem = cartItems.find((data) => data.id === item.id);
    if (findItem) alert("you already added this item");
    else {
      try {
        let userId = localStorage.getItem("userId");
        let url = `http://127.0.0.1:3800/cartInfo/${userId}`;
        await axios.post(url, item);

        dispatch(addToCart(item));
      } catch (error) {
        console.error("Error addItemToCart :", error);
      }
    }
  }

  async function getData() {
    try {
      let userId = localStorage.getItem("userId");
      let data = await axios.get(`http://127.0.0.1:3800/cartInfo/${userId}`);
      dispatch(addToCart(data.data));
    } catch (error) {
      console.log("Error IsReload", error);
    }
  }

  if (tokenId)
    useEffect(() => {
      getData();
    }, []);

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
              <div className="p-7" key={item.id}>
                <Link to={"/store/product/" + item.id}>
                  <h4 className="p-3 text-center font-bold text-lg">
                    {item.title}
                  </h4>
                  <img src={item.imageUrl}></img>
                </Link>

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
  ) : (
    <Login />
  );
};

export default Body;
