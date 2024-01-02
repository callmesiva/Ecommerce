import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBase/fbConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUserId } from "../RTK/userInfo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const tokenId = localStorage.getItem("authToken");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("authToken", response.user.accessToken);
      //setTimeout(() => localStorage.removeItem("authToken"), 5000);
      const decodedToken = jwtDecode(response.user.accessToken);
      dispatch(addUserId(decodedToken.user_id));
      navigate("/store");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        {tokenId ? (
          <div className="flex flex-col gap-3 justify-center">
            <h1 className="font-bold ">you're already logged in</h1>
            <button
              className="p-3 text-white bg-blue-500 rounded-md"
              onClick={() => navigate("/store")}
            >
              click To Store
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
