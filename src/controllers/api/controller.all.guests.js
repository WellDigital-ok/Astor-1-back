import Guests from "../../models/entities/Guests.model.js";
import { guestsRepository } from "../../repositories/guests.repository.js";

export async function handlePost(req, res, next) {
  try {
    // Esperamos un array de objetos { name, lastName }
    const payload = Array.isArray(req.body) ? req.body : [];

    if (!payload.length) {
      return res.status(400).json({
        message:
          "Se esperaba un array de invitados con objetos { name, lastName }",
      });
    }

    // Función recursiva para ir creando y guardando cada invitado
    async function createGuestsRecursively(guestsArray, index = 0, acc = []) {
      if (index >= guestsArray.length) return acc;

      const { name, lastName } = guestsArray[index];

      const guestInstance = new Guests({ name, lastName });
      const savedGuest = await guestsRepository.add(guestInstance.dto());

      acc.push(savedGuest);
      return createGuestsRecursively(guestsArray, index + 1, acc);
    }

    const createdGuests = await createGuestsRecursively(payload);

    // Devolvemos todos los documentos creados
    return res.status(201).json(createdGuests);
  } catch (error) {
    next(error);
  }
}

export async function handleGet(req, res, next) {
  try {
    const guests = await guestsRepository.findMany();
    res.json(guests);
  } catch (error) {
    next(error);
  }
}

export async function handlePut(req, res, next) {
  //en construccion esta pensado para hacer borrado logico o cambiar el estado de las noticias cuando se incoopore plataformas de pago.
}

export async function handleDelete(req, res, next) {
  //en construccion esta pensado para eliminar a futuro noticias
}
