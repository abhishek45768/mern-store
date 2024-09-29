import axios from 'axios';

export const fetchCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get('https://dummyjson.com/products/categories');
    dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const selectCategory = (category) => ({
  type: "SELECT_CATEGORY",
  payload: category,
});
