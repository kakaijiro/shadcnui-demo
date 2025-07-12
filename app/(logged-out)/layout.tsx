import LightDarkToggle from "@/components/ui/light-dark-toggle";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center p-24 gap-4">
        {children}
      </div>
      <LightDarkToggle className="fixed right-1 top-1/2" />
    </>
  );
}
