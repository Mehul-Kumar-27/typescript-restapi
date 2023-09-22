import { TypeOf, object, string } from "zod";

export const userSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Length of the password must be 6"),
    passwordConformation: string({
      required_error: "Password Conformation is Required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email !!"),
  }).refine((data) => data.password == data.passwordConformation, {
    message: "Password Do not match",
    path: ["passwordConformation"],
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof userSchema>, "body.passwordConformation">;
