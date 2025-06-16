const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const { sequelize } = require('./models'); 

const app = express();


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,               
}));


app.use('/users', userRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected.');
   
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
