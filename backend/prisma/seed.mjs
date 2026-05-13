import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const workshop = await prisma.workshop.create({
    data: {
      name: "Project Cars",
      slug: "project-cars",
      users: {
        create: {
          name: "Hamza",
          email: "admin@projectcars.com",
          passwordHash: await bcrypt.hash("@12345678", 10),
          role: "ADMIN"
        }
      }
    }
  })
  console.log('Seeded:', workshop)
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })