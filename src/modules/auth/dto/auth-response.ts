// auth-return.type.ts

import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class AuthReturnType {
  @Field()
  message: string

  //   @Field((type) => UserType)
  //   data: UserType

  @Field()
  jwtToken: string
}
