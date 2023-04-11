export const baseUrl = "/base-url";

export interface constTypeProp {
  text: string;
  value: number | string;
}

export type ConstTypeEnumProp = Record<string, constTypeProp>;
