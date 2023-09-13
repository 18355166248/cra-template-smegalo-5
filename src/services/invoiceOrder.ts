import $axios from "./$axios";

export function queryInvoicedOrder(params: any): Promise<any> {
  return $axios.get("/manage", { params });
}

export function createInvoicedOrder(data: any): Promise<any> {
  return $axios.post("/manage/create", data);
}

export function updateInvoicedOrder(data: any): Promise<any> {
  return $axios.post("/manage/update", data);
}
