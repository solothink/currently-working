// src/components/Breadcrumb.tsx
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { useRouter } from "next/navigation";

type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = (
    <HiChevronRight className="mx-2 text-neutral-500 dark:text-neutral-400" />
  ),
  className = "",
}) => {
  const router = useRouter();

  const handleClick = (href: string | undefined) => {
    if (href) router.push(href);
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1 ${className}`}
    >
      <button
        onClick={() => router.push("/")}
        className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline focus:outline-none"
        aria-label="Home"
      >
        <AiOutlineHome />
      </button>

      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {separator}
          <button
            onClick={() => handleClick(item.href)}
            className={`text-sm font-medium ${
              item.href
                ? "text-primary-600 dark:text-primary-400 hover:underline focus:outline-none"
                : "text-neutral-500 dark:text-neutral-400 cursor-default"
            } ${item.icon ? "flex gap-1 items-center" : ""}`}
            disabled={!item.href}
          >
            {item.icon && <span className="mr-1">{item.icon}</span>}
            {item.label}
          </button>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
