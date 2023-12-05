import API from ".";
import { Inputs } from "../pages/login";

export async function login(data: Inputs) {
  const res = await API.post("/admin/login", data);
  return res.data;
}
