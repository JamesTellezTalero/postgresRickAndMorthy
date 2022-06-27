import {Request, Response} from 'express';
import {QueryResult} from 'pg'

import {pool} from '../services/database';

export const getUsers = async(req:Request,res:Response)=>{
    const response:QueryResult = await pool.query('SELECT * FROM users');
    res.json({
        message: "Usuarios",
        response:{
            users: response.rows
        }
    });
}

export const getUsersById = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const response:QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if(response.rows.length === 0){
        res.status(400);
        res.json({
            message: "User doesn't exist"
        });
    }else{
        res.status(200);
        res.json({
            message: "User",
            response: {
                user: response.rows
            }
        });
    }
}

export const createUsers = async (req:Request, res:Response)=> {
    const {name, email} = req.body;
    const validateEmail:QueryResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(validateEmail.rows.length !== 0 ){
        res.status(404);
        res.json({
            message: 'User email already exist',
        });
    }else {
        const response:QueryResult = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
        res.status(201);
        res.json({
            message: 'User Created succesfully',
        });
    }
}

export const updateUserById = async(req:Request, res:Response)=>{
    const {name, email} = req.body;
    const id = req.params.id;
    const validateUser:QueryResult = await pool.query('SELECT * FROM users WHERE id = $1 ', [ id ]);
    const response:QueryResult = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 ', [name, email, id]);
    if(validateUser.rows.length === 0){
        res.status(400);
        res.json({
            message: "User doesn't exist"
        });
    }else{
        res.status(200);
        res.json({
            message: 'User updated succesfully'
        });
    }
}

export const deleteUserById = async (req:Request, res:Response) => {
    const id = req.params.id; 
    const validateUser:QueryResult = await pool.query('SELECT * FROM users WHERE id = $1 ', [ id ]);
    if(validateUser.rows.length === 0){
        res.status(400);
        res.json({
            message: "User doesn't exist"
        });
    }else{
        const response:QueryResult = await pool.query('DELETE FROM users WHERE id = $1', [id]); 
        res.json({
            message: 'User deleted succesfully'
        });
    }
}