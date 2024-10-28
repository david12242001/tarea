import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function crearUsuario() {
  try {

    const usuario = await prisma.user.create({
      data: {
        nombre: "dav",
        correo: "dav@micorreo.com",
        post: {
          create: {
            titulo: "dav salva al mundo",
            contenido: "Algo",
          },
        },
        perfil: {
          create: {
            biografia: "Alguna bio",
          },
        },
      },
    });
    console.log("Usuario creado:", usuario);
  } catch (error) {

    console.error("Error al crear el usuario:", error);
  } finally {

    await prisma.$disconnect();
  }
}


crearUsuario();
