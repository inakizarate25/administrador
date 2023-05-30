import React, { useState } from 'react'
import { app } from '../../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import './style.css'


const auth = getAuth(app)

function Login () {
    const [registro, setRegistro] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const correo = e.target.email.value
        const contraseña = e.target.contraseña.value

        if(registro){
            await createUserWithEmailAndPassword(auth, correo, contraseña)
        }else{
            await signInWithEmailAndPassword(auth, correo, contraseña)
        }
    }


  return (
    <div className='container w-screen grid h-screen place-items-center'>
        {/* en esta seccion sera el form */}
        <div className="border border-inherit ">
           <div className='bg-white  rounded px-8 pt-6 pb-8 mb-6 w-96'>
            <h1 className='text-gray-800 text-5xl font-bold'>{registro ? 'Registrarse' : 'Inicia Sesión'}</h1>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                    <input type="email" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Ingresar email' id='email' required/>
                </div>
                <div className='mb-3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contraseña'>Contraseña</label>
                    <input type="password" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Ingresar contraseña' id='contraseña' required />
                </div>

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                    {registro ? 'Registrate' : 'Inicia Sesión'}
                    </button>
            </form>
            <div className="form-group">
                <button onClick={() => setRegistro(!registro)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'>
                    {registro ? 'Ya tienes una cuenta? Inicia sesión' : 'No tienes cuenta? Registrate'}
                </button>
            </div>
           </div>
        </div>
    </div>
  )
}

export default Login