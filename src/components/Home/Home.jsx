import React, { useEffect, useState } from 'react'
import { app } from '../../credenciales'
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

const auth = getAuth(app)
const db = getFirestore(app)


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
      <div className='w-screen flex justify-around flex-wrap py-6'>
        <p className='py-4 text-xl '>BIENVENIDO, <strong className='text-black'>{correoUsuario}</strong> Haz iniciado sesión</p>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>

      <hr />

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* formulario */}
          <div className="flex flex-col items-center">
            <h3 className='text-center py-4 text-3xl text-gray-900 font-bold'>Ingresar Productos</h3>
            <form onSubmit={guardarDatos}>
              <div className='w-96  border border-inherit rounded px-8 pt-6 pb-8 mb-4 m-8'>
                <div className='form-group flex flex-col'>
                  <input required onChange={capturarInputs} value={product.name} className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-72' type="text" name='name' id='nombre'  placeholder='Nombre'/>
                  <input required onChange={capturarInputs} value={product.price} className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-72' type="number" name="price" id="precio" placeholder='Precio'/>
                  <input required onChange={capturarInputs} value={product.stock} className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-72' type="number" name="stock" id="stock" placeholder='stock' />
                  <input required onChange={capturarInputs} value={product.description} className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-72' type="text" name='description' id='descripcion'  placeholder='Descripcion' />
                  <input required onChange={capturarInputs} value={product.category} className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-72' type="text" name='category' id='categoria'  placeholder='categoria'/>
                  <input required onChange={capturarInputs} value={product.img} className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-72' type="text" name='img' id='img' placeholder='URL de la imagen' />
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                  {subId === '' ? 'Guardar' : 'Actualizar'}
                </button>
              </div>
            </form>

          </div>
        {/* lista productos */}
          <div className="flex flex-col items-center w-full">
            <h2 className='text-center py-4 text-3xl text-gray-900 font-bold'>LISTA PRODUCTOS</h2>
            <div className='container w-full'>
              <div className='container w-full'>
                {
                  lista.map(list => (
                    <div key={list.id} className='card mb-2 px-3 py-2 rounded-sm w-full' >
                      <div className='grid grid-cols-4 grid-rows-2 place-items-center h-60 border border-sm'>
                      <img className='h-28 row-span-2'  src={list.img} alt={list.name} />
                      <p className='name col-span-2'>Nombre: <strong className=' text-xl'>{list.name}</strong> </p>
                      <div className='flex flex-col gap-3 text-gray-900 col-start-2'>
                        <p>Precio: <strong className=' text-xl'> ${list.price}</strong> </p>
                        <p>Stock: <strong className=' text-xl'>{list.stock}</strong> </p>
                      </div>
                      <div className='flex flex-col gap-3 text-gray-900 col-start-3'>
                        <p>Descripcion: <strong className=' text-xl desc'>{list.description}</strong> </p>
                        <p>Categoria: <strong className=' text-xl'>{list.category}</strong> </p>
                      </div>
                      <div className='flex flex-col gap-3 py-5 col-start-4 row-start-1 row-span-2'>
                      <button className='bg-red-700 hover:bg-red-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => deleteProduct(list.id)}>Eliminar</button>
                      <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => setSubId(list.id)}>Actualizar</button>
                      </div>
                      </div>

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