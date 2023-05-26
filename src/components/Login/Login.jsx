import React, { useState } from 'react'
import { appFirestore } from '../../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import './style.css'


const auth = getAuth(appFirestore)

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
    <div className='container p-4'>
        {/* en esta seccion sera el form */}
        <div className="row">
           <div className='col-md-6 mt-5 ms-5'>
            <h1>{registro ? 'Registrarse' : 'Inicia Sesión'}</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input type="email" className='form-control' placeholder='Ingresar email' id='email' required/>
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='contraseña'>Contraseña</label>
                    <input type="password" className='form-control' placeholder='Ingresar contraseña' id='contraseña' required />
                </div>

                <button className='btn btn-primary' type='submit'>
                    {registro ? 'Registrate' : 'Inicia Sesión'}
                    </button>
            </form>
            <div className="form-group">
                <button onClick={() => setRegistro(!registro)} className='btn btn-secondary mt-4 form-control'>
                    {registro ? 'Ya tienes una cuenta? Inicia sesión' : 'No tienes cuenta? Registrate'}
                </button>
            </div>
           </div>
        </div>
    </div>
  )
}

export default Login