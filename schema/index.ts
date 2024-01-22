import * as z from "zod";

export const UserSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const NovelSchema = z.object({
  title: z.string().min(1, { message: "Image is required" }),
  image: z.string().min(1, { message: "Image is required" }),
});
