import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { connectToDb, getDb } from "./db.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN, // Allow requests from your client
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if necessary
  },
});

await connectToDb(); // Call this function to connect to the database
let db = getDb();

// Middleware
//for preventing the browser's default behavior
app.use(cors());
// For parsing json files:
app.use(express.json());

//Starting the server:
const PORT = process.env.PORT || 5000; //listening to either a global variable of a port or a default local host
httpServer.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

app.post("/create-user", async (req, res) => {
  const formData = req.body;
  const users = db.collection("Users");
  try {
    const user = await users.findOne({ username: formData.username });
    if (!user) {
      console.log(formData);
      await users.insertOne(formData);
      res.send({ message: "Form data received:", data: formData });
    } else {
      res.send({ message: "User name taken" });
    }
  } catch (err) {
    console.log("error", err);
  }
});

// A map for tracking users in room
let room = [];
app.post("/login", async (req, res) => {
  console.log(req.body);
  const formData = req.body;
  const users = db.collection("Users");
  try {
    const user = await users.findOne(formData);

    res.send({ message: "User found:", user: user });
  } catch (err) {
    console.log("Error, user not found:", err);
  }
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (user) => {
    room.push(user);
    socket.emit("currentUser", user);
    console.log("Room content: ", room);
  });
  socket.on("song-selected", (song) => {
    console.log(`song selected:${song}`);
    io.emit("change-page", song);
  });
  socket.on("quit-song", () => {
    io.emit("main-page");
  });
  socket.on("leaveRoom", (leavingUser) => {
    room = room.filter((user) => user.username !== leavingUser.username);
    console.log("Room content: ", room);
  });
});
