import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Product from './Product';

import { useSelector } from 'react-redux'

export default function Products() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { data, loading, error } = useFetch('/products/' + id); // fetching products by ID

  const availableQuantity = useSelector((state) => state.cart.availableQuantities)

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  return (
    <div className="max-w-screen-2xl m-auto">
      <Navbar />
        <div className='pt-[100px]'>
        <h1 className="m-auto w-full text-center text-8xl font-bold mb-10">Products</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {
            loading ? ( <div>Loading products...</div> ) : 
            error ? ( <div>Error fetching products: {error}</div>) : 
            products.length > 0 ? (
              products.map((product) => (
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
              ))
            ) : (
              <div>There are no products yet !!!</div>
            )
          }
        </div>
      </div>
    </div>
  );
}
