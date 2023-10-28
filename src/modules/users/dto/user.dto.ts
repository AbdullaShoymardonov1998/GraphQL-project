import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  alternativeName?: string

  @Field()
  email: string

  @Field()
  phoneNumber: string

  @Field()
  password: string
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  alternativeName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phoneNumber?: string

  @Field({ nullable: true })
  password?: string
}

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  alternativeName?: string

  @Field()
  email: string

  @Field()
  phoneNumber: string
}
