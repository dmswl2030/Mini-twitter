// import { useRouter } from "next/router";
import React from "react";
import { NextPage } from "next";
import useUser from "../libs/client/useUser";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {user ? (
        <div className="flex w-full space-x-5">
          <div className="flex flex-col w-1/12 bg-gray-50">
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
            <div>Home</div>
            <div>Search</div>
          </div>
          <div className="flex flex-col w-11/12">
            <div className="text-2xl font-bold pb-20 border-b-2 border-purple-300">
              Home
            </div>

            <div className="w-full">
              <div className="flex h-full mt-5">
                <img
                  src=""
                  alt="userImg"
                  className="w-20 h-20 rounded-full bg-pink-200 text mr-5"
                />
                <div className="h-full w-3/4">
                  <div className="h-3/4 text-2xl w-full">
                    <input
                      type="text"
                      placeholder="What is happening?!"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="h-1/4">
                    <button className="bg-purple-300 px-4 py-2 rounded-3xl">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
              <div>Content</div>
            </div>
          </div>
        </div>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </>
  );
};

export default Home;
