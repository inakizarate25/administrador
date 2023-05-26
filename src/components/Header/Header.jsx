import React from 'react'

function Header({correoUsuario}) {
  return (
    <div className='w-screen flex justify-around flex-wrap py-6'>
        <p className='py-4 text-xl '>BIENVENIDO, <strong className='text-black'>{correoUsuario}</strong> Haz iniciado sesión</p>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>
  )
}

export default Header