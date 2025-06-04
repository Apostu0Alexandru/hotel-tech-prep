-- =================================================================
-- DATABASE CREATION
-- =================================================================


CREATE DATABASE hotel_management_db
    WITH 
    OWNER postgres
    ENCODING 'UTF8'
    LC_COLLATE 'C'
    LC_CTYPE 'C'
    TABLESPACE pg_default
    CONNECTION LIMIT 50
    TEMPLATE template0;


-- =================================================================
-- DATABASE DOCUMENTATION AND METADATA
-- =================================================================

COMMENT ON DATABASE hotel_management_db IS 
'MiniSprint 2: Professional Hotel Management System
- Express.js REST API backend
- Sabre industry data integration  
- PostgreSQL with Sequelize ORM
- JWT authentication ready
- TypeScript models support
- Production deployment ready';

-- =================================================================
-- SECURITY AND PERMISSIONS
-- =================================================================

-- Grant necessary privileges
GRANT CONNECT, TEMPORARY ON DATABASE hotel_management_db TO postgres;


-- Create application-specific connection settings
ALTER DATABASE hotel_management_db SET timezone TO 'UTC';
ALTER DATABASE hotel_management_db SET log_statement TO 'all';
ALTER DATABASE hotel_management_db SET log_min_duration_statement TO 1000;


