"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
};
export default function MenuItem({ children, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground",
        isActive &&
          "bg-pink-500 hover:bg-pink-400 dark:bg-pink-500 dark:hover:bg-pink-400 hover:text-primary-foreground text-primary-foreground"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
