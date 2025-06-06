import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class City extends Model {
  public CityID!: number;
  public CityName!: string;
  public Country!: string;
}

City.init({
  CityID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'cityid'
  },
  CityName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'cityname'
  },
  Country: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'country'
  }
}, {
  sequelize,
  tableName: 'cities',
  timestamps: false
});
