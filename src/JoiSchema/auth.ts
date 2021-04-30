import { object, string } from "joi";

export const authSchema = object({
  email: string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co"] },
    })
    .required(),
  password: string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
});

export const emailValidate = object({
  email: string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "co"] },
  }),
});
