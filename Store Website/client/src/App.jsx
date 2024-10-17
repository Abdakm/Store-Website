import { useEffect, useState, useContext } from 'react'
import useFetch from './hooks/useFetch'
import Categories from './components/Categories'

function App() {
  const { data, loading, error} = useFetch('/categories')


  if(loading) return <div> Loading </div>
  if(error) return <div> Error: {error} </div>


  return (
    <div>
      <Categories  />
    </div>
  )
}
export default App
