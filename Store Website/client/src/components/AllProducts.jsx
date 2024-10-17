import { useEffect } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import useFetch from '../hooks/useFetch';

import { useSelector } from 'react-redux'

export default function AllProducts() {
  const { data: products, loading, error } = useFetch('/products');

  const availableQuantity = useSelector((state) => state.cart.availableQuantities)
  return (
    <div className="max-w-screen-2xl m-auto">
      <Navbar />
      <div>
        {/* Loading and Error State Handling */}
        {loading && <p className="text-center text-xl font-bold">Loading...</p>}
        {error && <p className="text-center text-xl text-red-500">Error: {error}</p>}

        {/* Product List */}
        {!loading && !error && products?.length > 0 && (
          <div className="flex flex-wrap gap-4 items-center justify-center pt-[100px]">
            {products.map((product) => (
              <Product
                key={product.product_id}
                id={product.product_id}
                src={product.image_src}
                price={product.price}
                desc={product.product_description}
                name={product.product_name}
                quantity={product.stock_quantity}
                category={product.category_id}
                subcategory={product.subcategory_name.toLowerCase()}
                realQuantity={availableQuantity[product.product_id] ?? product.stock_quantity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
