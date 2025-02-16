import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addDocument, getCollection, updateDocument, deleteDocument } from './actions';
import './Modal.css'

function App() {
  const pet = [
    {
      id: "",
      name: "",
      type: "",
      breed: "",
      birthday: "",
      ownerName: "",
      telephone: "",
      direction: "",
      email : "" 
    }
  ]

  const [pets, setPets] = useState(pet)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [error, setError] = useState("")

  useEffect( () =>{
    (async () =>{
      const result = await getCollection("pets")
      if(result.statusResponse){
        setPets(result.data)
      }
    })()
  },[])

  const [ selectedPet, setSelectedPet] = useState({
pet
  })

  const selectPet = (pet, edit) =>{
    setSelectedPet(pet)
    edit==="edit" ? setModalEdit(true) : setModalDelete(true)
  }

  const handleChange=(e)=>{
    const {name, value}=e.target
    setSelectedPet((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const editPet = async() =>{
    let newPets = pets

    const result = await updateDocument("pets",selectedPet.id,selectedPet)

    if(!result.statusResponse){
      setError(result.error)
      return
    }

    newPets.map( (pet) => {
      if(pet.id === selectedPet.id){
        pet.name=selectedPet.name
        pet.type=selectedPet.type
        pet.breed=selectedPet.breed
        pet.birthday=selectedPet.birthday
        pet.ownerName=selectedPet.ownerName
        pet.telephone=selectedPet.telephone
        pet.direction=selectedPet.direction
        pet.email=selectedPet.email
      }
    })
    setPets(newPets)
    setModalEdit(false)
  }

  const deletePet= async() =>{
    const result = await deleteDocument("pets",selectedPet.id)

    if(!result.statusResponse){
      setError(result.error)
      return
    }
    setPets(pets.filter(pet => pet.id!==selectedPet.id))
    setModalDelete(false)
  }

  const openModalAdd = () => {
    setSelectedPet(null)
    setModalAdd(true)
  }

  const addPet = async() =>{

    if(!selectedPet){
      alert("Favor llenar el formulario")
    }

    const result = await addDocument("pets",selectedPet)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    
    setPets([...pets,{id:result.data.id, name: selectedPet.name, type: selectedPet.type, breed: selectedPet.breed,
            birthday: selectedPet.birthday, ownerName:selectedPet.ownerName, telephone: selectedPet.telephone, 
            direction: selectedPet.direction, email: selectedPet.email}])
    setModalAdd(false)
  }

  return (
    <div className="container mt-5">
      <h1 align="center">MUNDO VETERINARIO</h1>
      <hr/>
      <h3>MASCOTAS 
        <button className="btn bg-success float-right" onClick={() => openModalAdd() } >Agregar mascota</button> 
      </h3>
        <br/>
        <table className="table table-sm table-striped table-bordered table-hover">
          <thead className="thead thead-dark">
            <tr>
              <th>NOMBRE MASCOTA</th>
              <th>TIPO DE MASCOTA</th>
              <th>RAZA</th>
              <th>FECHA NACIMIENTO </th>
              <th>NOMBRE PROPIETARIO</th>
              <th>TELEFONO</th>
              <th>DIRECCION</th>
              <th>EMAIL</th>
              <th>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {
              pets.map(pet =>(
                  <tr key={pet.id}>
                    <td>{pet.name}</td>
                    <td>{pet.type}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.birthday}</td>
                    <td>{pet.ownerName}</td>
                    <td>{pet.telephone}</td>
                    <td>{pet.direction}</td>
                    <td>{pet.email}</td>
                    <td> <button className="btn bg-warning btn-block" onClick={()=>selectPet(pet,"edit")}>Editar</button>
                         <button className="btn bg-danger btn-block" onClick={()=>selectPet(pet,"delete")}>Eliminar</button> </td>
                  </tr>
                  )
              )
            }
          </tbody>
        </table>
        
        <Modal isOpen={modalAdd}>
        <ModalHeader>
          <div>
            <h3>Agregar mascota</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <input type="text" className="form-control mb-2" placeholder="Nombre de la mascota" name="name" value={selectedPet ? selectedPet.name: ""} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Tipo" name="type" value={selectedPet ? selectedPet.type: ""} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Raza" name="breed" value={selectedPet ? selectedPet.breed: ""} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Fecha de nacimiento" name="birthday" value={selectedPet ? selectedPet.birthday: ""} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Nombre propietario" name="ownerName" value={selectedPet ? selectedPet.ownerName: ""} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Telefono" name="telephone" value={selectedPet ? selectedPet.telephone: ""} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Direccion" name="direction" value={selectedPet ? selectedPet.direction: ""} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Email" name="email" value={selectedPet ? selectedPet.email: ""} onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn bg-success btn-block" onClick={()=>addPet()}>
           Insertar
          </button>
          <button className="btn bg-danger btn-block"
                  onClick={() => setModalAdd(false)}        
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div>
            <h3>Editar mascota</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group" >
            <input type="text" className="form-control mb-2" placeholder="Nombre de la mascota" name="name" value={selectedPet && selectedPet.name} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Tipo" name="type" value={selectedPet && selectedPet.type} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Raza" name="breed" value={selectedPet && selectedPet.breed} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Fecha de nacimiento" name="birthday" value={selectedPet && selectedPet.birthday} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Nombre propietario" name="ownerName" value={selectedPet && selectedPet.ownerName} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Telefono" name="telephone" value={selectedPet && selectedPet.telephone} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Direccion" name="direction" value={selectedPet && selectedPet.direction} onChange={handleChange}/>
            <input type="text" className="form-control mb-2" placeholder="Email" name="email" value={selectedPet && selectedPet.email} onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn bg-success btn-block" onClick={()=>editPet()}>
            Actualizar
          </button>
          <button className="btn bg-danger btn-block"
                  onClick={() => setModalEdit(false)}        
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          <div>
            <h3>Esta seguro que desea eliminar la mascota?</h3>
            <br/>
            <h3>{selectedPet && selectedPet.name}</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <button 
          className="btn btn-danger btn-block"
          onClick={()=>deletePet()}
          >
            SI
          </button>
          <button 
          className="btn btn-secondary btn-block"
          onClick={()=>setModalDelete(false)}
          >
            NO
          </button>
        </ModalFooter>
      </Modal>

    </div>
  )
}

export default App
