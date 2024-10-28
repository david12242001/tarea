// pages/api/products/[id].js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  // Asegúrate de que el ID es un número válido
  const productId = parseInt(id);
  if (isNaN(productId)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    if (req.method === "GET") {
      // Obtener un producto por ID
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      return res.status(200).json(product);
    }

    if (req.method === "PUT") {
      // Actualizar un producto
      const { code, name, price } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { code, name, price },
      });
      return res.status(200).json(updatedProduct);
    }

    if (req.method === "DELETE") {
      // Eliminar un producto
      await prisma.product.delete({
        where: { id: productId },
      });
      return res.status(204).send(); // Respuesta vacía para eliminación exitosa
    }

    return res.status(405).json({ message: "Método no permitido" }); // Método no permitido
  } catch (error) {
    console.error("Error en la operación de productos:", error);
    return res.status(500).json({ message: "Error en el servidor" }); // Error del servidor
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión
  }
}

