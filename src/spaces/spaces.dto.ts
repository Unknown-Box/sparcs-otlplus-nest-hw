import { PickType } from "@nestjs/mapped-types"
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsString, IsUUID, isNotEmpty } from "class-validator"

export class SpaceSchema {
  constructor() {}

  @IsInt()
  @IsNotEmpty()
  id: number

  @IsUUID()
  @IsNotEmpty()
  uuid: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsDateString()
  @IsNotEmpty()
  createdAt: string

  @IsDateString()
  @IsNotEmpty()
  updatedAt: string

  @IsBoolean()
  @IsNotEmpty()
  isExpired: boolean
}

export class CreateSpaceDTO extends PickType(SpaceSchema, ["name"] as const) {
  @IsUUID()
  @IsNotEmpty()
  user_uuid: string

  @IsString()
  @IsNotEmpty()
  role: string
}

export class JoinSpaceDTO {
  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;

  @IsString()
  @IsNotEmpty()
  joinCode: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class CreateRoleDTO {
  constructor() {}

  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsUUID()
  @IsNotEmpty()
  spaceId: string

  @IsString()
  @IsNotEmpty()
  role: string

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean
}

export class CreateJoinCodeDTO {
  constructor() {}

  @IsUUID()
  @IsNotEmpty()
  spaceId: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  content: string
}
