import { addToCart } from "../RTK/cartSlice";
import axios from "axios";

const IsReload = async (dispatch) => {
  try {
    console.log("check Reload");
  } catch (error) {
    console.log("Error IsReload", error);
  }
};

export default IsReload;
