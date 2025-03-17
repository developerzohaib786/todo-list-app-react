import React from 'react'

const Navbar = () => {
  return (
<nav className='flex justify-between items-center bg-blue-950 text-white py-6 px-10'>
  <div className="logo font-bold">
    <span><h2 className='logo'>MyTasks</h2></span>
  </div>
  <div className="flex">
    <ul className='flex gap-10'> 
      <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
      <li className='cursor-pointer hover:font-bold transition-all'>My Todos</li>
    </ul>
  </div>
</nav>


  )
}

export default Navbar
