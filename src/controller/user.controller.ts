import { Request, Response } from 'express';

import Person from '../models/person.model';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, surname } = req.body;
      const newPerson = await Person.create({ name, surname });
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
      res.json(newPerson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await Person.findAll();
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
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async getOneUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await Person.findByPk(id);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id, name, surname } = req.body;
      const user = await Person.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      user.name = name;
      user.surname = surname;
      await user.save();
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
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await Person.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      await user.destroy();
      /*
        DELETE http://localhost:8080/api/user/1

        ANSWER
        {
          "id": 1,
          "name": "ivan",
          "surname": "ivanov"
        }
      */
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
}

export default new UserController();
