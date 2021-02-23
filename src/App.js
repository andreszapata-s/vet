import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import shortid from 'shortid'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function App() {

  
  const pet = [
    {
      id: shortid.generate(),
      name: "Satis",
      type: "Gato",
      breed: "Cruce",
      birthday: "2020",
      ownerName: "Andres",
      telephone: "302",
      direction: "Calle 17",
      email : "andres@gmail.com" 
    }
  ]

  const [pets, setPets] = useState(pet)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)


  //Used for save the pet selected after we can delete or edit with this data
  const [ selectedPet, setSelectedPet] = useState({
    id: "",
    name: "",
    type: "",
    breed: "",
    birthday: "",
    ownerName: "",
    telephone: "",
    direction: "",
    email : ""
  })

  //Used for select the pet and send to selectedPet
  const selectPet = (pet, edit) =>{
    setSelectedPet(pet)
    edit==="edit" ? setModalEdit(true) : setModalDelete(true)
  }

  //Se necesita una funcion que capture lo que este escribiendo el usuario
  //En cada uno de los inputs
  //Se asigna al estado lo que el usuario esta escribiendo en base a nombre del input 
  const handleChange=(e)=>{
    const {name, value}=e.target
    setSelectedPet((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const editPet = () =>{
    var newPets = pets
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

  const deletePet= () =>{
    setPets(pets.filter(pet => pet.id!==selectedPet.id))
    setModalDelete(false)
  }

  const openModalAdd = () => {
    setSelectedPet(null)
    setModalAdd(true)
  }

  const addPet = () =>{
    let insertValue = selectedPet
    insertValue.id = shortid.generate()
    let newPets = pets
    newPets.push(insertValue)
    setPets(newPets)
    setModalAdd(false)

  }

  return (
    <div className="container mt-5">
      <h1 align="center">MUNDO VETERINARIO</h1>
      <hr/>
      <button className="btn btn-primary" onClick={() => openModalAdd() }>Agregar mascota</button>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>NOMBRE MASCOTA</th>
              <th>TIPO DE MASCOTA</th>
              <th>RAZA</th>
              <th>FECHA NACIMIENTO </th>
              <th>NOMBRE PROPIETARIO</th>
              <th>TELEFONO</th>
              <th>DIRECCION</th>
              <th>EMAIL</th>
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
                    <td> <button className="btn btn-warning" onClick={()=>selectPet(pet,"edit")}>Editar</button>
                         <button className="btn btn-danger" onClick={()=>selectPet(pet,"delete")}>Eliminar</button> </td>
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

            <label>Nombre mascota</label>
            <input className="form-control" type="text" name="name" value={selectedPet ? selectedPet.name: ""} onChange={handleChange}/>
            <br/>
            <label>Tipo mascota</label>
            <input className="form-control" type="text" name="type" value={selectedPet ? selectedPet.type: ""} onChange={handleChange}/>
            <br/>
            <label>Raza mascota</label>
            <input className="form-control" type="text" name="breed" value={selectedPet ? selectedPet.breed: ""} onChange={handleChange}/>
            <br/>
            <label>Fecha de nacimiento:</label>
            <input className="form-control" type="text" name="birthday" value={selectedPet ? selectedPet.birthday: ""} onChange={handleChange}/>
            <br/>
            <label>Nombre propietario</label>
            <input className="form-control" type="text" name="ownerName" value={selectedPet ? selectedPet.ownerName: ""} onChange={handleChange}/>
            <br/>
            <label>Telefono</label>
            <input className="form-control" type="text" name="telephone" value={selectedPet ? selectedPet.telephone: ""} onChange={handleChange}/>
            <br/>
            <label>Direccion</label>
            <input className="form-control" type="text" name="direction" value={selectedPet ? selectedPet.direction: ""} onChange={handleChange}/>
            <br/>
            <label>Email</label>
            <input className="form-control" type="email" name="email" value={selectedPet ? selectedPet.email: ""} onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={()=>addPet()}>
           Insertar
          </button>
          <button className="btn btn-danger"
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
          <div className="form-group">

            <label>Nombre mascota</label>
            <input className="form-control" type="text" name="name" value={selectedPet && selectedPet.name} onChange={handleChange}/>
            <br/>
            <label>Tipo mascota</label>
            <input className="form-control" type="text" name="type" value={selectedPet && selectedPet.type} onChange={handleChange}/>
            <br/>
            <label>Raza mascota</label>
            <input className="form-control" type="text" name="breed" value={selectedPet && selectedPet.breed} onChange={handleChange}/>
            <br/>
            <label>Fecha de nacimiento:</label>
            <input className="form-control" type="text" name="birthday" value={selectedPet && selectedPet.birthday} onChange={handleChange}/>
            <br/>
            <label>Nombre propietario</label>
            <input className="form-control" type="text" name="ownerName" value={selectedPet && selectedPet.ownerName} onChange={handleChange}/>
            <br/>
            <label>Telefono</label>
            <input className="form-control" type="text" name="telephone" value={selectedPet && selectedPet.telephone} onChange={handleChange}/>
            <br/>
            <label>Direccion</label>
            <input className="form-control" type="text" name="direction" value={selectedPet && selectedPet.direction} onChange={handleChange}/>
            <br/>
            <label>Email</label>
            <input className="form-control" type="email" name="email" value={selectedPet && selectedPet.email} onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={()=>editPet()}>
            Actualizar
          </button>
          <button className="btn btn-danger"
                  onClick={() => setModalEdit(false)}        
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          <div>
            <h3>Esta seguro que desea eliminar la mascota? {selectedPet && selectedPet.name}</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <button 
          className="btn btn-danger"
          onClick={()=>deletePet()}
          >
            SI
          </button>
          <button 
          className="btn btn-secondary"
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
