import React, { FC } from "react";
import Heading from "@/shared/Heading";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import BlogCard from "./BlogCard";

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 11);
//
export interface BlogPostsProps {
  posts?: PostDataType[];
  className?: string;
  postCardName?: "card3";
}

const BlogPosts: FC<BlogPostsProps> = ({
  posts = postsDemo,
  postCardName = "card3",
  className = "",
}) => {
  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
      case "card3":
        return <BlogCard key={post.id} className="" post={post} />;

      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full ">
          <Heading>Latest Articles 🎈</Heading>
          <div className={`grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3`}>
            {posts.map((post) => renderCard(post))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
