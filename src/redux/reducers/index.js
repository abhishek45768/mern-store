// src/redux/reducers/index.js
import { combineReducers } from "redux";
import productReducer from "./product"; // Ensure correct naming
import category from "./category"; // Make sure this file exists
 // Import the searchReducer

export default combineReducers({
  products: productReducer,
  categories: category,
  
});
