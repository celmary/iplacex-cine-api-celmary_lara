import { ObjectId } from "mongodb";
import { db } from "../common/db.js";
import { Actor } from "./actor.js";

const actorCollection = db.collection("actores");
const peliculaCollection = db.collection("peliculas");

export async function handleInsertActorRequest(req, res) {

    try {
        const pelicula = await peliculaCollection.findOne({
            _id: new ObjectId(req.body.idPelicula)
        });

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        const actor = Actor(
            req.body.idPelicula,
            req.body.nombre,
            req.body.edad,
            req.body.estaRetirado,
            req.body.premios
        );

        actorCollection
            .insertOne(actor)
            .then((resultado) => {

                res.status(201).json({
                    _id: resultado.insertedId,
                    ...actor
                });

            })
            .catch((error) => {

                console.error(error);

                res.status(500).json({
                    mensaje: "Error al insertar actor"
                });

            });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al validar la película"
        });
    }
}

export async function handleGetActoresRequest(req, res) {

    actorCollection
        .find({})
        .toArray()
        .then((actores) => {

            res.status(200).json(actores);

        })
        .catch((error) => {

            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener actores"
            });

        });
}

export async function handleGetActorByIdRequest(req, res) {

    try {
        const id = req.params.id;

        const actor = await actorCollection.findOne({
            _id: new ObjectId(id)
        });

        if (!actor) {
            return res.status(404).json({
                mensaje: "Actor no encontrado"
            });
        }

        res.status(200).json(actor);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener el actor"
        });
    }
}

export async function handleGetActoresByPeliculaRequest(req, res) {

    try {
        const idPelicula = req.params.id;

        const actores = await actorCollection
            .find({ idPelicula: idPelicula })
            .toArray();

        res.status(200).json(actores);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener los actores de la película"
        });
    }
}