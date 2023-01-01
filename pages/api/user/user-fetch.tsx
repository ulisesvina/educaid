import type { NextApiRequest, NextApiResponse } from "next";
import { User as UserType } from "@prisma/client";
import User from "../../../controllers/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).end({
      error: "Method not allowed",
    });
  try {
    const user: UserType | null = await User.get(req.query.email as string);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
