import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { EventService } from './event.service'
import { EventType } from './dto/event.dto'
import {
  CreateEventInput,
  UpdateEventInput,
  FindEventsInput,
} from './dto/event.dto'

@Resolver((of) => EventType)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Mutation((returns) => EventType)
  async createEvent(@Args('data') input: CreateEventInput) {
    return this.eventService.createEvent(input)
  }

  @Mutation((returns) => EventType)
  async updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') input: UpdateEventInput,
  ) {
    return this.eventService.updateEvent(id, input)
  }

  @Mutation((returns) => EventType)
  async deleteEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.deleteEvent(id)
  }

  @Query((returns) => [EventType])
  async findAllEvents(@Args('events') params: FindEventsInput) {
    return this.eventService.findAllEvents(params)
  }
}
