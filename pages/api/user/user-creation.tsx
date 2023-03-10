import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../controllers/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).end({
      error: "Method not allowed",
    });
  try {
    const username: string = req.body.username,
      email: string = req.body.email;

    await User.create({
      username,
      email,
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
