import axios from 'axios';

// Action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const NO_PRODUCTS_FOUND = 'NO_PRODUCTS_FOUND'; // New action for no products found


// Action to fetch products based on category and page
export const fetchProducts = (category, page = 1, query = "") => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    let url;
    if (query) {
      url = `https://dummyjson.com/products/search?q=${query}&limit=10&skip=${(page - 1) * 10}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=10&skip=${(page - 1) * 10}`;
    } else {
      url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
    }

    const { data } = await axios.get(url);

    if (data.products && data.products.length > 0) {
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products });
    } else {
      dispatch({ type: NO_PRODUCTS_FOUND });
    }
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};
// Action to fetch all products in batches
export const fetchAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    let page = 1;
    let allProducts = [];
    let hasMore = true;

    while (hasMore) {
      try {
        // Fetch products from the API
        const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);

        // Check if products were returned
        if (data.products && data.products.length > 0) {
          allProducts = allProducts.concat(data.products);

          // Dispatch the new products immediately
          dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: allProducts });

          // Increment page for next request
          page++;
        } else {
          // No more products to fetch
          hasMore = false;
        }
      } catch (error) {
        // Dispatch error action
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
        hasMore = false; // Stop fetching on error
      }
    }
  };
};