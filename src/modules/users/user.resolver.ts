import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { CreateUserInput, UpdateUserInput, User } from './dto/user.dto'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  async getUser(@Args('id') id: string) {
    return this.userService.getUserById(id)
  }

  @Query((returns) => User)
  async getAllUsers() {
    return this.userService.getAllUsersService()
  }

  @Mutation((returns) => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUserFromInput(input)
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.userService.updateUserFromInput(id, input)
  }

  @Mutation((returns) => User)
  async deleteUser(@Args('id') id: string) {
    return !!this.userService.deleteUserById(id)
  }
}
