import gameRoutes from "./routes/gameRoutes.js";
import express from "express";
import cors from "cors";

const app = express();

// - create game
//     . initialise deck 
//     . init the player with the name given and an id 
//     . 

app.use(cors());
app.use(express.json());

app.use("/game",gameRoutes);



app.listen(3000,()=>{
    console.log("server is running on port 3000");
}); 