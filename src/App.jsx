import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {

    const [usersList, setUsersList] = useState([])

    const [userSelected, setUserSelected] = useState(null)

    const [visibleForm, setVisibleForm] = useState(false)

    useEffect(() => {
      axios.get(`https://users-crud.academlo.tech/users/`)
        .then(res => setUsersList(res.data))
    }, [])

    console.log(usersList)

    const getUsers = () => {
      axios.get(`https://users-crud.academlo.tech/users/`)
        .then(res => setUsersList(res.data))
    }

    const selectUser = (user) => {
      setUserSelected(user)
      setVisibleForm(!visibleForm)
    }

    const showForm = () => {
      setVisibleForm(!visibleForm)
    }

  return (
    <div className="App">
      <div className='header'>
        <h1>Users</h1>
        <button onClick={showForm}> <i className="fa-solid fa-plus"></i> Add User</button>
      </div>
      <UsersForm getUsers={getUsers} userSelected={userSelected} selectUser={selectUser} visibleForm={visibleForm} showForm={showForm}/>
      <UsersList usersList={usersList} getUsers={getUsers} selectUser={selectUser} showForm={showForm}/>
    </div>
  )
}

export default App
