import { DataTypes, Model } from 'sequelize';

import sequelize from '../db';

class Person extends Model {
    name: string | undefined;
    surname: string | undefined;
}

Person.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Person',
    tableName: 'person',
  }
);

export default Person;
