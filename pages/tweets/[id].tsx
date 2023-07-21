import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { Tweet, User } from "@prisma/client";
import useMutation from "../../libs/client/useMutation";
import { formatDateAndTime, cls } from "../../libs/client/utils/util";
interface TweetWithUser extends Tweet {
  user: User;
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
    toggleLike({});
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    toggleLike({});
  };
  return (
    <div className="px-4  py-4">
      <div className="mb-8">
        <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.tweet?.user?.name}
            </p>
            <Link
              href={`/users/profiles/${data?.tweet?.user?.id}`}
              className="text-xs font-medium text-gray-500"
            >
              View profile &rarr;
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.tweet?.text}
          </h1>

          <div className="flex items-center justify-between space-x-2">
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
            <div>{formatDateAndTime(data?.tweet?.createdAt.toString())}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetail;
