import { ObjectId } from "mongodb";

export const Actor = (
    idPelicula,
    nombre,
    edad,
    estaRetirado,
    premios
) => {
    return {
        _id: new ObjectId(),
        idPelicula,
        nombre,
        edad,
        estaRetirado,
        premios
    };
};