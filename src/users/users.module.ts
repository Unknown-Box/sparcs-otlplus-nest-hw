import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "../users/users.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UserRepository } from "./users.repository";


@Module({
  imports: [PrismaModule], 
  controllers: [UserController], 
  providers: [UserService, UserRepository]
})
export class UserModule {}
