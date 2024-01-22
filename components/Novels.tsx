"use client";

import * as z from "zod";
import { GET_NOVELS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { INovel } from "@/typings";
import { FormEvent, useTransition } from "react";
import { useForm } from "react-hook-form";
import { NovelSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export const Novels = () => {
  const { data, loading, error } = useQuery(GET_NOVELS);
  const [isPending, startTransaction] = useTransition();

  const form = useForm<z.infer<typeof NovelSchema>>({
    resolver: zodResolver(NovelSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  if (loading) {
    return (
      <p className="text-white flex items-center justify-center">Loading ...</p>
    );
  }

  if (error) {
    <p className="text-white flex items-center justify-center">
      Opps! Something went wrong ...
    </p>;
  }

  const novels: INovel[] = data?.novels;

  const onSubmit = (values: z.infer<typeof NovelSchema>) => {
    startTransaction(async () => {});
  };

  return (
    <div className="mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex my-5 space-x-3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Novel name"
                    disabled={isPending}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Novel image"
                    disabled={isPending}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
