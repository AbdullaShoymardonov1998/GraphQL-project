import { Module } from '@nestjs/common'
import { UserModule } from '@/modules/users/user.module'
import { CoreModule } from '@/core/core.module'
import { JwtStrategy } from './auth.strategy'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UserModule,
    CoreModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, AuthResolver, AuthService],
})
export class AuthModule {}
