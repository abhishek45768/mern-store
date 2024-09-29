import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchAllProducts } from '../redux/actions/productActions';
import Search from './Search';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch products based on selected category and search query
    if (selectedCategory === 'all' || selectedCategory === '') {
      dispatch(fetchAllProducts()); // Fetch all products if 'all' category is selected
    } else {
      dispatch(fetchProducts(selectedCategory, 1, searchQuery));
    }
  }, [dispatch, selectedCategory, searchQuery]);

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === 'All Categories') {
      dispatch(fetchAllProducts()); // Fetch all products only if 'All Categories' is selected
    } else {
      dispatch(fetchProducts(selectedCategory)); // Fetch products based on selected category
    }
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800">
  Discover Our Exquisite Range of Products
</h2>

      <Search onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col">
            <img 
              src={product.thumbnail} 
              alt={product.title}
              onError={(e) => {
                e.target.onerror = null; // Prevent looping
                e.target.src = 'https://via.placeholder.com/150'; // Fallback image
              }}
              className="w-full h-48 object-cover transition duration-300 ease-in-out transform hover:scale-110"
            />
            <div className="p-4 bg-white flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-2">{product.price}</p>
              </div>
              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
