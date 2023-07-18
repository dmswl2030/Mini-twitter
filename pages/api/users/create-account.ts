import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../libs/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { name, email } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(200).end(); //이미 존재하면 200
    }
    await db.user.create({
      data: {
        name,
        email,
      },
    });
    return res.status(201).end(); //생성 완료되면 201
  }
  return res.status(405).end(); //POST가 아니면 405
}
