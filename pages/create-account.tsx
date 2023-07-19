import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";

interface IForm {
  name: string;
  email: string;
}

interface MutationResult {
  ok: boolean;
  email?: string;
}

const CreateAccount: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [res, { loading, data }] = useMutation<MutationResult>(
    "/api/users/create-account"
  );

  const onValid = (validForm: IForm) => {
    if (loading) return;
    res(validForm);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/login");
    }
  }, [data]);

  return (
    <main className="w-full">
      <div className="max-w-lg m-auto">
        <div className="w-full min-h-screen">
          <div className="flex flex-col items-center space-y-20">
            <div className="p-10">
              <svg
                className="w-10 h-10"
                aria-hidden="true"
                fill="#b071f5"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </div>

            <div className="w-full space-y-5">
              <h1 className="font-bold text-2xl">트위터에 가입하세요</h1>
              <form
                onSubmit={handleSubmit(onValid)}
                className="flex flex-col items-center space-y-3"
              >
                <div className="w-full">
                  <input
                    className="w-full border border-gray-300 rounded-xl h-12 p-2"
                    type="text"
                    placeholder="사용자명"
                    {...register("name", {
                      required: "Write your name please.",
                    })}
                  />
                  <p className="text-red-500">{errors?.name?.message}</p>
                </div>
                <div className="w-full">
                  <input
                    className="w-full border border-gray-300 rounded-xl h-12 p-2"
                    type="email"
                    placeholder="이메일 주소"
                    {...register("email", {
                      required: "Write your email please.",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                  <p className="text-red-500">{errors?.email?.message}</p>
                </div>
                <button className="bg-customPurple w-full font-bold text-white rounded-2xl h-9">
                  Sign Up
                </button>
              </form>
              <p>
                이미 계정이 있으신가요?{" "}
                <a className="text-blue-500" href="/login">
                  로그인
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateAccount;
