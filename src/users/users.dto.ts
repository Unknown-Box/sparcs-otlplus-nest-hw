import { IsNotEmpty, IsInt, IsString, IsUUID, IsEmail, IsDateString, IsBoolean } from "class-validator";
import { OmitType, PickType } from "@nestjs/mapped-types"


export class UserSchema {
  constructor() {}
  @IsInt()
  @IsNotEmpty()
  id: number

  @IsUUID()
  @IsNotEmpty()
  uuid: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  // @IsString()
  // @IsNotEmpty()
  // profileImageURL: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

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

export class GetUserDTO extends PickType(UserSchema, ["uuid", "firstName", "lastName"] as const) {}

export class CreateUserDTO extends PickType(UserSchema, ["firstName", "lastName", "email", "password"] as const) {}

export class CreateUserResponseDTO extends PickType(UserSchema, ["uuid", "firstName", "lastName", "email"] as const) {}
