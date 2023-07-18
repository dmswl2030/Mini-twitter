// import { useRouter } from "next/router";
import React from "react";
import { NextPage } from "next";
import useUser from "../libs/client/useUser";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user, "user");
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {user ? (
        <>
          <h1>Welcome {user.name}!!</h1>
          <h2>Your email is: {user.email}</h2>
        </>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </>
  );
};

export default Home;
