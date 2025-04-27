import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
///!!
function App() {
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://127.0.0.1:8000/api/products/'  // URL local
      : 'https://ecommerceb-tc17.onrender.com/api/products/';

    axios.get(apiUrl)
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      })
  }, [])


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((products, index) => (
              <li key={index}>{products.name}</li>
            ))}
          </ul>
        ) : (
          <p>Products not found</p>
        )}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
