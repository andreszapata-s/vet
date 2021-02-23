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
      breed: "raza",
      birthday: "2020",
      ownerName: "and",
      telephone: "302",
      direction: "calle 17",
      email : "andres" 
    }
  ]

  const [pets, setPets] = useState(pet)
  const [modalEdit, setModalEdit] = useState(false)
  

  return (
    <div className="container mt-5">
      <h1 align="center">MUNDO VETERINARIO</h1>
      <hr/>
      <button className="btn btn-primary">Agregar mascota</button>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
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
                  <tr>
                    <td>{pet.id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.type}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.birthday}</td>
                    <td>{pet.ownerName}</td>
                    <td>{pet.telephone}</td>
                    <td>{pet.direction}</td>
                    <td>{pet.email}</td>
                    <td> <button className="btn btn-warning">Editar</button>
                         <button className="btn btn-danger">Eliminar</button> </td>
                  </tr>
                  )
              )
            }
          </tbody>
        </table>
        
      <Modal>
        <ModalHeader></ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

    </div>
  )
}

export default App
