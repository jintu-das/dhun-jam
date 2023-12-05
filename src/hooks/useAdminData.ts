import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../data/constants";
import { getAdmin } from "../api/admin";
import { useAuthUser } from "react-auth-kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useAdminData() {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const userId = auth()?.user_id;

  if (!userId) {
    toast.error("Not logged In");
    navigate("/");
  }

  const query = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD],
    queryFn: () => getAdmin(userId),
  });

  return query;
}
