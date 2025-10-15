import express from "express"
import fetchProducts from "./seed.js";
import connectDB from "./config/dbConnect.js";
import routes from "./Routes/products.routes.js";
import cookieParser from 'cookie-parser'
import userRoutes from "./Routes/user.routes.js";
import cors from 'cors';
import authRoutes from "./Routes/auth.js";
import { PORT } from "./config.js";
import cartRoute from "./Routes/cart.routes.js";

// fetchProducts();   -> uncomment it to seed the database 
connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// const corsMiddleware = ((req, res, next) => {
//   res.on('finish', () => {
//     console.log('CORS Headers:', {
//       origin: res.getHeader('Access-Control-Allow-Origin'),
//       credentials: res.getHeader('Access-Control-Allow-Credentials'),
//     });
//   });
//   next();
// });


//api routes
app.use('/api' , routes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoute)

//listening to port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));






// import express from 'express';
// import cors from 'cors';

// const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options(/.*/, cors(corsOptions)); // Handle preflight

// app.get('/test', (req, res) => {
//   res.json({ message: 'CORS test passed!' });
// });

// app.listen(3000, () => console.log('Test server running on port 3000'));