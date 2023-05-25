import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { CreateUserDTO, GetUserDTO } from "./users.dto";


@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}
  
  async getUser(uuid: string) {
    return await this.prisma.user.findFirst({
      where: {
        uuid, 
        isExpired: false
      }
    })
  }

  async deleteUser(uuid: string) {
    return await this.prisma.user.update({
      where: { uuid }, 
      data: { isExpired: true }
    });
  }

  async createUser(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }
}
