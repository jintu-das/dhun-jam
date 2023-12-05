import API from ".";
import { Admin } from "./api-types";

export async function getAdmin(id: number): Promise<Admin> {
  const res = await API.get(`/admin/${id}`);
  return res.data;
}

export async function updatePrice(data: {
  category_6: number;
  category_7: number;
  category_8: number;
  category_9: number;
  category_10: number;
  id: number;
}) {
  return API.put(`/admin/${data.id}`, {
    amount: {
      category_6: data.category_6,
      category_7: data.category_7,
      category_8: data.category_8,
      category_9: data.category_9,
      category_10: data.category_10,
    },
  });
}
