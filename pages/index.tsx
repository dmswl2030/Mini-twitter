import React from "react";
import { NextPage } from "next";
import useUser from "../libs/client/useUser";
import { Tweet, User } from "@prisma/client";
import useSWR from "swr";
import Upload from "./upload";
import { FaHome, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { formatDateAndTime } from "../libs/client/utils/util";
export interface TweetsResponse {
  ok: boolean;
  tweets: TweetUser[];
}

interface TweetUser extends Tweet {
  user: User;
}

const Home: NextPage = () => {
  const { isLoading } = useUser();
  const { data } = useSWR<TweetsResponse>("/api/tweets");

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <div className="flex w-full space-x-5">
      <div className="flex flex-col w-1/12 h-screen bg-purple-50 space-y-7 items-center px-8 py-5">
        <div>
          <svg
            className="w-10 h-10"
            aria-hidden="true"
            fill="#b071f5"
            viewBox="0 0 20 20"
          >
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
        </div>
        <div>
          <FaHome size={30} />
        </div>
        <div>
          <FaSearch size={25} />
        </div>
      </div>
      <div className="flex flex-col w-11/12">
        <div className="text-3xl font-bold pb-10 border-b-2 border-purple-300">
          Home
        </div>

        <Upload />

        <div className="border-t-2 border-purple-300 mt-5">
          {data && data.tweets?.length > 0 ? (
            <>
              {data.tweets.map((tweet, i) => (
                <Link href={`/tweets/${tweet.id}`} key={i}>
                  <div className="w-full border-b">
                    <div className="flex">
                      <div className="w-full">
                        <div className="flex justify-between items-center cursor-pointer">
                          <div className="my-5">
                            <div className="text-md text-purple-300 font-extrabold">
                              {tweet.user?.name}
                            </div>
                            <p className="text-lg">{tweet.text}</p>
                          </div>

                          <p className="text-sm text-black">
                            {formatDateAndTime(tweet.createdAt.toString())}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            "No Tweets"
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
