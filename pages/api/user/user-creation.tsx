import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== "POST") return res.status(405).end({
    error: "Method not allowed"
  });
  try {
    const { username, email } = req.body;
    const user: User = await prisma.user.create({
      data: {
        username,
        email,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
