import express from "express";
import cors from "cors";
import { conectarDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import ActorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", peliculaRoutes);
app.use("/api", ActorRoutes);

// Ruta por defecto
app.get("/", (req, res) => {
    res.send("Bienvenido al cine Iplacex");
});

// Conexión a MongoDB y arranque del servidor
conectarDB()
    .then(() => {
        console.log("Conexión a MongoDB Atlas correcta");

        app.listen(PORT, () => {
            console.log(`Servidor Express ejecutándose en puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con MongoDB Atlas:", error);
    });