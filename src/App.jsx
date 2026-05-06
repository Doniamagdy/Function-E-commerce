import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProductsTable from './components/ProductsTable/ProductsTable'
import FetchProducts from './features/dashboard/FetchProducts/FetchProducts'

function App() {

  return (
   <FetchProducts />
  )
}

export default App
