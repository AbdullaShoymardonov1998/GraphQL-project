// location.resolver.ts

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { LocationService } from './location.service'
import { LocationType } from './dto/location.type'
import { CreateLocationInput } from './dto/location.dto'

@Resolver((of) => LocationType)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Mutation((returns) => LocationType)
  async createLocation(@Args('data') data: CreateLocationInput) {
    return this.locationService.create(data)
  }

  @Mutation((returns) => LocationType)
  async updateLocation(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: CreateLocationInput,
  ) {
    return this.locationService.update(id, data)
  }

  @Mutation((returns) => LocationType)
  async deleteLocation(@Args('id', { type: () => Int }) id: number) {
    return this.locationService.delete(id)
  }

  @Query((returns) => [LocationType])
  async findAllLocations() {
    return this.locationService.findAll()
  }
}
