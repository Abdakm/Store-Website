import { useState, useRef } from 'react';
import Toggle from './Toggle';
import { Link } from 'react-router-dom';
import { TiDeleteOutline } from "react-icons/ti";

import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, increceQuantitiesByOne, decreceQuantitiesByOne } from '../features/cart/cartSlice'

import { TiArrowDownThick } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";

import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice)

  const handleRemoveFromCart = (id, quantity) => {
    dispatch(removeFromCart({ id, quantity }));
  }

  const handleIncreceQuantitiesByOne = (id, quantity) => {
    dispatch(increceQuantitiesByOne({ id, quantity }))
  }
  const handledecreceQuantitiesByOne = (id, quantity) => {
    dispatch(decreceQuantitiesByOne({ id, quantity }))
  }

  let realPrice = 0;
  if(totalPrice.length > 0){
    realPrice = totalPrice
    .map(price => price.realQuantity * +price.price)
    .reduce((acc, item) => acc + item ).toFixed(2)
  }

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let style = open ? 'max-h-screen' : 'max-h-0 overflow-hidden';

  const container = useRef()
  const tl = useRef()

  useGSAP(() => {
    const links = document.querySelectorAll('.link');
    tl.current = gsap
    .timeline()
    .from(links[0], { x: -200, scale: 0, opacity: 0 })
    .from(links[1], { x: -200, scale: 0, opacity: 0 }, '<')
    .from(links[2], { x: -200, scale: 0, opacity: 0 }, '<')
    .from(links[3], { x: -200, scale: 0, opacity: 0 }, '<')
  }, { scope: container})
  return (
    <div className="flex flex-wrap place-items-center fixed z-10 select-none">
      <section className="relative w-full">
        <div className="mx-auto max-w-screen-2xl bg-gray-900">
          <nav className="flex justify-between text-white w-full">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center justify-between">
              <a className="text-3xl font-bold font-heading" href="#">Logo Here.</a>
              <ul ref={container} className="hidden xl:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li className='link'>
                  <Link className="hover:text-gray-200" to="/">Home</Link>
                </li>
                <li className='link'>
                  <a className="hover:text-gray-200" href="#">Category</a>
                </li>
                <li className='link'>
                  <Link className="hover:text-gray-200" to="/products">All Products</Link>
                </li>
                <li className='link'>
                  <a className="hover:text-gray-200" href="#">Contact Us</a>
                </li>
              </ul>
              <div className="flex items-center space-x-5">
                <button className="hover:text-gray-200" aria-label="Favorites">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button 
                  className="relative flex items-center hover:text-gray-200" 
                  aria-label="Cart"
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {products.length}
                  </span>
                </button>
                <Toggle />
              </div>
            </div>
            <button
              className="xl:hidden flex mr-6 items-center"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
          <div className={`bg-gray-900 text-white w-screen transition-all duration-500 ${style}`}>
            <ul className="xl:hidden flex flex-col px-4 mx-auto font-semibold font-heading">
              <li>
                <Link className="hover:text-gray-200 hover:bg-gray-800 block p-4" to="/">Home</Link>
              </li>
              <li>
                <a className="hover:text-gray-200 hover:bg-gray-800 block p-4" href="#">Category</a>
              </li>
              <li>
                <Link className="hover:text-gray-200 hover:bg-gray-800 block p-4" to="/products">All Products</Link>
              </li>
              <li>
                <a className="hover:text-gray-200 hover:bg-gray-800 block p-4" href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div>
  {dropdownOpen && (
    <div className="absolute right-0 top-[60px] mt-2 w-70 p-2 bg-white shadow-lg rounded-lg z-50">
      <ul className="py-1 text-gray-900">
        {products.length > 0 ? (
          products.map((product, index) => (
            <li key={index} className="flex items-center px-4 py-2 justify-between hover:bg-gray-200 cursor-pointer rounded-lg">
              <div className='mr-4'>
                <TiArrowUpThick 
                  className='text-2xl cursor-pointer text-green-600 transition-all duration-300 hover:scale-125'
                  onClick={() => product.quantity != product.realQuantity && handleIncreceQuantitiesByOne(product.id, product.realQuantity)}
                  />
                <TiArrowDownThick  
                  className='text-2xl cursor-pointer text-red-600 transition-all duration-300 hover:scale-125'
                  onClick={() => handledecreceQuantitiesByOne(product.id, product.realQuantity)}
                  />
              </div>
              <div className='mr-4'>
                Quantity
                <p className='text-center'> {product.realQuantity} </p>
              </div>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-12 h-12 object-cover rounded mr-4"
                loading='lazy'
              />
              {/* Product Name and Price */}
              <div className="flex flex-col">
                <span>{product.name}</span>
                <span className="text-gray-500">${product.price}</span>
              </div>
              <i 
              className='width-[25px] height-[25px] text-[25px] flex justify-end ml-[12px] hover:text-red-800 transition-all duration-500'
              onClick={() => handleRemoveFromCart(product.id, product.quantity)}
              >  
                <TiDeleteOutline />
              </i>
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-center text-gray-500">
            No products in the cart
          </li>
        )}
        {products.length > 0 ? (
          <div className='flex items-center font-bold text-green-800 px-4 py-2 justify-between hover:bg-gray-200 cursor-pointer rounded-lg'>
            <p>Total Price:</p>
            {realPrice}$
          </div>
          ): (
            <i className='none'></i>
          )}
      </ul>
    </div>
  )}
</div>

    </div>
  );
}
