export interface User {
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  eyeColor: EyeColor;
}
export enum EyeColor {
  Brown,
  Hazel,
  Green,
  Blue,
  Gray,
}
