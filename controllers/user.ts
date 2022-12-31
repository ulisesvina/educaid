import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const User = {
  async create(data: User) {
    return await prisma.user.create({
      data,
    });
  },
  async update(email: string, data: User) {
    return await prisma.user.update({
      where: {
        email,
      },
      data,
    });
  },
  async delete(email: string) {
    return await prisma.user.delete({
      where: {
        email,
      },
    });
  },
  async get(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
};

export default User;
