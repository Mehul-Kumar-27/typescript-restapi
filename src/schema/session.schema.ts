import { object, string } from "zod";

export const sessionSchema = object({
  body: object({
    email: string({
      required_error: "Email Is necessary",
    }),
    password: string({
      required_error: "Password Is Required",
    }),
  }),
});
