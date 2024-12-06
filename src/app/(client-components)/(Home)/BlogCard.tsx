import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta";
import { PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";

export interface BlogCardProps {
  className?: string;
  post: PostDataType;
}

const BlogCard: FC<BlogCardProps> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage, desc, categories, postType } = post;

  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse rounded-[40px] group ${className}`}
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <CategoryBadgeList categories={categories} />
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              <Link href={href} className="line-clamp-2" title={title}>
                {title}
              </Link>
            </h2>
            <div className="hidden">
              <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                {desc}
              </span>
            </div>
          </div>

          <PostCardMeta meta={{ ...post }} />
        </div>
      </div>

      <div className={`block flex-shrink-0  rounded-3xl overflow-hidden mb-5`}>
        <Link
          href={href}
          className={`block w-full h-0 aspect-h-9  aspect-w-16 `}
        >
          <Image
            fill
            src={featuredImage}
            alt={title}
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <span>
            <PostTypeFeaturedIcon
              className="absolute left-2 bottom-2"
              postType={postType}
              wrapSize="w-8 h-8"
              iconSize="w-4 h-4"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
