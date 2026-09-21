import { ObjectId } from "mongodb";

export const Pelicula = (nombre, generos, anioEstreno) => {
    return {
        _id: new ObjectId(),
        nombre,
        generos,
        anioEstreno
    };
};