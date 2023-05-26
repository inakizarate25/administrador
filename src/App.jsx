import React, {useState} from 'react'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import { appFirestore } from './credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const auth = getAuth(appFirestore)

function App() {
    const [usuario, setUsuario] = useState(null)

    onAuthStateChanged(auth, (usuarioFirebase) =>{
        if(usuarioFirebase){
            setUsuario(usuarioFirebase)
        }else{
            setUsuario(null)
        }
    })

  return (
    <div className='h-full min-h-screen'>
        {usuario ? <Products correoUsuario={usuario.email}/> : <Login/>}
    </div>
  )
}

export default App