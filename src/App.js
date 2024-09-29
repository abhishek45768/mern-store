import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import Categories from './components/Categories';
import Products from './components/Products';
import './index.css'; // Ensure you import your Tailwind CSS file

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-6xl mx-auto p-5 bg-gray-50 rounded-lg shadow-lg">
        {/* Enhanced Aesthetic Title */}
        <h1 className="text-5xl font-semibold text-center mb-4 text-gray-800">
          Welcome to Our Product Wonderland
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Explore unique and delightful products crafted just for you
        </p>
        <Categories />
        <Products />
      </div>
    </Provider>
  );
};

export default App;
