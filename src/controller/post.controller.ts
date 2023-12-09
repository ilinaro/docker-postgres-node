import { Request, Response } from 'express';

import db from '../db';

class PostController {
    async createPost(req: Request, res: Response) {
        try {
            const { title, content, user_id } = req.body;
            const newPost = await db.query(
                `INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`,
                [title, content, user_id]
            );
            res.json(newPost.rows[0]);
            /*
            POST http://localhost:8080/api/post
            {
                "user_id": "2",
                "title": "Первый пост УРА!",
                "content": "История первого поста, не путай res и req местами. RES предназначен для отправки результата на фронт, а REQ для обработки результата с фронтенда"
            }
      
            ОТВЕТ
            {
                "id": 1,
                "title": "Первый пост УРА!",
                "content": "История первого поста, не путай res и req местами. RES предназначен для отправки результата на фронт, а REQ для обработки результата с фронтенда",
                "user_id": 2
            }
            */
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getPostByUser(req: Request, res: Response) {
        try {
            const id = req.query.id;
            const posts = await db.query(`SELECT * FROM post where user_id = $1`, [id]);
            res.json(posts.rows);
            /*
            
            GET http://localhost:8080/api/post?id=2
            
            ОТВЕТ
            [
                {
                    "id": 1,
                    "title": "Первый пост УРА!",
                    "content": "История первого поста, не путай res и req местами. RES предназначен для отправки результата на фронт, а REQ для обработки результата с фронтенда",
                    "user_id": 2
                }
            ]
            */
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new PostController();
