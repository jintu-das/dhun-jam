import { SubmitHandler, useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";

export type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isPending } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-[600px] items-stretch gap-5"
      >
        <h2 className="text-[32px] font-bold text-center pb-4">
          Venue Admin Login
        </h2>
        <div className="flex flex-col gap-1">
          <input
            className="input"
            placeholder="Username"
            defaultValue="DJ@4"
            {...register("username", { required: true })}
          />

          {errors.username && (
            <span className="text-sm text-red-400 font-medium">
              This field is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            className="input"
            defaultValue="Dhunjam@2023"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          {errors.password && (
            <span className="text-sm text-red-400 font-medium">
              This field is required
            </span>
          )}
        </div>

        <button type="submit" className="btn-primary mt-8">
          {isPending ? "Saving..." : "Save"}
        </button>
        <a href="#" className="text-center">
          New Registration
        </a>
      </form>
    </section>
  );
}
