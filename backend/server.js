require('dotenv').config(); // To load variables from env file

// Import modules
const express=require('express');
const connectDB=require('./config/db.js');
const cors=require('cors');
const todosRouter=require('./routes/todoRoutes.js');
const userRouter=require('./routes/userRoutes.js');
const errorHandler=require('./middleware/errorMiddleware.js');

// Create an express app
const app=express();

// Middleware
app.use(cors()); // Connects with frontend
app.use(express.json()); // Allows app to understand json body in requests

// Connect DB
connectDB();

// Routes
app.use('/api/todos',todosRouter);
app.use('/api/users',userRouter);

// Error middlware
app.use(errorHandler);

// Start server and connect to mongodb
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})