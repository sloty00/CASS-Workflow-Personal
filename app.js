const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
    //Crear un registro
   /* const post = await prisma.post.createMany({
        data: [
            { titulo: 'Titulo 2', contenido: 'Este es mi segundo post' },
            { titulo: 'Titulo 3', contenido: 'Este es mi tercer post' },
            { titulo: 'Titulo 4', contenido: 'Este es mi cuarto post' },
        ]
    })
    console.log(post) */
    //Mostrar todos los registros
    const allPosts = await prisma.post.findMany()
    console.log(allPosts)

    const allUsuario = await prisma.usuario.findMany()
    console.log(allUsuario)

    //Mostrar un solo registro
    /*const postUnique = await prisma.post.findUnique({
        where: {
            id:3
        }
    })
    console.log(postUnique)*/
    //Actualizar un registro
    /*const updatePost = await prisma.post.update({
        where: {
            id: 4
        },
        data: {
            titulo: 'Titulo 4 editado',
            contenido: 'Contenido 4 Editado'
        }
    })
    console.log(updatePost)*/
    //Eliminar un registro
    /*const deletePost = await prisma.post.delete({
        where: {
            id:3
        }
    })
    console.log(deletePost)*/

}

main()
    .catch( (e)=> {
        throw e
    })
    .finally(async ()=>{
        await prisma.$disconnect()
    })