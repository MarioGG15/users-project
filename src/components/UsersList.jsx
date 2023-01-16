import axios from 'axios';
import React from 'react';

const UsersList = ({usersList, getUsers, selectUser, showForm}) => {

    const sortUsers = usersList.sort((a, b) => a.last_name.localeCompare(b.last_name))

    const deleteUser = (user) => {
        axios.delete(`https://users-crud.academlo.tech/users/${user.id}/`)
            .then(() => getUsers())
    }

    return (
        <div>
            <ul className='users-list'>
                {sortUsers.map((user) => (
                    <li key={user.id} className="user-card">
                        <h2>{user.first_name} {user.last_name}</h2>
                        <ul>
                            <li className='user-email'>
                                <b>Email:</b>
                                <p>{user.email}</p>
                            </li>
                            <li className='user-birthday'>
                                <b>Birthday:</b>
                                <p><i className="fa-solid fa-gift"></i> {user.birthday}</p>
                            </li>
                        </ul>
                        <div className='users-btns'>
                            <button className='edit-btn' onClick={() => selectUser(user)}><i className="fa-solid fa-pen-to-square"></i></button>
                            <button className='delete-btn' onClick={() => deleteUser(user)}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;