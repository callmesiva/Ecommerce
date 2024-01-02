import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { productsArr } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../RTK/cartSlice";
import Cart from "./Cart";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const isCartOpen = useSelector((store) => store.cart.isCartOpen);
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);

  async function postData(prod) {
    try {
      let url = `https://crudcrud.com/api/07b5b57472db4783886c89a2a93506b6/cart`;
      console.log(userId);
      await axios.post(url, prod);
      dispatch(addToCart(prod));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="relative">
      <Header showCart={true} />
      {isCartOpen && <Cart />}

      <div className="p-16 2xl:container w-full mx-auto">
        {productsArr.map((prod) => {
          return prod.id == id ? (
            <div className="flex flex-col items-center justify-center">
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
                onClick={() => postData(prod)}
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
