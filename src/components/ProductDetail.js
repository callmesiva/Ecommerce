import { useParams } from "react-router-dom";
import { productsArr, externalApi } from "../constants";
import { addToCart } from "../RTK/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Cart from "./Cart";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const isCartOpen = useSelector((store) => store.cart.isCartOpen);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();

  async function addToCartItem(prod) {
    const findItem = cartItems.find((data) => data.id === prod.id);
    if (findItem) alert("you already added this item");
    else {
      try {
        let userId = localStorage.getItem("userId");
        let url = `http://127.0.0.1:3800/cartInfo/${userId}`;
        await axios.post(url, prod);

        dispatch(addToCart(prod));
      } catch (error) {
        console.error("Error addItemToCart product", error);
      }
    }
  }

  return (
    <section className="relative">
      <Header showCart={true} />
      {isCartOpen && <Cart />}

      <div className="p-16 2xl:container w-full mx-auto">
        {productsArr.map((prod) => {
          return prod.id == id ? (
            <div
              className="flex flex-col items-center justify-center"
              key={prod.id}
            >
              <h1 className="text-4xl font-bold mb-4">{prod.title}</h1>
              <img
                src={prod.imageUrl}
                alt="Product"
                className="w-64 h-64 object-cover mb-4"
              />
              <p className="text-xl mb-2">
                Elevate your space with our exquisite and thoughtfully craft
              </p>
              <p className="text-2xl font-bold mb-4">₹{prod.price}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => addToCartItem(prod)}
              >
                Add to Cart
              </button>
              <div className="w-64">
                <h2 className="text-2xl font-bold mb-2">Reviews</h2>
                <div className="border-t border-gray-200">
                  <div className="py-2">
                    <h3 className="text-xl font-bold">John Doe</h3>
                    <p>Great product! Highly recommended.</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <h3 className="text-xl font-bold">Jane Smith</h3>
                  <p>Fast shipping and excellent customer service.</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetail;
