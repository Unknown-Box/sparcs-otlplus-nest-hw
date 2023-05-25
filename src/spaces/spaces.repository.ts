import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateJoinCodeDTO, CreateRoleDTO, CreateSpaceDTO } from "./spaces.dto";


@Injectable()
export class SpaceRepository {
  constructor(private prisma: PrismaService) {}

  async getSpace(uuid: string) {
    return this.prisma.space.findFirst({
      where: {
        uuid, 
        isExpired: false
      }
    })
  }

  async getJoinCodeWithSpace(joinCode: string) {
    return await this.prisma.joinCode.findFirst({
      where: {
        content: joinCode, 
        isExpired: false
      }, 
      include: {
        space: true
      }
    });
  }

  async deleteSpace(uuid: string) {
    return this.prisma.space.update({
      where: { uuid }, 
      data: { isExpired: true }
    })
  }

  async deleteRoleBySpaceUUIDAndUserUUID(space_uuid: string, user_uuid: string) {
    return this.prisma.role.updateMany({
      where: { 
        spaceId: space_uuid, 
        userId: user_uuid
      }, 
      data: {
        isExpired: true
      }
    })
  }

  async createSpace(data: CreateSpaceDTO) {
    var { name } = data;
    return this.prisma.space.create({ data: { name } });
  }

  async createRole(data: CreateRoleDTO) {
    return this.prisma.role.create({ data });
  }

  async createJoinCode(data: CreateJoinCodeDTO) {
    return this.prisma.joinCode.create({ data });
  }
}
