\c hotel_management_db;

-- Check total record counts
SELECT 
    'Data Completeness Verification' as report,
    (SELECT COUNT(*) FROM Hotels) as total_hotels,
    (SELECT COUNT(*) FROM Cities) as total_cities,
    (SELECT COUNT(*) FROM Regions) as total_regions;

-- Check for missing critical data
SELECT 
    'Data Quality Check' as check_type,
    COUNT(*) as records_with_names,
    COUNT(*) - COUNT(GlobalPropertyName) as missing_names,
    COUNT(CityID) as records_with_cities,
    COUNT(SabrePropertyRating) as records_with_ratings
FROM Hotels;

-- Check geographic distribution 
SELECT 
    'Geographic Distribution' as check_type,
    c.Country,
    COUNT(*) as hotel_count
FROM Hotels h
JOIN Cities c ON h.CityID = c.CityID
GROUP BY c.Country
ORDER BY hotel_count DESC
LIMIT 10;

-- Check data ranges for validation
SELECT 
    'Data Range Validation' as check_type,
    MIN(SabrePropertyRating) as min_rating,
    MAX(SabrePropertyRating) as max_rating,
    MIN(PropertyLatitude) as min_latitude,
    MAX(PropertyLatitude) as max_latitude,
    MIN(PropertyLongitude) as min_longitude,
    MAX(PropertyLongitude) as max_longitude
FROM Hotels;

-- Check for duplicate imports - 0
SELECT 
    'Duplicate Check' as check_type,
    COUNT(*) - COUNT(DISTINCT SourcePropertyID) as potential_duplicates
FROM Hotels
WHERE SourcePropertyID IS NOT NULL;

\echo 'Sabre data completeness verification completed';
