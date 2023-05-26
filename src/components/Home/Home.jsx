import React, { useEffect, useState } from 'react'
import './style.css'
import { appFirestore } from '../../credenciales'
import { getAuth, signOut } from 'firebase/auth'
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    getDoc, 
    setDoc
      } from 'firebase/firestore'

const auth = getAuth(appFirestore)
const db = getFirestore(appFirestore)


function Home({correoUsuario}) {


  const valorInicial = {
    name: '',
    price:'',
    stock: '',
    description:'',
    category:'',
    img:''
  }

  // variables de estado
  const [product, setProuct] = useState(valorInicial)
  const [lista, setLista] = useState([])
  const [subId, setSubId] = useState('')



// funcion capturar inputs
  const capturarInputs = (e) => {
    const {name, value} = e.target
    setProuct({...product, [name]: value})
  }

  // funcion actualizar o guradar datos
  const guardarDatos = async (e) => {
    e.preventDefault()
    // console.log(product)
    
    if(subId === ''){
      try {
        await addDoc(collection(db,'productos'), {
          ...product
        })
      } catch (error) {
        console.log(error)
      }
    }else{
      await setDoc(doc(db, 'productos', subId), {
        ...product
      })
    }

    setProuct({...valorInicial})
    setSubId('')
  }

  // funcion renderizar lista de productos
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'))
        const docs = []
        querySnapshot.forEach((doc) =>{
          docs.push({...doc.data(), id:doc.id})
        })
        setLista(docs)
      } catch (error) {
        console.log(error)
      }
    }
    getLista()
  },[lista])

  // eliminar producto
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'productos', id))
  }

  // actualizar producto
  const getOne = async (id) => {
    try {
      const docRef = doc(db, 'productos' , id)
      const docSnap = await getDoc(docRef)
      setProuct(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if(subId !== ''){
      getOne(subId)
    }
  },[subId])


  return (
    <div className='container'>
      <div className='header'>
        <p className='mt-4'>BIENVENIDO, <strong>{correoUsuario}</strong> Haz iniciado sesión</p>
        <button className='btn btn-danger' onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>
      <hr />
      <div className='row'>
        {/* formulario */}
          <div className="col-md-4">
            <h3 className='text-center mb-4'>Ingresar Productos</h3>
            <form onSubmit={guardarDatos}>
              <div className='card card-body'>
                <div className='form-group'>
                  <input required onChange={capturarInputs} value={product.name} className='form-control mb-2' type="text" name='name' id='nombre'  placeholder='Nombre'/>
                  <input required onChange={capturarInputs} value={product.price} className='form-control mb-2' type="number" name="price" id="precio" placeholder='Precio'/>
                  <input required onChange={capturarInputs} value={product.stock} className='form-control mb-2' type="number" name="stock" id="stock" placeholder='stock' />
                  <input required onChange={capturarInputs} value={product.description} className='form-control mb-2' type="text" name='description' id='descripcion'  placeholder='Descripcion' />
                  <input required onChange={capturarInputs} value={product.category} className='form-control mb-2' type="text" name='category' id='categoria'  placeholder='categoria'/>
                  <input required onChange={capturarInputs} value={product.img} className='form-control mb-2' type="text" name='img' id='img' placeholder='URL de la imagen' />
                </div>
                <button className='btn btn-primary'>
                  {subId === '' ? 'Guardar' : 'Actualizar'}
                </button>
              </div>
            </form>

          </div>
        {/* lista productos */}
          <div className="col-md-8">
            <h2 className='text-center mb-4'>LISTA PRODUCTOS</h2>
            <div className='container card mb-5'>
              <div className='card-body'>
                {
                  lista.map(list => (
                    <div key={list.id} className=' ' >
                      <div className='d-flex justify-content-around'>
                      <img className='img-card'  src={list.img} alt={list.name} />
                      <div>
                        <p>Nombre: <strong>{list.name}</strong> </p>
                        <p>Precio: <strong> ${list.price}</strong> </p>
                        <p>Stock: <strong>{list.stock}</strong> </p>
                      </div>
                      <div>
                        <p>Descripcion: <strong>{list.description}</strong> </p>
                        <p>Categoria: <strong>{list.category}</strong> </p>
                      </div>
                      </div>

                      <div className='d-flex w-50 gap-4 '>
                      <button className='btn btn-danger' onClick={() => deleteProduct(list.id)}>Eliminar</button>
                      <button className='btn btn-success' onClick={() => setSubId(list.id)}>Actualizar</button>
                      </div>
                      <hr />
                      </div>
                      
                  ))
                }
              </div>
              
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home