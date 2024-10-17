import axios from 'axios'
import { useEffect, useState } from 'react'


const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/wel')
        setData(response)
      } catch(error){
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }
  ,[])

  if(loading) return <div> Loading </div>
  if(error) return <div> Error: {error} </div>

  console.log(data)