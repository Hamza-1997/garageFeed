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
          name: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
          role: "ADMIN"
        }
      }
    },
    include: {
      users: true
    }
  })

  const adminId = workshop.users[0].id;

  await prisma.job.create({
    data: {
      workshopId: workshop.id,
      projectTitle: '1967 Mustang Fastback', 
      workRequired: 'Full restoration job.', 
      createdAt: new Date('2023-10-12T00:00:00Z'),
      status: 'IN_ASSEMBLY',
      clientName: 'Robert Sterling',
      clientPhone: '555-0101',
      year: '1967',
      make: 'Ford',
      model: 'Mustang Fastback',
      imageUrl: 'https://images.pexels.com/photos/34067953/pexels-photo-34067953.jpeg?auto=format&fit=crop&q=80&w=800',
      updates: {
        create: [
          {
            title: 'Block Degreasing & Initial Inspection',
            message: 'Engine block has been fully stripped and hot-tanked. Magnetic particle inspection (Magnaflux) confirmed zero stress fractures on the main webbing. Proceeding with bore measurements.',
            visibility: 'CLIENT',
            postedById: adminId,
            createdAt: new Date('2023-10-15T10:00:00Z')
          },
          {
            title: 'Parts Acquisition: Holley EFI Kit',
            message: 'Received the Holley Terminator X Stealth system. Kit was inventoried and matched against the build sheet. Staging for Phase 3 integration.',
            costLogged: 2450.00,
            visibility: 'CLIENT',
            postedById: adminId,
            createdAt: new Date('2023-10-18T14:30:00Z')
          }
        ]
      }
    }
  });

  await prisma.job.create({
    data: {
      workshopId: workshop.id,
      projectTitle: 'Jeep FJ40', 
      workRequired: 'Engine rebuild and paint correction.', 
      createdAt: new Date('2023-11-03T00:00:00Z'),
      status: 'WAITING_FOR_PARTS',
      clientName: 'Elena Rossi',
      clientPhone: '555-0102',
      year: '1970',
      make: 'Toyota',
      model: 'FJ40',
      imageUrl: 'https://thumbs.dreamstime.com/b/fishermen-fj-oman-toyota-fj-used-fishermen-to-tow-boats-sea-185229373.jpg?auto=format&fit=crop&q=80&w=800',
      updates: {
        create: [
          {
            title: 'Chassis Sandblasting Completed',
            message: 'Frame has been taken back to bare metal. Minimal corrosion found on the rear torque boxes. Minor welding required to reinforce the driver-side body mount.',
            visibility: 'CLIENT',
            postedById: adminId,
            createdAt: new Date('2023-11-05T09:15:00Z')
          },
          {
            title: 'Vendor Delay Notice',
            message: 'Supplier called, the new carburetor kit is on backorder for 2 weeks. Need to notify client.',
            visibility: 'INTERNAL',
            postedById: adminId,
            createdAt: new Date('2023-11-06T11:00:00Z')
          }
        ]
      }
    }
  });

  console.log('Seeded workshop and jobs with updates!');
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })