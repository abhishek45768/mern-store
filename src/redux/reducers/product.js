// src/redux/reducers/productReducer.js

const initialState = {
  products: [],
  loading: false,
  error: null,
  message: null, // Message to store when no products are found
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_ALL_PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_ALL_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_ALL_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "NO_PRODUCTS_FOUND":
      return { ...state, loading: false, products: [], message: action.payload }; 
    default:
      return state;
  }
};

export default productReducer;