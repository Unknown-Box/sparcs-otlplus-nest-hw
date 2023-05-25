import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSpaceDTO, JoinSpaceDTO } from "./spaces.dto";
import { SpaceRepository } from "./spaces.repository";


@Injectable()
export class SpaceService {
  constructor(private spaceRepository: SpaceRepository) {}

  async createSpace(data: CreateSpaceDTO) {
    function generateJoinCode() {
      return Math.random().toString(16).slice(2, 10).toUpperCase();
    }

    var { user_uuid, role } = data;
    var space = await this.spaceRepository.createSpace(data);

    await this.spaceRepository.createJoinCode({
      spaceId: space.uuid, 
      type: "ADMIN", 
      content: generateJoinCode()
    });

    await this.spaceRepository.createJoinCode({
      spaceId: space.uuid, 
      type: "MEMBER", 
      content: generateJoinCode()
    });

    await this.spaceRepository.createRole({
      userId: user_uuid, 
      spaceId: space.uuid, 
      role, 
      isAdmin: true
    });

    return {
      uuid: space.uuid, 
      name: space.name
    };
  }

  async joinSpace(data: JoinSpaceDTO) {
    var { user_uuid, joinCode, role } = data;

    var tmp = await this.spaceRepository.getJoinCodeWithSpace(joinCode);

    if (tmp == null)
      throw new NotFoundException("No such space");

    var { space } = tmp;

    await this.spaceRepository.createRole({
      userId: user_uuid, 
      spaceId: space.uuid, 
      role, 
      isAdmin: tmp.type == "ADMIN"
    });

    return {
      uuid: space.uuid, 
      name: space.name
    };
  }

  async deleteMember(space_uuid: string, user_uuid: string) {
    var tmp = await this.spaceRepository.deleteRoleBySpaceUUIDAndUserUUID(space_uuid, user_uuid);
  }
}
