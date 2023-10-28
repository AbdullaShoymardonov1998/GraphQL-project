import { Module } from '@nestjs/common'
import { UserModule } from '@/modules/users/user.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { CoreModule } from '@/core/core.module'
import { EventModule } from './modules/event/event.module'
import { LocationModule } from './modules/location/location.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
@Module({
  imports: [
    UserModule,
    AuthModule,
    CoreModule,
    EventModule,
    LocationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
