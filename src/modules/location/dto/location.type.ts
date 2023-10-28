import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class LocationType {
  @Field((type) => Int)
  id: number

  @Field()
  name: string
}
