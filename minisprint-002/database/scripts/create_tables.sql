-- Cities table stores location data for hotels
CREATE TABLE Cities (
    CityID SERIAL PRIMARY KEY,
    CityName VARCHAR(100) NOT NULL,
    Country VARCHAR(50) NOT NULL
);

-- Regions table stores state/province information
CREATE TABLE Regions (
    PropertyStateProvinceID SERIAL PRIMARY KEY,
    PropertyStateProvinceName VARCHAR(100) NOT NULL
);

-- Hotels table with all 16 required fields from MiniSprint 2 spec
CREATE TABLE Hotels (
    GlobalPropertyID SERIAL PRIMARY KEY,
    SourcePropertyID VARCHAR(50),
    GlobalPropertyName VARCHAR(255) NOT NULL,
    GlobalChainCode VARCHAR(20),
    PropertyAddress1 TEXT,
    PropertyAddress2 TEXT,
    PrimaryAirportCode VARCHAR(20),
    CityID INTEGER,
    PropertyStateProvinceID INTEGER,
    PropertyZipPostal VARCHAR(50),
    PropertyPhoneNumber VARCHAR(50),    
    PropertyFaxNumber VARCHAR(50),
    SabrePropertyRating DECIMAL(3,1),
    PropertyLatitude DECIMAL(9,6),
    PropertyLongitude DECIMAL(9,6),
    SourceGroupCode VARCHAR(20)
);

-- Business constraints to ensure data quality

-- Prevent duplicate city/country combinations
ALTER TABLE Cities ADD CONSTRAINT uk_cities_name_country 
    UNIQUE(CityName, Country);

-- Ensure region names are unique
ALTER TABLE Regions ADD CONSTRAINT uk_regions_name 
    UNIQUE(PropertyStateProvinceName);

-- Hotel name must not be empty after trimming whitespace
ALTER TABLE Hotels ADD CONSTRAINT ck_hotels_name_not_empty 
    CHECK (LENGTH(TRIM(GlobalPropertyName)) > 0);

-- Sabre ratings are typically 0.0 to 5.0 scale
ALTER TABLE Hotels ADD CONSTRAINT ck_hotels_rating_range 
    CHECK (SabrePropertyRating IS NULL OR (SabrePropertyRating >= 0 AND SabrePropertyRating <= 5));

-- Validate geographic coordinates for mapping functionality
ALTER TABLE Hotels ADD CONSTRAINT ck_hotels_latitude_range 
    CHECK (PropertyLatitude IS NULL OR (PropertyLatitude >= -90 AND PropertyLatitude <= 90));

ALTER TABLE Hotels ADD CONSTRAINT ck_hotels_longitude_range 
    CHECK (PropertyLongitude IS NULL OR (PropertyLongitude >= -180 AND PropertyLongitude <= 180));