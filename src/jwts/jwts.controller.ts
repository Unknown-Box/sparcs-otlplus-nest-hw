import { Body, Controller, Post } from "@nestjs/common";


@Controller("jwts")
export class JWTModule {
  constructor() {}

  @Post()
  async createJWT(@Body() body: any) {}
}
