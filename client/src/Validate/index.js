import z from 'zod'

export const signupSchema = z.object({
    firstName: z.string().trim().min(2, {message: "First name must be atleast 2 characters."}).max(20, {message: "Username must be atmost 20 characters."}).regex(/^[a-zA-Z]+$/, {message: "Only letters are allowed"}),
    lastName: z.string().trim().min(2, {message: "Last name must be atleast 2 characters."}).max(20, {message: "Username must be atmost 20 characters."}).regex(/^[a-zA-Z]+$/, {message: "Only letters are allowed"}),
    userName: z.string().trim().min(3, {message: "Username must be atleast 3 characters."}).max(15, {message: "Username must be atmost 15 characters."}),
    email: z.string().trim().email({message: "Invalid email address."}),
    password: z.string().trim().min(6, {message: "Password must be atleast 6 characters."}).max(15, {message: "Password must be atmost 15 characters."}),
    confirmPassword: z.string().trim().min(6, {message: "Password must be atleast 6 characters."}).max(15, {message: "Password must be atmost 15 characters."}),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
    email: z.string().trim().email({message: "Invalid email address."}),
    password: z.string().trim().min(6, {message: "Password must be atleast 6 characters."}).max(15, {message: "Password must be atmost 15 characters."}),
})