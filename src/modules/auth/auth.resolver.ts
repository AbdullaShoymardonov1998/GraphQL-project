// auth.resolver.ts

import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.dto'
import { AuthReturnType } from './dto/auth-response'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthReturnType)
  async login(@Args('data') data: LoginInput) {
    return this.authService.login(data)
  }
}
