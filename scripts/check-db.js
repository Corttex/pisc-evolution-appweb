const { Client } = require('pg');

const connectionString = "postgresql://postgres.pghmmkflbinckklojqvz:PjHKIt9gF93WGcj0@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

async function check() {
  const client = new Client({
    connectionString: connectionString,
  });
  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Conexão bem sucedida:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Erro de conexão:', err);
  }
}

check();
