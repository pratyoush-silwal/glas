const app = require('./app');
const { pool } = require('./config/database');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Database connected successfully:', res.rows[0].now);
    }
  });
});
