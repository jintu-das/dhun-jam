export interface Admin {
  status: number;
  response: string;
  data: {
    id: number;
    name: string;
    location: string;
    charge_customers: boolean;
    amount: {
      category_6: number;
      category_7: number;
      category_8: number;
      category_9: number;
      category_10: number;
    };
  };
  server_err_msg: null | string;
  ui_err_msg: null | string;
}
