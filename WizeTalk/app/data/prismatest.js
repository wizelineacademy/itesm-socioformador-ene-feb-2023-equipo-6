const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            code: 'XXXX-2222',
            name: 'Antonio',
            lastname: 'Meza',
            evaluation_type: 2,
        }
    })
}
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })