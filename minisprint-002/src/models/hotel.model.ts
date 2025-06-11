import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { City } from './city.model';
import { Region } from './region.model';

export class Hotel extends Model {
  // Primary identification
  public GlobalPropertyID!: number;
  public SourcePropertyID!: string | null;
  public GlobalPropertyName!: string;
  public GlobalChainCode!: string | null;
  
  // Address and contact information
  public PropertyAddress1!: string | null;
  public PropertyAddress2!: string | null;
  public PropertyZipPostal!: string | null;
  public PropertyPhoneNumber!: string | null;
  public PropertyFaxNumber!: string | null;
  
  // Location references
  public PrimaryAirportCode!: string | null;
  public CityID!: number | null;
  public PropertyStateProvinceID!: number | null;
  
  // Geographic coordinates
  public PropertyLatitude!: number | null;
  public PropertyLongitude!: number | null;
  
  // Business data
  public SabrePropertyRating!: number | null;
  public SourceGroupCode!: string | null;
  
  // Associations
  public city?: City;
  public region?: Region;
}

Hotel.init({
  GlobalPropertyID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'globalpropertyid'
  },
  SourcePropertyID: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'sourcepropertyid'
  },
  GlobalPropertyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'globalpropertyname',
    validate: {
      notEmpty: { msg: 'Hotel name cannot be empty' },
      len: { args: [1, 255], msg: 'Hotel name must be between 1 and 255 characters' }
    }
  },
  GlobalChainCode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'globalchaincode'
  },
  PropertyAddress1: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'propertyaddress1'
  },
  PropertyAddress2: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'propertyaddress2'
  },
  PrimaryAirportCode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'primaryairportcode'
  },
  CityID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'cityid',
    references: { model: 'cities', key: 'cityid' }
  },
  PropertyStateProvinceID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'propertystateprovinceid',
    references: { model: 'regions', key: 'propertystateprovinceid' }
  },
  PropertyZipPostal: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'propertyzippostal'
  },
  PropertyPhoneNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'propertyphonenumber'
  },
  PropertyFaxNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'propertyfaxnumber'
  },
  SabrePropertyRating: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: true,
    field: 'sabrepropertyrating',
    validate: {
      min: { args: [0], msg: 'Rating must be at least 0' },
      max: { args: [5], msg: 'Rating cannot exceed 5' }
    }
  },
  PropertyLatitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    field: 'propertylatitude',
    validate: {
      min: { args: [-90], msg: 'Latitude must be between -90 and 90' },
      max: { args: [90], msg: 'Latitude must be between -90 and 90' }
    }
  },
  PropertyLongitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    field: 'propertylongitude',
    validate: {
      min: { args: [-180], msg: 'Longitude must be between -180 and 180' },
      max: { args: [180], msg: 'Longitude must be between -180 and 180' }
    }
  },
  SourceGroupCode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'sourcegroupcode'
  }
}, {
  sequelize,
  tableName: 'hotels',
  timestamps: false,
  indexes: [
    // { fields: ['globalpropertyname'] },
    // { fields: ['sabrepropertyrating'] },
    // { fields: ['cityid'] },
  ]
});
