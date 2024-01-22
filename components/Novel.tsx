import { INovel } from "@/typings";

type NovelProps = {
  novel: INovel;
};

export const Novel = ({ novel }: NovelProps) => {
  return <div>{novel.title}</div>;
};
