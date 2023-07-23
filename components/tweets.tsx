import { FiHeart, FiEye } from "react-icons/fi";
import { TweetsResponse } from "../pages";
import Link from "next/link";

export default function Tweets({ tweets }: TweetsResponse) {
  return tweets?.length > 0 ? (
    <>
      {tweets.map((tweet, i) => (
        <Link href={`/tweets/${tweet.id}`} key={i}>
          <div className="w-full border-b flex justify-between items-center cursor-pointer">
            <div className="my-4 flex">
              <div
                className="w-12 h-12 rounded-full border
          border-purple-300 text-2xl font-semibold mr-5 flex justify-center items-center bg-purple-300 text-white"
              >
                {tweet.user?.name[0]}
              </div>
              <div className="">
                <div className="text-md text-purple-300 font-extrabold">
                  {tweet.user?.name}
                </div>
                <p className="text-lg">{tweet.text}</p>
              </div>
            </div>

            <div className="text-sm text-black w-10">
              <div className="flex flex-row items-center">
                <FiHeart />
                <span className="pl-2">{tweet._count?.likes}</span>
              </div>
              <div className="flex flex-row items-center">
                <FiEye />
                <span className="pl-2">{tweet.views}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  ) : null;
}
