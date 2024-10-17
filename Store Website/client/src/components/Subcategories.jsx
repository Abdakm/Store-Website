import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Navbar from './Navbar';

export default function Subcategories() {
  const { id } = useParams();
  const [subcategories, setSubCategories] = useState([]);
  const { data, loading, error } = useFetch('/subcategories/' + id);

  useEffect(() => {
    if (data) {
      setSubCategories(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="max-w-screen-2xl m-auto">
        <Navbar />
      <div className='flex items-center justify-center pt-[100px]'>
        <div className=' flex gap-5 flex-wrap'>
          {subcategories.map((ele, index) => (
            <Link
              className=''
              key={index}
              to={`/products/${ele.subcategory_id}`}
            >
              <div className='flex flex-col p-4 justify-center bg-blue-200'>
                <p className=''>{ele.subcategory_name}</p>
                <p>{ele.subcategory_description}</p>
                <img
                  className={'w-[250px] h-[250px] object-cover'}
                  src={ele.image_src ? '/images/subcategories/' + ele.image_src : 'images/default.png'}
                  alt={ele.subcategory_name}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
