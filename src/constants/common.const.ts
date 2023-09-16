export const baseUrl = "/base-url";

// 前面不要带斜杠因为 createBrowserRouter 子的path不识别
export const basePathUrl = "/router-base-name";

export interface constTypeProp {
  text: string;
  value: number | string;
}

export type ConstTypeEnumProp = Record<string, constTypeProp>;
