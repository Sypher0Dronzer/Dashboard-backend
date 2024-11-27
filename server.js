import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/passport.js";
import passport from "passport";

//Import routes
import authRoutes from "./routes/auth.route.js";
import usersRoutes from "./routes/users.route.js";
import projectsRoutes from "./routes/project.route.js"
import permissionRoutes from "./routes/permission.route.js"
dotenv.config();
import { app, server } from "./socket/socket.js";


const mongoStore = MongoStore.create({
  mongoUrl: process.env.NODE_ENV == 'development'? process.env.MONGO_LOCAL:process.env.MONGO_URI, // Use the same database name
  collectionName: "sessions", // Optional: Customize session collection name
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore, // Use MongoDB store
    cookie: {
      secure: process.env.NODE_ENV !== "development", // Set to `true` if using HTTPS
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
      // sameSite: "None",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.set('trust proxy',1)
app.use(cors({
  origin: [process.env.FRONTEND_LINK],
  // origin: ['http://localhost:5173','http://192.168.137.1:5173'],
  methods:["POST","GET","DELETE"],
  credentials: true,
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://theme-chat.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/permissions", permissionRoutes);

// Server Listener
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
