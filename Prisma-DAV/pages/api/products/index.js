// pages/api/products/index.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { search } = req.query;

      // Listar productos con opción de búsqueda
      const products = await prisma.product.findMany({
        where: search ? { code: { contains: search } } : {},
      });
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      // Crear un nuevo producto
      const { code, name, price } = req.body;

      // Validar que todos los campos están presentes
      if (!code || !name || price === undefined) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
      }

      const newProduct = await prisma.product.create({
        data: { code, name, price },
      });
      return res.status(201).json(newProduct);
    }

    return res.status(405).json({ message: "Método no permitido" }); // Método no permitido
  } catch (error) {
    console.error("Error en la operación de productos:", error);
    return res.status(500).json({ message: "Error en el servidor" }); // Error del servidor
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión
  }
}
