import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class JwtPayloadType {
  @Field()
  id: string
}
