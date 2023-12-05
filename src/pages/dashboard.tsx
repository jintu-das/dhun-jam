import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import useAdminData from "../hooks/useAdminData";
import { useMutation } from "@tanstack/react-query";
import { updatePrice } from "../api/admin";
import toast from "react-hot-toast";
import { useAuthUser } from "react-auth-kit";

type Formvalues = {
  radio: string;
  customAmount: number;
  category1: number;
  category2: number;
  category3: number;
  category4: number;
};

interface GraphPoint {
  label: string;
  count: string | number;
}

export default function Dashboard() {
  const auth = useAuthUser();
  const userId = auth()?.user_id;

  const { data, isPending, isSuccess } = useAdminData();

  const { isPending: updatePriceLoading, mutate } = useMutation({
    mutationFn: updatePrice,
    onSuccess(data) {
      console.log("data", data);
      toast.success("Price Updated");
    },
    onError(error) {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Formvalues>({
    defaultValues: {
      radio: "",
    },
    mode: "onChange",
  });

  const disableField = watch("radio") === "true" ? false : true;

  const onSubmit: SubmitHandler<Formvalues> = (data) => {
    console.log(data);
    mutate({
      category_6: data.customAmount,
      category_7: data.category1,
      category_8: data.category2,
      category_9: data.category3,
      category_10: data.category4,
      id: userId,
    });
  };

  const graphData: GraphPoint[] = [
    {
      label: "Custom",
      count: watch("customAmount"),
    },
    {
      label: "Category 1",
      count: watch("category1"),
    },
    {
      label: "Category 2",
      count: watch("category2"),
    },
    {
      label: "Category 3",
      count: watch("category3"),
    },
    {
      label: "Category 4",
      count: watch("category4"),
    },
  ];

  React.useEffect(() => {
    if (isSuccess) {
      setValue("radio", data?.data?.charge_customers.toString());
      setValue("customAmount", data?.data?.amount?.category_6);
      setValue("category1", data?.data?.amount?.category_7);
      setValue("category2", data?.data?.amount?.category_8);
      setValue("category3", data?.data?.amount?.category_9);
      setValue("category4", data?.data?.amount?.category_10);
    }
  }, [isSuccess]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="h-full min-h-screen flex flex-col items-center justify-center max-w-[600px] mx-auto">
      <h2 className="text-[32px] font-bold text-center pb-4">
        {data?.data?.name} on {data?.data?.location}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 grid-flow-row gap-4 pt-8">
          <p className="">
            Do you want to charge your customers for requesting songs?
          </p>

          <div className="flex gap-4 items-center justify-center">
            <div className="flex gap-2 items-center">
              <input
                id="yes"
                {...register("radio")}
                type="radio"
                value="true"
              />
              <label htmlFor="yes">Yes</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                id="no"
                {...register("radio")}
                type="radio"
                value="false"
              />
              <label htmlFor="no">No</label>
            </div>
          </div>

          <p>Custom song request amount</p>
          <div>
            <input
              className="input text-center py-1"
              disabled={disableField}
              type="number"
              {...register("customAmount", {
                min: 100,
                required: true,
              })}
              placeholder="Custom Amount"
            />
          </div>

          <p>Regular song request amounts, from high to low</p>
          <div className="flex gap-2 items-center flex-wrap">
            <input
              disabled={disableField}
              className="input w-14 flex-1 py-1"
              type="number"
              {...register("category1", { min: 80, required: true })}
            />
            <input
              disabled={disableField}
              className="input w-14 flex-1 py-1"
              type="number"
              {...register("category2", { min: 60, required: true })}
            />{" "}
            <input
              disabled={disableField}
              className="input w-14 flex-1 py-1"
              type="number"
              {...register("category3", { min: 40, required: true })}
            />{" "}
            <input
              disabled={disableField}
              className="input w-14 flex-1 py-1"
              type="number"
              {...register("category4", { min: 20, required: true })}
            />
          </div>
        </div>

        {!disableField && (
          <div className="h-72 pt-5 relative">
            <span className="text-4xl absolute top-5">₹</span>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={50} data={graphData}>
                <Bar dataKey="count" fill="#F0C3F1" barSize={20} />
                <YAxis tick={false} />{" "}
                <XAxis
                  dataKey="label"
                  style={{
                    fill: "#fff",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <button
          disabled={
            errors?.category1 ||
            errors?.category2 ||
            errors?.category3 ||
            errors?.category4 ||
            errors?.customAmount ||
            disableField
              ? true
              : false || updatePriceLoading
          }
          className="btn-primary"
          type="submit"
        >
          {updatePriceLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
