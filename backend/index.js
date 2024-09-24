import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from your client
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if necessary
  },
});

const url =
  "mongodb+srv://rosenthb:bO5JHYTfa5hFSN3o@cluster0.j8ajp.mongodb.net/jaMoveo?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
let db;
// Function to connect to the MongoDB database
async function connectToDb() {
  try {
    await client.connect();
    db = client.db("jaMoveo"); // Using your actual DB name "Code-togetherDB"
    console.log("Connected to Jamoveo!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

await connectToDb(); // Call this function to connect to the database

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
    await users.insertOne(formData);
    res.send({ message: "Form data received:", data: formData });
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
