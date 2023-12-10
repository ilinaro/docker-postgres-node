import { Request, Response } from 'express';

import Post from '../models/post.model';
import xss from 'xss';

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const { title, content, user_id } = req.body;
      const newPost = await Post.create({ title, content, user_id });

      const sanitizedPost = {
        id: newPost?.id,
        user_id: newPost?.user_id,
        title: xss(newPost?.title || ""),
        content: xss(newPost?.content ?? ""),
      };
        /*
            POST http://localhost:8080/api/post
            {
                 "user_id": "2",
                 "title": "Первый пост УРА!",
                 "content": "История первого поста, не путай res и req местами. RES предназначен для отправки результата на фронт, а REQ для обработки результата с фронтенда"
             }
      
            ANSWER
            {
                "id": 1,
                "title": "Первый пост УРА!",
                "content": "История первого поста, не путай res и req местами. RES предназначен для отправки результата на фронт, а REQ для обработки результата с фронтенда",
                "user_id": 2
            }
        */
      res.json(sanitizedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async getPostByUser(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const posts = await Post.findAll({ where: { user_id: id } });
        /*
            GET http://localhost:8080/api/post?id=2
            
            ANSWER
            [
                {
                    "id": 1,
                    "title": "Первый пост УРА!",
                    "content": "История первого поста, не путай res и req местами. RES предназначен для отправки результата на фронт, а REQ для обработки результата с фронтенда",
                    "user_id": 2
                }
            ]
        */
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
}

export default new PostController();
