import { Field, InputType, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class EventType {
  @Field(() => Int)
  id: number

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Int, { nullable: true })
  locationId?: number
}

@InputType()
export class CreateEventInput {
  @Field()
  startDate: string

  @Field()
  endDate: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Int, { nullable: true })
  locationId?: number
}

@InputType()
export class UpdateEventInput extends CreateEventInput {}

@InputType()
export class FindEventsInput {
  @Field({ nullable: true })
  startDate?: Date

  @Field({ nullable: true })
  endDate?: Date

  @Field(() => Int, { nullable: true })
  locationId?: number
}
