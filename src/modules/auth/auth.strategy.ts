import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '@/modules//users/user.service'
import { JwtPayloadType } from './dto/jwt.payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayloadType) {
    const { id } = payload
    const user = await this.userService.getUserById(id)

    if (!user) {
      throw new UnauthorizedException()
    }

    return {
      userId: payload.id,
    }
  }
}
