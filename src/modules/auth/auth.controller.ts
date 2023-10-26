import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'
import { LoginDto } from '@/modules/auth/dto/login.dto'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
}
