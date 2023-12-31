import useMutation from "../libs/client/useMutation";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { useEffect } from "react";
import useUser from "../libs/client/useUser";
import { User } from "@prisma/client";

interface UploadForm {
  text: string;
}
interface UploadMutation {
  ok: boolean;
  user: User;
}

export default function Upload() {
  const { user } = useUser();
  const { mutate } = useSWR<UploadMutation>("/api/tweets");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UploadForm>();

  const [tweet, { data, loading }] = useMutation<UploadMutation>("/api/tweets");

  const onValid = async ({ text }: UploadForm) => {
    if (loading) return;
    tweet({
      text,
    });
  };
  useEffect(() => {
    if (loading) return;
    if (data?.ok) {
      setValue("text", "");
      mutate();
    }
  }, [data]);

  return (
    <div className="w-full">
      <form
        className="flex w-full h-full mt-5 justify-between"
        onSubmit={handleSubmit(onValid)}
      >
        <div className="w-1/5">
          <div
            className="w-20 h-20 rounded-full border
          border-purple-300 text-3xl font-semibold mr-5 flex justify-center items-center bg-purple-300 text-white"
          >
            {user?.name[0]}
          </div>
        </div>

        <div className="w-4/5">
          <div>{user?.name}</div>
          <div className="h-20 text-2xl w-full">
            <input
              {...register("text", { required: "This field is required" })}
              type="text"
              placeholder="What is happening?!"
              className="w-full focus:outline-none text-top"
            />
          </div>
          {errors.text && (
            <p className="text-red-400 text-sm">{errors.text.message}</p>
          )}
          <div className="flex justify-end items-center">
            {/* <label>
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
            </label> */}
            <button
              type="submit"
              className="bg-purple-300 px-4 py-2 rounded-3xl text-white"
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
