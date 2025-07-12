"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z
  .object({
    email: z.email(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
    dob: z.date().refine((date) => {
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteenYearsAgo;
    }, "You must be at least 18 years old"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.accountType !== "company" || data.companyName;
    },
    {
      message: "Company name is required",
      path: ["companyName"],
    }
  )
  .refine(
    (data) => {
      return (
        data.accountType !== "company" ||
        (data.numberOfEmployees && data.numberOfEmployees >= 1)
      );
    },
    {
      message: "Number of employees is required",
      path: ["numberOfEmployees"],
    }
  )
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not mach",
      path: ["passwordConfirm"],
    }
  );
//   .superRefine((data, ctx) => {
//     if (data.accountType === "company" && !data.companyName) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["companyName"],
//         message: "Company name is required",
//       });
//     }
//     if (
//       data.accountType === "company" &&
//       (!data.numberOfEmployees || data.numberOfEmployees < 1)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["numberOfEmployees"],
//         message: "Number of employees is required",
//       });
//     }
//   });

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  // zodResolver() links zod and react-form

  const handleSubmit = () => {
    console.log("sign up form was validated legitimately");
  };

  const accountType = form.watch("accountType");

  return (
    <>
      <Link href="/">
        <PersonStandingIcon size={50} />
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up for a new SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Company name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employees</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Employees"
                            min={0}
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => {
                  const dobFromDate = new Date();
                  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

                  return (
                    <FormItem className="flex flex-col pt-2">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="normal-case flex justify-between pr-1"
                            >
                              {field.value ? (
                                format(field.value, "MMMM dd, yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            defaultMonth={field.value}
                            selected={field.value}
                            onSelect={field.onChange}
                            fixedWeeks
                            weekStartsOn={1}
                            startMonth={dobFromDate}
                            captionLayout="dropdown"
                            disabled={[
                              {
                                after: new Date(),
                                before: dobFromDate,
                              },
                            ]}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Sign up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
