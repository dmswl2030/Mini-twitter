import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";
import { useEffect } from "react";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  text: string;
}

interface UploadProductMutation {
  ok: boolean;
  tweet: Tweet;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/tweets");
  const onValid = (data: UploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/tweets/${data.tweet.id}`);
    }
  }, [data, router]);
  return (
    <div className="w-full">
      <form className="flex h-full mt-5" onSubmit={handleSubmit(onValid)}>
        <img
          src=""
          alt="userImg"
          className="w-20 h-20 rounded-full border border-purple-300 text mr-5"
        />
        <div className="h-full w-3/4">
          <div className="h-3/4 text-2xl w-full">
            <input
              {...register("text")}
              type="text"
              placeholder="What is happening?!"
              className="w-full focus:outline-none text-top"
            />
          </div>
          <div className="h-1/4 flex justify-end items-center">
            <label>
              <svg
                className="h-8 w-8"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
              </svg>
              <input className="hidden" type="file" />
            </label>
            <button type="submit" className="bg-purple-300 px-4 rounded-3xl">
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;
