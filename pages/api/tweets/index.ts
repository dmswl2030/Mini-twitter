import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/db";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const tweets = await client.tweet.findMany({
      include: {
        user: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }

  if (req.method === "POST") {
    const {
      body: { text, createdAt },
      session: { user },
    } = req;
    const tweets = await client.tweet.create({
      data: {
        text,
        createdAt,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
