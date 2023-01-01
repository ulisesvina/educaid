import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const User = {
  async create(data: any) {
    return await prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: {},
      create: data,
    });
  },
  async update(email: string, data: any) {
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
