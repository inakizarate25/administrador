import React, {useState} from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
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
    <div className='bg-gray-900 h-full min-h-screen'>
        {usuario ? <Home correoUsuario={usuario.email}/> : <Login/>}
    </div>
  )
}

export default App