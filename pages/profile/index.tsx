import { NextPage } from "next";
import useUser from "../../libs/client/useUser";
import Link from "next/link";
import { formatDateAndTime } from "../../libs/client/utils/util";

const Profile: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center pb-3">
        <div>
          <Link href="/">
            <p className="text-2xl cursor-pointer">&larr;</p>
          </Link>
        </div>

        <div className="mx-auto text-3xl font-bold">
          <span className="text-2xl">Profile</span>
        </div>
      </div>
      <div>
        <div
          className="w-20 h-20 rounded-full border
          border-purple-300 text-3xl font-semibold mr-5 flex justify-center items-center bg-purple-300 text-white"
        >
          {user?.name[0]}
        </div>
      </div>
      <div>
        <div>{user?.name}</div>
        <div>{user?.email}</div>
        <div>Joined {formatDateAndTime(user?.createdAt)}</div>
      </div>
    </>
  );
};

export default Profile;
