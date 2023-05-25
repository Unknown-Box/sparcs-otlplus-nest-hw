import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { CreateUserDTO, CreateUserResponseDTO, GetUserDTO } from "./users.dto";
import { createReadStream } from "fs";
import path from "path";
import { UserRepository } from "./users.repository";


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(uuid: string): Promise<GetUserDTO> {
    var user = await this.userRepository.getUser(uuid);
    if (user == null)
      throw new NotFoundException("No such user");

    var { uuid, firstName, lastName } = user;
    return { uuid, firstName, lastName };
  }

  async deleteUser(uuid: string) {
    var user = await this.userRepository.deleteUser(uuid);

    var { uuid } = user;
    return { uuid };
  }

  async createUser(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    var { uuid, firstName, lastName, email } = await this.userRepository.createUser(data);

    return { uuid, firstName, lastName, email };
  }
}
