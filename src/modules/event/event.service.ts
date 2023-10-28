import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Event } from '@prisma/client'
import {
  CreateEventInput,
  FindEventsInput,
  UpdateEventInput,
} from './dto/event.dto'

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  parseDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split(' ')

    const [day, month, year] = datePart.split('.').map(Number)
    let hours = 0
    let minutes = 0

    if (timePart) {
      ;[hours, minutes] = timePart.split(':').map(Number)
    }

    return new Date(Date.UTC(year, month - 1, day, hours, minutes))
  }

  async createEvent(data: CreateEventInput): Promise<Event> {
    const startDate = this.parseDate(data.startDate)
    const endDate = this.parseDate(data.endDate)
    return this.prisma.event.create({
      data: {
        ...data,
        startDate,
        endDate,
      },
    })
  }

  async updateEvent(id: number, data: UpdateEventInput): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { id } })
    if (!event) throw new NotFoundException('Event not found')
    return this.prisma.event.update({
      where: { id },
      data,
    })
  }

  async findAllEvents(params: FindEventsInput): Promise<Event[]> {
    const where = {}
    if (params.startDate && params.endDate) {
      where['startDate'] = {
        gte: new Date(params.startDate),
        lte: new Date(params.endDate),
      }
    }
    if (params.locationId) {
      where['locationId'] = params.locationId
    }
    return this.prisma.event.findMany({ where })
  }

  async deleteEvent(id: number): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { id } })
    if (!event) throw new NotFoundException('Event not found')
    return this.prisma.event.delete({
      where: { id },
    })
  }
}
