import { NextPage } from "next";
import useUser from "../../libs/client/useUser";
import Link from "next/link";
import { formatDateAndTime } from "../../libs/client/utils/util";
import { useRouter } from "next/router";
const Profile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/users/logout");
    router.reload();
  };

  return (
    <div className="p-4 w-full h-full">
      <div className="flex items-center pb-5">
        <div>
          <Link href="/">
            <p className="text-2xl cursor-pointer">&larr;</p>
          </Link>
        </div>

        <div className="mx-auto text-3xl font-bold">
          <span className="text-2xl">Profile</span>
        </div>
      </div>

      <div className="border-t border-b bg-purple-50 h-64"></div>
      <div
        className="w-28 h-28 rounded-full border-8
          border-white text-3xl font-semibold flex justify-center items-center bg-purple-300 text-white relative -top-16 left-7"
      >
        {user?.name[0]}
      </div>
      <div className="ml-3 -mt-16">
        <div className="flex justify-between items-center">
          <div className="font-extrabold text-2xl">{user?.name}</div>
          <div className="flex flex-col">
            <button className="font-extrabold border-2 rounded-3xl px-3 py-2">
              Edit Profile
            </button>
            <button
              className="font-extrabold border-2 rounded-3xl px-3 py-2 mt-2 text-red-500"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>

        <div className="text-gray-500 mb-4">{user?.email}</div>
        <div className="flex items-center">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
            </g>
          </svg>
          Joined {formatDateAndTime(user?.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
