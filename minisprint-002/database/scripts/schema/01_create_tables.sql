-- ================================================================
-- CITIES TABLE
-- ================================================================
CREATE TABLE Cities (
    CityID SERIAL PRIMARY KEY,
    CityName VARCHAR(100) NOT NULL,
    Country VARCHAR(50) NOT NULL
);

-- ================================================================
-- REGIONS TABLE  
-- ================================================================
CREATE TABLE Regions (
    PropertyStateProvinceID SERIAL PRIMARY KEY,
    PropertyStateProvinceName VARCHAR(100) NOT NULL
);

-- ================================================================
-- HOTELS TABLE
-- ================================================================
CREATE TABLE Hotels (
    GlobalPropertyID SERIAL PRIMARY KEY,
    SourcePropertyID VARCHAR(50),
    GlobalPropertyName VARCHAR(100) NOT NULL,
    GlobalChainCode VARCHAR(10),
    PropertyAddress1 TEXT,
    PropertyAddress2 TEXT,
    PrimaryAirportCode VARCHAR(10),
    CityID INTEGER,
    PropertyStateProvinceID INTEGER,
    PropertyZipPostal VARCHAR(20),
    PropertyPhoneNumber VARCHAR(20),
    PropertyFaxNumber VARCHAR(20),
    SabrePropertyRating DECIMAL(3,1),
    PropertyLatitude DECIMAL(9,6),
    PropertyLongitude DECIMAL(9,6),
    SourceGroupCode VARCHAR(10)
);

-- ================================================================
-- CONSTRAINTS
-- ================================================================

-- Unique city/country combination
ALTER TABLE Cities ADD CONSTRAINT uk_cities_name_country UNIQUE(CityName, Country);

-- Unique region names
ALTER TABLE Regions ADD CONSTRAINT uk_regions_name UNIQUE(PropertyStateProvinceName);

-- Hotel name cannot be empty
ALTER TABLE Hotels ADD CONSTRAINT ck_hotels_name_not_empty 
    CHECK (LENGTH(TRIM(GlobalPropertyName)) > 0);

-- Rating must be between 0 and 5
ALTER TABLE Hotels ADD CONSTRAINT ck_hotels_rating_range 
    CHECK (SabrePropertyRating >= 0 AND SabrePropertyRating <= 5);

