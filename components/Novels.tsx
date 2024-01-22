"use client";

import * as z from "zod";
import { GET_NOVELS } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
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
import { Button } from "./ui/button";
import { ADD_NOVEL } from "../graphql/mutations";
import { Novel } from "./Novel";

export const Novels = () => {
  const { data, loading, error } = useQuery(GET_NOVELS);
  const [addNovel] = useMutation<z.infer<typeof NovelSchema>>(ADD_NOVEL);
  const [isPending, startTransaction] = useTransition();

  const form = useForm<z.infer<typeof NovelSchema>>({
    resolver: zodResolver(NovelSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  if (loading) {
    return <p className="flex items-center justify-center">Loading ...</p>;
  }

  if (error) {
    <p className="flex items-center justify-center">
      Opps! Something went wrong ...
    </p>;
  }

  const novels: INovel[] = data?.novels;

  const onSubmit = (values: z.infer<typeof NovelSchema>) => {
    startTransaction(async () => {
      const { title, image } = values;
      await addNovel({ variables: { title, image } });
    });
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
          <Button type="submit" className="flex mt-8" disabled={isPending}>
            Add Novel
          </Button>
        </form>
      </Form>
      <div className="grid grid-cols-4 gap-2">
        {novels.map((novel) => (
          <Novel key={novel.id} novel={novel} />
        ))}
      </div>
    </div>
  );
};
