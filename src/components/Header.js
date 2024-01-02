import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartOpen } from "../RTK/cartSlice";

const Header = (props) => {
  let cartItem = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <section className="z-20 absolute">
      <div className="w-full p-3 bg-black fixed flex justify-end">
        <section className="w-[60%] flex justify-start">
          <section className="w-[70%] flex justify-between">
            <ul className="flex gap-16 text-white ">
              <li>
                <NavLink to="/" className="aria-[current=page]:underline">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/store" className="aria-[current=page]:underline">
                  Store
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="aria-[current=page]:underline">
                  about
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="aria-[current=page]:underline"
                >
                  contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="aria-[current=page]:underline">
                  login
                </NavLink>
              </li>
            </ul>

            {props.showCart ? (
              <div className="flex">
                <button className="flex" onClick={() => dispatch(cartOpen())}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  <span className="pl-1 text-white">{cartItem.length}</span>
                </button>
              </div>
            ) : null}
          </section>
        </section>
      </div>
    </section>
  );
};

export default Header;
