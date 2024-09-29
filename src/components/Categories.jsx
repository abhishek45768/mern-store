import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategory } from '../redux/actions/categoryActions';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categorySlug) => {
    dispatch(selectCategory(categorySlug)); // Dispatch the selected category
  };

  return (
    <div className="mb-6 px-2"> {/* Reduced padding on the sides */}
      <h2 className="text-2xl font-bold mb-3 text-center">Select a Category</h2>
      <ul className="flex flex-wrap justify-center">
        {/* Add All Category */}
        <li
          className={`cursor-pointer px-3 py-2 rounded transition duration-300 mb-2 mx-1 sm:mx-2 ${
            selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
          }`}
          onClick={() => handleCategoryClick('all')}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category.slug}
            className={`cursor-pointer px-3 py-2 rounded transition duration-300 mb-2 mx-1 sm:mx-2 ${
              selectedCategory === category.slug ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
