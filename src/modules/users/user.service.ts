import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@/core/prisma/prisma.service'
import { CreateUserInput, UpdateUserInput } from './dto/user.dto'
import { PASSWORD_SALT } from '@/consts/password-salt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  async getAllUsersService() {
    return this.prisma.user.findMany()
  }

  async createUserFromInput(input: CreateUserInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })
    if (existingUser) {
      throw new BadRequestException('User already exists')
    }
    return this.prisma.user.create({
      data: {
        ...input,
        password: await bcrypt.hash(input.password, PASSWORD_SALT),
      },
    })
  }

  async updateUserFromInput(userId: string, input: UpdateUserInput) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...input,
        password: input.password
          ? await bcrypt.hash(input.password, PASSWORD_SALT)
          : undefined,
      },
    })
  }

  async deleteUserById(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
