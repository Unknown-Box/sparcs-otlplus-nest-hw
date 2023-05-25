import { Module } from "@nestjs/common";
import { SpaceService } from "./spaces.service";
import { SpaceController } from "./spaces.controller";
import { SpaceRepository } from "./spaces.repository";
import { UserModule } from "../users/users.module";
import { PrismaModule } from "../prisma/prisma.module";


@Module({
  imports: [PrismaModule, UserModule], 
  controllers: [SpaceController], 
  providers: [SpaceService, SpaceRepository]
})
export class SpaceModule {}
