import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/db";
import { ResponseType } from "../../../libs/server/withHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, email } = req.body;
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return res.send({
      ok: false,
      error: "이미 존재하는 계정입니다.",
    });
  }
  await client.user.create({
    data: {
      name,
      email,
    },
  });
  res.send({
    ok: true,
    email,
  });
}
