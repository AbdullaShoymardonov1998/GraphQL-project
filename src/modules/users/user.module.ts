import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { CoreModule } from '@/core/core.module'
import { UserResolver } from './user.resolver'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [UserResolver, UserService],
  exports: [UserResolver, UserService],
})
export class UserModule {}
