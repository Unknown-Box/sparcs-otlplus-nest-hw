import { Body, Catch, Controller, Delete, ExceptionFilter, FileTypeValidator, Get, Header, HttpStatus, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateUserDTO, GetUserDTO } from "./users.dto";
import { UserService } from "./users.service";
import { Request, Response } from "express";
import path from "path";
import { diskStorage } from "multer";
import { randomUUID } from "crypto";


@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Header("Content-Type", "application/json")
  @UsePipes(
    new ValidationPipe({
      whitelist: true, 
      transform: true, 
      disableErrorMessages: false
    })
  )
  async createUser(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Get(":user_uuid")
  async getUser(@Param("user_uuid") userUUID: string): Promise<GetUserDTO> {
    return await this.userService.getUser(userUUID);
  }

  @Delete(":user_uuid")
  async deleteUser(@Param("user_uuid") userUUID: string) {
    return await this.userService.deleteUser(userUUID);
  }
}
