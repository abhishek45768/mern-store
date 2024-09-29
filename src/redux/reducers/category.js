const initialState = {
  categories: [],
  selectedCategory: 'all', // Set default category to 'all'
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_SUCCESS":
      return { ...state, categories: action.payload };
    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

export default category;
