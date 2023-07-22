import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { Tweet, User } from "@prisma/client";
import useMutation from "../../libs/client/useMutation";
import { formatDateAndTime, cls } from "../../libs/client/utils/util";

interface TweetWithUser extends Tweet {
  user: User;
  _count: {
    likes: number;
  };
}
interface TweetDetailResponse {
  ok: boolean;
  tweet: TweetWithUser;
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/likes`);

  const onLikeClick = () => {
    if (!data) return;

    const updatedIsLiked = !data.isLiked;
    const updatedLikes = data.tweet._count.likes + (updatedIsLiked ? 1 : -1);

    mutate(
      {
        ...data,
        isLiked: updatedIsLiked,
        tweet: {
          ...data.tweet,
          _count: {
            ...data.tweet._count,
            likes: updatedLikes,
          },
        },
      },
      false
    );

    // 좋아요 API 호출
    toggleLike({});
  };
  return (
    <div className="p-4 mb-8">
      <div className="flex items-center">
        <div>
          <Link href="/">
            <p className="text-2xl cursor-pointer">&larr;</p>
          </Link>
        </div>

        <div className="mx-auto text-3xl font-bold">
          <span className="text-2xl">Tweet</span>
        </div>
      </div>
      <div className="flex mt-5 border-t border-b pb-10">
        <div className="flex cursor-pointer py-3 items-center">
          <div
            className="w-14 h-14 rounded-full border
          border-purple-300 text-2xl font-semibold mr-5 flex justify-center items-center bg-purple-300 text-white"
          >
            {data?.tweet?.user?.name[0]}
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold text-purple-500 pt-7 my-5">
            {data?.tweet?.user?.name}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.tweet?.text}
          </h1>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between items-center border-b">
          <div className="flex justify-center items-center">
            <button
              onClick={onLikeClick}
              className={cls(
                "p-3 rounded-md flex items-center",
                data?.isLiked
                  ? "text-orange-500  hover:text-orange-600 hover:bg-gray-100"
                  : "text-gray-400  hover:text-gray-600 hover:bg-gray-100"
              )}
            >
              {data?.isLiked ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
            <p>{data?.tweet._count?.likes} likes</p>
          </div>

          <div>{formatDateAndTime(data?.tweet?.createdAt.toString())}</div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetail;
