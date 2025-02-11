import Code from "@/components/Code";
import Markdown from "markdown-to-jsx";
import { getPostContent, getAllPostsMetadata } from "@/utils/fileOperations";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const generateStaticParams = async () => {
  const posts = getAllPostsMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({ params, searchParams }) {
  const id = params?.slug ? " - " + params?.slug : "";
  return {
    title: `Ilc Blog ${id.replaceAll("_", " ")}`,
  };
}

export default function PostPage(props) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  const postDate = post.data.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="post-page">
      <div className="container">
        <div className="header">
          <p className="date">{postDate}</p>
          <h1 className="title">{post.data.title}</h1>
          <p className="description">{post.data.description}</p>
          <p className="author">{post.data.author}</p>
        </div>
      </div>
      <div className="reading-container">
        <article className="content">
          <Markdown
            options={{
              overrides: {
                code: {
                  component: Code,
                  props: {
                    showLineNumbers: true,
                  },
                },
              },
            }}
          >
            {post.content}
          </Markdown>
        </article>
        <div className="tags">
          {post.data.tags.map((tag) => (
            <Link href={`/tag/${tag}`} className="tag" key={tag}>
              {tag.replaceAll("_", " ")}
            </Link>
          ))}
        </div>
      </div>

      <div className="background-ambiance">
        <img
          src={
            post.data.thumbnail
              ? post.data.thumbnail
              : "/assets/default_bg_ambiance.jpg"
          }
        />
      </div>
    </main>
  );
}
