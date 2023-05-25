import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { SpaceService } from "./spaces.service";
import { CreateSpaceDTO, JoinSpaceDTO } from "./spaces.dto";


@Controller("spaces")
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @Post()
  async createSpace(@Body() body: CreateSpaceDTO) {
    return await this.spaceService.createSpace(body);
  }

  @Post("join")
  async joinSpace(@Body() body: JoinSpaceDTO) {
    return await this.spaceService.joinSpace(body);
  }

  @Delete(":space_uuid/member/:user_uuid")
  async deleteMember(@Param("space_uuid") space_uuid: string, @Param("user_uuid") user_uuid: string) {
    return this.spaceService.deleteMember(space_uuid, user_uuid);
  }
}
