import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Region extends Model {
  public PropertyStateProvinceID!: number;
  public PropertyStateProvinceName!: string;
}

Region.init({
  PropertyStateProvinceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'propertystateprovinceid'
  },
  PropertyStateProvinceName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'propertystateprovincename'
  }
}, {
  sequelize,
  tableName: 'regions',
  timestamps: false
});
