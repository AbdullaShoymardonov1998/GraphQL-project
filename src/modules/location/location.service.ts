// location.service.ts

import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.location.create({ data })
  }

  async update(id: number, data: any) {
    const location = await this.prisma.location.findUnique({ where: { id } })
    if (!location) throw new NotFoundException('Location not found')
    return this.prisma.location.update({ where: { id }, data })
  }

  async delete(id: number) {
    const location = await this.prisma.location.findUnique({ where: { id } })
    if (!location) throw new NotFoundException('Location not found')
    return this.prisma.location.delete({ where: { id } })
  }

  async findAll() {
    return this.prisma.location.findMany()
  }
}
