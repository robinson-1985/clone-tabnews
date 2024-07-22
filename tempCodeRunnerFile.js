const { Client } = require('pg');

async function getPostgresVersion(client) {
    const res = await client.query('SELECT version();');
    return res.rows[0].version;
}

async function getMaxConnections(client) {
    const res = await client.query('SHOW max_connections;');
    return res.rows[0].max_connections;
}

async function getUsedConnections(client) {
    const res = await client.query('SELECT count(*) FROM pg_stat_activity;');
    return res.rows[0].count;
}

(async () => {
    const client = new Client({
        user: 'seu_usuario',
        host: 'localhost',
        database: 'seu_banco_de_dados',
        password: 'sua_senha',
        port: 5432,
    });

    await client.connect();
    
    console.log('Versão do PostgreSQL:', await getPostgresVersion(client));
    console.log('Conexões Máximas:', await getMaxConnections(client));
    console.log('Conexões Usadas:', await getUsedConnections(client));

    await client.end();
})();
