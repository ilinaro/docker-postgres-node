const db = require('../../db');

class PostController {
    async createPost(req, res) {
        const { title, content, user_id } = req.body
        const newPost = await db.query(`INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *`, [title, content, user_id])
        res.json(newPost.rows[0])
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
    }
    async getPostByUser(req, res) {
        const id = req.query.id
        const posts = await db.query(`SELECT * FROM post where user_id = $1`, [id])
        res.json(posts.rows)
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
    }
}


module.exports = new PostController()