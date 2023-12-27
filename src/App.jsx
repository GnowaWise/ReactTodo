import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './components/Navbar.jsx'
import Todolist  from './components/Todolist.jsx'


function App() {

  return (
    <>
      <Navbar />
      <Todolist />
    </>
  )
}

export default App
