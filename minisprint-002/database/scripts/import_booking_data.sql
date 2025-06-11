INSERT INTO Cities (CityName, Country) VALUES
('Bucharest', 'Romania'),
('Paris', 'France'),
('Beijing', 'China')
ON CONFLICT (CityName, Country) DO NOTHING;

INSERT INTO Regions (PropertyStateProvinceName) VALUES
('Bucharest Region'),
('Île-de-France'),
('Beijing Municipality')
ON CONFLICT (PropertyStateProvinceName) DO NOTHING;


CREATE TEMP TABLE temp_hotels (
    globalpropertyid INTEGER,
    globalpropertyname VARCHAR(255),
    propertyaddress1 TEXT, 
    sabrepropertyrating DECIMAL(3,1),
    propertylatitude DECIMAL(9,6),
    propertylongitude DECIMAL(9,6)
);

CREATE TEMP TABLE temp_users (
    username VARCHAR(100),
    review_count INTEGER
);

CREATE TEMP TABLE temp_reviews (
    review_id INTEGER,
    hotel_id INTEGER,
    username VARCHAR(100),
    title VARCHAR(500),
    content TEXT,
    overall_rating DECIMAL(3,1),
    review_date DATE,
    helpful_votes INTEGER,
    platform VARCHAR(50)
);


\COPY temp_hotels FROM '/Users/alexandru/Desktop/hotel-tech-prep/minisprint-002/database/data/hotels.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8', NULL '');
\COPY temp_users FROM '/Users/alexandru/Desktop/hotel-tech-prep/minisprint-002/database/data/users.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8', NULL '');
\COPY temp_reviews FROM '/Users/alexandru/Desktop/hotel-tech-prep/minisprint-002/database/data/reviews.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8', NULL '');


INSERT INTO Hotels (
    GlobalPropertyID,
    GlobalPropertyName,
    PropertyAddress1,  
    CityID,
    PropertyStateProvinceID,
    SabrePropertyRating,
    PropertyLatitude,
    PropertyLongitude
)
SELECT 
    th.globalpropertyid,
    th.globalpropertyname,
    th.propertyaddress1, 
    CASE 
        WHEN th.propertyaddress1 ILIKE '%Romania%' THEN 
            (SELECT CityID FROM Cities WHERE CityName = 'Bucharest' AND Country = 'Romania' LIMIT 1)
        WHEN th.propertyaddress1 ILIKE '%France%' THEN 
            (SELECT CityID FROM Cities WHERE CityName = 'Paris' AND Country = 'France' LIMIT 1)
        WHEN th.propertyaddress1 ILIKE '%China%' THEN 
            (SELECT CityID FROM Cities WHERE CityName = 'Beijing' AND Country = 'China' LIMIT 1)
        ELSE 
            (SELECT CityID FROM Cities WHERE CityName = 'Bucharest' AND Country = 'Romania' LIMIT 1)
    END,
    CASE 
        WHEN th.propertyaddress1 ILIKE '%Romania%' THEN 
            (SELECT PropertyStateProvinceID FROM Regions WHERE PropertyStateProvinceName = 'Bucharest Region' LIMIT 1)
        WHEN th.propertyaddress1 ILIKE '%France%' THEN 
            (SELECT PropertyStateProvinceID FROM Regions WHERE PropertyStateProvinceName = 'Île-de-France' LIMIT 1)
        WHEN th.propertyaddress1 ILIKE '%China%' THEN 
            (SELECT PropertyStateProvinceID FROM Regions WHERE PropertyStateProvinceName = 'Beijing Municipality' LIMIT 1)
        ELSE 
            (SELECT PropertyStateProvinceID FROM Regions WHERE PropertyStateProvinceName = 'Bucharest Region' LIMIT 1)
    END,
    th.sabrepropertyrating,
    th.propertylatitude,
    th.propertylongitude
FROM temp_hotels th
ON CONFLICT (GlobalPropertyID) DO UPDATE SET
    GlobalPropertyName = EXCLUDED.GlobalPropertyName,
    PropertyAddress1 = EXCLUDED.PropertyAddress1,
    SabrePropertyRating = EXCLUDED.SabrePropertyRating,
    PropertyLatitude = EXCLUDED.PropertyLatitude,
    PropertyLongitude = EXCLUDED.PropertyLongitude;


INSERT INTO users (username, review_count)
SELECT username, review_count FROM temp_users
ON CONFLICT (username) DO UPDATE SET 
    review_count = EXCLUDED.review_count;


INSERT INTO reviews (
    hotel_id,
    user_id,
    title,
    content,
    overall_rating,
    review_date,
    helpful_votes,
    platform
)
SELECT 
    tr.hotel_id,
    u.id,
    tr.title,
    tr.content,
    tr.overall_rating,
    tr.review_date,
    tr.helpful_votes,
    tr.platform
FROM temp_reviews tr
JOIN users u ON u.username = tr.username
JOIN Hotels h ON h.GlobalPropertyID = tr.hotel_id
WHERE LENGTH(TRIM(tr.content)) > 0;


INSERT INTO review_ratings (review_id, category_id, rating_value)
SELECT 
    r.id,
    rc.id,
    GREATEST(1.0, LEAST(5.0, 
        r.overall_rating + (RANDOM() - 0.5) * 0.8
    ))
FROM reviews r
CROSS JOIN review_categories rc
WHERE r.platform = 'booking_focused';


UPDATE users SET review_count = (
    SELECT COUNT(*) FROM reviews WHERE reviews.user_id = users.id
);


DROP TABLE temp_hotels;
DROP TABLE temp_users;
DROP TABLE temp_reviews;


SELECT 'GATA' as status;


SELECT 
    'Hotels' as table_name, COUNT(*) as count FROM Hotels WHERE GlobalPropertyID <= 10
UNION ALL
SELECT 'Users', COUNT(*) FROM users WHERE username IN ('Lenuta', 'Gabriel', 'Mahmood', 'Antoinette', 'Hassan', 'Roman')
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews WHERE platform = 'booking_focused'
UNION ALL
SELECT 'Category Ratings', COUNT(*) FROM review_ratings rr JOIN reviews r ON rr.review_id = r.id WHERE r.platform = 'booking_focused';


SELECT 
    'DATA' as sample;

SELECT 
    h.GlobalPropertyName,
    h.PropertyAddress1 as address,
    u.username,
    LEFT(r.title, 20) as title,
    LEFT(r.content, 40) as content_preview,
    r.overall_rating
FROM reviews r
JOIN Hotels h ON r.hotel_id = h.GlobalPropertyID  
JOIN users u ON r.user_id = u.id
WHERE r.platform = 'booking_focused'
  AND h.GlobalPropertyID <= 10
ORDER BY r.hotel_id, r.id
LIMIT 10;


SELECT 
    'Hotel Review Distribution' as distribution;

SELECT 
    h.GlobalPropertyName,
    h.PropertyAddress1 as address,
    COUNT(r.id) as review_count,
    ROUND(AVG(r.overall_rating), 2) as avg_rating
FROM Hotels h
LEFT JOIN reviews r ON h.GlobalPropertyID = r.hotel_id AND r.platform = 'booking_focused'
WHERE h.GlobalPropertyID <= 10
GROUP BY h.GlobalPropertyID, h.GlobalPropertyName, h.PropertyAddress1
ORDER BY h.GlobalPropertyID;
