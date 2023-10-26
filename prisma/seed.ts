import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { UserRole } from '@prisma/client'
import { PASSWORD_SALT } from '../src/consts/password-salt'

const prisma = new PrismaClient()

async function main() {
  return Promise.all([
    await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'Admin',
        alternativeName: '',
        email: 'admin@gmail.com',
        phoneNumber: '+100000000000',
        password: await bcrypt.hash('12345678', PASSWORD_SALT),
        role: UserRole.ADMIN,
      },
    }),
  ]).catch((error) => console.error(error))
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
