import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({getUsers, userSelected, selectUser, visibleForm, showForm}) => {

    const {handleSubmit, register, reset} = useForm()

    const emptyUser = {email: "", password: "", first_name: "", last_name: "", birthday: ""}

    useEffect(() => {
        if(userSelected !== null){
            reset(userSelected)
        } else {
            reset(emptyUser)
        }
    }, [userSelected])

    const submit = (data) => {
        if(userSelected){
            axios.put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
                .then(() => {
                    getUsers()
                    selectUser(null)
                })
        } else {
            axios.post(`https://users-crud.academlo.tech/users/`, data)
                .then(() => {
                    getUsers()
                    reset(emptyUser)
                })
        }
    }

    return (
        <div>
            {visibleForm &&
                <div className='overlay-form'>
                    <form className='form-container' onSubmit={handleSubmit(submit)}>
                        <h1>New/Update User</h1>
                        <div className='inputs-container'>
                            <div className='name-container'>
                                <div className='firstName-container'>
                                    <label htmlFor="first_name">First Name</label>
                                    <div className='name'>
                                        <i className="fa-solid fa-user"></i> <input type="text" id='first_name' placeholder='First Name' {...register("first_name")}/>
                                    </div>
                                </div>
                                <div className='lastName-container'>
                                    <label htmlFor="last_name">Last Name</label>
                                    <div className='name'>
                                        <input type="text" id='last_name' placeholder='Last Name' {...register("last_name")}/>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="email">Email</label>
                            <div>
                                <i className="fa-solid fa-envelope"></i> <input type="text" id='email' placeholder='Email' {...register("email")}/>
                            </div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <i className="fa-solid fa-key"></i> <input type="password" id='password' placeholder='Password' {...register("password")}/>
                            </div>
                            <label htmlFor="birthday">Birthday</label>
                            <div>
                                <i className="fa-solid fa-cake-candles"></i> <input type="date" id='birthday' {...register("birthday")}/>
                            </div>
                        </div>
                        <button className='btn-submit'>Submit</button>
                        <button className='close-btn' onClick={() => showForm()}><i className="fa-solid fa-xmark"></i></button>
                    </form>
                </div>
            }
        </div>
    );
};

export default UsersForm;