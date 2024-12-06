import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import Badge from "@/shared/Badge";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";

export interface CardCategoryBox1Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategoryBox1: FC<CardCategoryBox1Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, thumbnail, href = "/" } = taxonomy;
  return (
    <Link
      href={href}
      className={`nc-CardCategoryBox1 relative flex w-full flex-col  md:flex-row items-center p-3 sm:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
    >
      <Badge
        className="absolute  right-0 md:right-2 -top-1 md:top-2 z-10 text-xs"
        color="gray"
        name={convertNumbThousand(count)}
      />

      <div className="relative flex-shrink-0 w-14 h-14 md:w-24 md:h-24 rounded-full overflow-hidden">
        <Image
          src={thumbnail || ""}
          fill
          alt=""
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </div>
      <div className="text-center md:text-left md:ml-4 flex-grow overflow-hidden">
        <h2 className="text-xs md:text-base font-medium">
          <span className="line-clamp-1">{name}</span>
        </h2>
        {/* <span
          className={`block mt-2 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          19 minutes drive
        </span> */}
      </div>
    </Link>
  );
};

export default CardCategoryBox1;
