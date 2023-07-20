import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../libs/server/withSession";
import db from "../../../libs/server/db";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.send({
      ok: false,
      error: "계정이 존재하지 않습니다.",
    });
  }
  req.session.user = {
    id: user.id,
  };
  await req.session.save();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
