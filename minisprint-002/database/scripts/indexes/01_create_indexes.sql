-- Hotel search indexes
CREATE INDEX idx_hotels_name ON Hotels (GlobalPropertyName);
CREATE INDEX idx_hotels_rating ON Hotels (SabrePropertyRating DESC);
CREATE INDEX idx_hotels_city ON Hotels (CityID);
CREATE INDEX idx_hotels_region ON Hotels (PropertyStateProvinceID);

-- Lookup indexes
CREATE INDEX idx_cities_name ON Cities (CityName);
CREATE INDEX idx_regions_name ON Regions (PropertyStateProvinceName);

