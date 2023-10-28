// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/core/prisma/prisma.service'
import { UtilsService } from '@/core/utils/utils.service'
import { LoginInput } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly utils: UtilsService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (user && (await this.utils.compareHash(password, user.password))) {
      return user
    }
    return null
  }

  async login(data: LoginInput) {
    const user = await this.validateUser(data.email, data.password)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const payload = { id: user.id, email: user.email }

    return {
      message: 'SUCCESS',
      data: user,
      jwtToken: this.jwtService.sign(payload),
    }
  }

  async validatePayload(payload: any) {
    return await this.prisma.user.findUnique({
      where: { id: payload.id },
    })
  }
}
