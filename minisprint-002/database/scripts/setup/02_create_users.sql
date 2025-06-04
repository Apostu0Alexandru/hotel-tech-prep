CREATE USER hotel_api_user WITH 
    LOGIN 
    PASSWORD 'HotelAPI_2025_Secure!'
    CONNECTION LIMIT 20;

GRANT CONNECT ON DATABASE hotel_management_db TO hotel_api_user;
GRANT USAGE ON SCHEMA public TO hotel_api_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hotel_api_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO hotel_api_user;

