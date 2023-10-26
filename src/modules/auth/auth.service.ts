import { BadRequestException, Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/core/prisma/prisma.service'
import { UtilsService } from '@/core/utils/utils.service'

@Injectable()
export class AuthService {
  constructor(
    private utils: UtilsService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(body: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: body.email },
      })
      if (!user) throw new Error('No user found with this email')
      const isCorrectPass = await this.utils.compareHash(
        body.password,
        user.password,
      )
      if (!isCorrectPass) throw new Error('Password is incorrect')
      const payload = { id: user.id, email: user.email }

      const jwtToken = this.jwtService.sign(payload)
      return {
        message: 'SUCCESS',
        data: user,
        jwtToken: jwtToken,
      }
    } catch (error) {
      console.error(`Login: ${error.message}, ${error.stack}`)
      throw new BadRequestException('Error')
    }
  }
}
