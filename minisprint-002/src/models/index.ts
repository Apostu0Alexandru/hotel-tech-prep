import { Hotel } from './hotel.model';
import { City } from './city.model';
import { Region } from './region.model';

// Define model associations
Hotel.belongsTo(City, {
  foreignKey: 'CityID',
  as: 'city',
  constraints: false
});

Hotel.belongsTo(Region, {
  foreignKey: 'PropertyStateProvinceID',
  as: 'region',
  constraints: false
});

City.hasMany(Hotel, {
  foreignKey: 'CityID',
  as: 'hotels'
});

Region.hasMany(Hotel, {
  foreignKey: 'PropertyStateProvinceID',
  as: 'hotels'
});

export { Hotel, City, Region };
