import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fichaRoutes from "./routes/fichaRoutes";

dotenv.config();

const app = Express();
app.use(cors());
app.use(Express.json());

app.use("/api/fichas", fichaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});