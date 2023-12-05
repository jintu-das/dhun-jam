import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { useAuthHeader, useSignIn } from "react-auth-kit";
import { login } from "../api/authentication";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "../api";

interface DecodedToken {
  email: string;
  exp: number;
  user_id: number;
  username: string;
}

export default function useLogin() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const query = useMutation({
    mutationFn: login,
    onSuccess(data) {
      const decodedToken: DecodedToken = decodeToken(data?.data?.token)!;

      if (
        signIn({
          token: data.data.token,
          expiresIn: decodedToken?.exp,
          tokenType: "Bearer",
          authState: decodedToken,
        })
      ) {
        API.interceptors.request.use(function (config) {
          const token = authHeader();
          config.headers.Authorization = token ?? "";
          return config;
        });

        navigate("/dashboard");
      } else {
        toast.error("Login Failed!");
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      console.log(error?.response?.data?.ui_err_msg);
      toast.error(error?.response?.data?.ui_err_msg);
    },
  });

  return query;
}
