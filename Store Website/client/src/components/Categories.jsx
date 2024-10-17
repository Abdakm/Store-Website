import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Categories() {
  const [category, setCategory] = useState([]);
  const { data, loading, error } = useFetch('/categories');

  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data]);

  return (
    <>
      {loading ? 'Loading...' : 
      <div className="max-w-screen-2xl m-auto">
        <Navbar />
        <div className='pt-[100px]'>
          <h1 className='m-auto w-full text-center text-8xl font-bold mb-10'>Categories</h1>
          <div className={'flex items-center justify-center'}>
            {category.map((ele, index) => (
              <div className={'w-[32%] pointer relative'} key={index}>
                <Link to={`/subcategories/${ele.category_id}`}>
                  <p className='text-white opacity-0 hover:opacity-100 transition-all duration-500 absolute flex items-center justify-center w-full h-full bg-gray-300/70  text-4xl font-bold'>
                    {ele.category_name}
                  </p>
                  <img loading='lazy' className={'w-full object-fit'} src={`images/categories/${ele.image_src}`} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      }
      {error && <div>Error: {error}</div>}
    </>
  );
}
