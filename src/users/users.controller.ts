import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";


@Controller("users")
export class UserController {
  constructor() {}

  @Post()
  async createUser(@Body() body: any) {}

  @Get(":userId")
  async getUser(@Param("userId") userId: string) {}

  @Delete(":userId")
  async deleteUser(@Param("userId") userId: string) {}
}
