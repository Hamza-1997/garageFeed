import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data to prevent unique constraint violations on re-seed
  await prisma.job.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.workshop.deleteMany({})

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
      },
      jobs: {
        create: [
          {
            projectTitle: '1967 Mustang Fastback', 
            workRequired: 'Full restoration job.', 
            createdAt: new Date('2023-10-12T00:00:00Z'),
            status: 'IN_ASSEMBLY',
            clientName: 'Robert Sterling',
            clientPhone: '555-0101',
            year: '1967',
            make: 'Ford',
            model: 'Mustang Fastback',
            imageUrl: 'https://images.pexels.com/photos/34067953/pexels-photo-34067953.jpeg?auto=format&fit=crop&q=80&w=800'
          },
          {
            projectTitle: 'Jeep FJ40', 
            workRequired: 'Engine rebuild and paint correction.', 
            createdAt: new Date('2023-11-03T00:00:00Z'),
            status: 'WAITING_FOR_PARTS',
            clientName: 'Elena Rossi',
            clientPhone: '555-0102',
            year: '1970',
            make: 'Toyota',
            model: 'FJ40',
            imageUrl: 'https://thumbs.dreamstime.com/b/fishermen-fj-oman-toyota-fj-used-fishermen-to-tow-boats-sea-185229373.jpg?auto=format&fit=crop&q=80&w=800'
          },
          {
            projectTitle: '1969 Chevy Camaro SS', 
            workRequired: 'Final inspection failed, awaiting rework.', 
            createdAt: new Date('2023-11-10T00:00:00Z'),
            status: 'QC',
            clientName: 'William Chen',
            clientPhone: '555-0103',
            year: '1969',
            make: 'Chevy',
            model: 'Camaro SS',
            imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800'
          },
          {
            projectTitle: 'Land Rover Defender 90', 
            workRequired: 'Rust repair and fabrication.', 
            createdAt: new Date('2023-10-28T00:00:00Z'),
            status: 'METAL_WORK',
            clientName: 'James Thorne',
            clientPhone: '555-0104',
            year: '1990',
            make: 'Land Rover',
            model: 'Defender 90',
            imageUrl: ''
          }
        ]
      }
    }
  })
  console.log('Seeded workshop and jobs:', workshop)
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })