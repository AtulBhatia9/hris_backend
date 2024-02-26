const sql = require('mssql/msnodesqlv8');
const config = require('../config');

class Attendance {
    async clockIn(employeeId) {
        let pool;
        try {
            pool = await sql.connect(config.database);
            const request = pool.request();

            const query = `
                INSERT INTO dbo.attendance (employee_id, clock_in)
                VALUES (@employeeId, GETDATE())
            `;

            request.input('employeeId', sql.Int, employeeId);

            await request.query(query);
        } catch (error) {
            console.error('Error during clock-in:', error);
            throw error;
        } finally {
            try {
                if (pool) {
                    await pool.close();
                }
            } catch (error) {
                console.error('Error closing database connection pool:', error);
            }
        }
    }

    async clockOut(employeeId) {
        let pool;
        try {
            pool = await sql.connect(config.database);
            const request = pool.request();

            const query = `
                UPDATE dbo.attendance
                SET clock_out = GETDATE()
                WHERE employee_id = @employeeId AND clock_out IS NULL
            `;

            request.input('employeeId', sql.Int, employeeId);

            const result = await request.query(query);

            if (result.rowsAffected[0] === 0) {
                throw new Error('No active clock-in record found for the employee.');
            }
        } catch (error) {
            console.error('Error during clock-out:', error);
            throw error;
        } finally {
            try {
                if (pool) {
                    await pool.close();
                }
            } catch (error) {
                console.error('Error closing database connection pool:', error);
            }
        }
    }
}

module.exports = Attendance;
