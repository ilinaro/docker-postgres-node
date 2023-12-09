import { Request, Response } from 'express';

import db from '../db';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { name, surname } = req.body;
            console.log(name, surname);

            const newPerson = await db.query(`INSERT INTO person (name, surname) values ($1, $2) RETURNING *`, [name, surname]);
            res.json(newPerson.rows[0]);
            /*
                POST http://localhost:8080/api/user            
                {
                    "name": "ivan2",
                    "surname": "ivanov2"
                }
                
                ANSWER
                {
                    "id": 2,
                    "name": "ivan2",
                    "surname": "ivanov2"
                }
            */
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await db.query(`SELECT * FROM person`);
            res.json(users.rows);
            /*
            GET http://localhost:8080/api/user
            
            ANSWER
            [
                {
                    "id": 1,
                    "name": "ivan",
                    "surname": "ivanov"
                },
                {
                    "id": 2,
                    "name": "ivan2",
                    "surname": "ivanov2"
                }
            ]
            */
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getOneUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const users = await db.query(`SELECT * FROM person where id = $1`, [id]);
            res.json(users.rows[0]);
            /*
            GET http://localhost:8080/api/user/1
      
            ANSWER
            {
                "id": 1,
                "name": "ivan",
                "surname": "ivanov"
            }
            */
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id, name, surname } = req.body;
            const user = await db.query(`UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *`,
                [name, surname, id]);
            res.json(user.rows[0]);
            /*
            PUT http://localhost:8080/api/user
            
            {
                "id": 1,
                "name": "admin",
                "surname": "adminov"
            }
            
            ANSWER
            {
                "id": 1,
                "name": "admin",
                "surname": "adminov"
            }
            */
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const users = await db.query(`DELETE FROM person where id = $1`, [id]);
            res.json(users.rows[0]);
            /*
            DELETE http://localhost:8080/api/user/1
       
            ANSWER
            {
                "id": 1,
                "name": "ivan",
                "surname": "ivanov"
            }
            */
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
