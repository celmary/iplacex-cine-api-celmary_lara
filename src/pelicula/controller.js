import { ObjectId } from "mongodb";
import { db } from "../common/db.js";
import { Pelicula } from "./pelicula.js";

const peliculaCollection = db.collection("peliculas");

export async function handleInsertPeliculaRequest(req, res) {

    const pelicula = Pelicula(
        req.body.nombre,
        req.body.generos,
        req.body.anioEstreno
    );

    peliculaCollection
        .insertOne(pelicula)
        .then((resultado) => {

            res.status(201).json({
                _id: resultado.insertedId,
                ...pelicula
            });

        })
        .catch((error) => {

            console.error(error);

            res.status(500).json({
                mensaje: "Error al insertar película"
            });

        });
}

export async function handleGetPeliculasRequest(req, res) {

    peliculaCollection
        .find({})
        .toArray()
        .then((peliculas) => {

            res.status(200).json(peliculas);

        })
        .catch((error) => {

            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener películas"
            });

        });
}

export async function handleGetPeliculaByIdRequest(req, res) {

    try {
        const id = req.params.id;

        const pelicula = await peliculaCollection.findOne({
            _id: new ObjectId(id)
        });

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.status(200).json(pelicula);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener la película"
        });
    }
}

export async function handleUpdatePeliculaRequest(req, res) {

    try {
        const id = req.params.id;

        const resultado = await peliculaCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    nombre: req.body.nombre,
                    generos: req.body.generos,
                    anioEstreno: req.body.anioEstreno
                }
            }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.status(200).json({
            mensaje: "Película actualizada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar la película"
        });
    }
}

export async function handleDeletePeliculaRequest(req, res) {

    try {
        const id = req.params.id;

        const resultado = await peliculaCollection.deleteOne({
            _id: new ObjectId(id)
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                mensaje: "Película no existe"
            });
        }

        res.status(200).json({
            mensaje: "Película eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar la película"
        });
    }
}