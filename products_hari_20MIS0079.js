// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllProductsPage} />
        <Route path="/product/:productId" component={ProductDetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;

// AllProductsPage.js
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { fetchProducts } from '../api'; // Implement fetchProducts function to fetch products from API

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts(filters, pagination);
      setProducts(data);
    };
    fetchData();
  }, [filters, pagination]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination({ ...pagination, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  return (
    <div>
      <h1>All Products</h1>
      <FilterBar onFilterChange={handleFilterChange} />
      <ProductList products={products} />
      <Pagination
        currentPage={pagination.page}
        totalPages={Math.ceil(products.length / pagination.pageSize)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AllProductsPage;

// ProductList.js
import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;

// ProductCard.js
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}</p>
      <p>Availability: {product.availability}</p>
      {/* Add more details */}
    </div>
  );
}

export default ProductCard;