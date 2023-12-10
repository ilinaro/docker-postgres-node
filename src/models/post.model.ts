import { DataTypes, Model } from 'sequelize';

import Person from './person.model';
import sequelize from '../db';

class Post extends Model {
    id: number | undefined;
    title: string | undefined;
    content: string | undefined;
    user_id: number | undefined;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Person,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'post',
  }
);

export default Post;

sequelize.sync({ force: true }).then(() => {
  console.log('База данных готова к использованию');
}).catch(err => {
  console.error('Ошибка создания таблиц:', err);
});