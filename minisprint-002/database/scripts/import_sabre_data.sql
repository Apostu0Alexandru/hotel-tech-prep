
\c hotel_management_db;


-- Create staging table matching exact Sabre CSV headers
CREATE TEMP TABLE staging_sabre (
    global_property_id TEXT,
    source_property_id TEXT,
    global_property_name TEXT,
    global_chain_code TEXT,
    property_address_1 TEXT,
    property_address_2 TEXT,
    primary_airport_code TEXT,
    property_city_name TEXT,
    property_state_province TEXT,
    property_zip_postal TEXT,
    property_country_code TEXT,
    property_phone_number TEXT,
    property_fax_number TEXT,
    sabre_property_rating TEXT,
    property_latitude TEXT,
    property_longitude TEXT,
    source_group_code TEXT
);

-- Import CSV with TAB delimiter and header handling
\COPY staging_sabre FROM 'database/data/sabre_properties_clean.csv' WITH (FORMAT csv, HEADER true, DELIMITER E'\t', ENCODING 'UTF8', NULL '');

-- Show what we imported
SELECT 'Sample of imported data:' as info;
SELECT global_property_name, property_city_name, property_country_code, sabre_property_rating 
FROM staging_sabre 
LIMIT 5;

-- Clean and insert unique cities
INSERT INTO Cities (CityName, Country)
SELECT DISTINCT 
    TRIM(property_city_name), 
    TRIM(property_country_code)
FROM staging_sabre 
WHERE property_city_name IS NOT NULL 
    AND property_country_code IS NOT NULL
    AND TRIM(property_city_name) != ''
    AND TRIM(property_country_code) != ''
ON CONFLICT (CityName, Country) DO NOTHING;

-- Clean and insert unique regions
INSERT INTO Regions (PropertyStateProvinceName)
SELECT DISTINCT TRIM(property_state_province)
FROM staging_sabre 
WHERE property_state_province IS NOT NULL
    AND TRIM(property_state_province) != ''
ON CONFLICT (PropertyStateProvinceName) DO NOTHING;

-- Insert hotels with proper column mapping
INSERT INTO Hotels (
    SourcePropertyID, GlobalPropertyName, GlobalChainCode,
    PropertyAddress1, PropertyAddress2, PrimaryAirportCode,
    CityID, PropertyStateProvinceID, PropertyZipPostal,
    PropertyPhoneNumber, PropertyFaxNumber, SabrePropertyRating,
    PropertyLatitude, PropertyLongitude, SourceGroupCode
)
SELECT 
    NULLIF(TRIM(source_property_id), ''),
    TRIM(global_property_name),
    NULLIF(TRIM(global_chain_code), ''),
    NULLIF(TRIM(property_address_1), ''),
    NULLIF(TRIM(property_address_2), ''),
    NULLIF(TRIM(primary_airport_code), ''),
    c.CityID,
    r.PropertyStateProvinceID,
    NULLIF(TRIM(property_zip_postal), ''),
    NULLIF(TRIM(property_phone_number), ''),
    NULLIF(TRIM(property_fax_number), ''),
    CASE 
        WHEN sabre_property_rating ~ '^[0-9]+\.?[0-9]*$' 
        THEN sabre_property_rating::DECIMAL(3,1) 
        ELSE NULL 
    END,
    CASE 
        WHEN property_latitude ~ '^-?[0-9]+\.?[0-9]*$' 
        THEN property_latitude::DECIMAL(9,6) 
        ELSE NULL 
    END,
    CASE 
        WHEN property_longitude ~ '^-?[0-9]+\.?[0-9]*$' 
        THEN property_longitude::DECIMAL(9,6) 
        ELSE NULL 
    END,
    NULLIF(TRIM(source_group_code), '')
FROM staging_sabre s
LEFT JOIN Cities c ON TRIM(s.property_city_name) = c.CityName AND TRIM(s.property_country_code) = c.Country
LEFT JOIN Regions r ON TRIM(s.property_state_province) = r.PropertyStateProvinceName
WHERE global_property_name IS NOT NULL 
    AND TRIM(global_property_name) != '';

-- Report results
SELECT 
    'Import completed' as status,
    (SELECT COUNT(*) FROM Cities) as cities_imported,
    (SELECT COUNT(*) FROM Regions) as regions_imported,
    (SELECT COUNT(*) FROM Hotels) as hotels_imported;

-- Show sample of imported data with relationships
SELECT 
    h.GlobalPropertyName,
    c.CityName,
    c.Country,
    r.PropertyStateProvinceName,
    h.SabrePropertyRating
FROM Hotels h
LEFT JOIN Cities c ON h.CityID = c.CityID
LEFT JOIN Regions r ON h.PropertyStateProvinceID = r.PropertyStateProvinceID
ORDER BY h.GlobalPropertyID
LIMIT 10;

\echo 'Sabre CSV import completed successfully!';
