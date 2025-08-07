import { Pool } from 'pg';

 const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rc_service',
    port: 5432,
});

export default pool;