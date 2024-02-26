const sql = require('mssql/msnodesqlv8');
const config = require('../config');

class User {
    async authenticate(username, password) {
        try {
            await sql.connect(config.database);

            const request = new sql.Request();

            const query = `
        SELECT *
        FROM dbo.users
        WHERE ecode = @username AND user_hash = @password
      `;

            request.input('username', sql.NVarChar(255), username);
            request.input('password', sql.NVarChar(255), password);

            const result = await request.query(query);

            return result.recordset.length > 0;
        } catch (error) {
            console.error('Error during user authentication:', error);
            throw error;
        } finally {
            await sql.close();
        }
    }
}

module.exports = User;
