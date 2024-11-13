import React from "react";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BellIcon, Search } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full px-4 md:px-8 py-4 bg-primary-foreground">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1">
          <SidebarTrigger />
        </div>
        <div className="flex gap-2 md:gap-6 items-center">
          <div className="md:hidden">
            <Image src="logo.svg" alt="logo" width={50} height={50} />
          </div>
          <div className="flex relative">
            <Input
              className="lg:w-[250px] pl-10"
              placeholder="Search any movies or series"
            />
            <Search className="absolute top-[11px] left-2 size-[18px] text-muted-foreground " />
          </div>
          <div className="hidden md:block">
            <BellIcon />
          </div>
          <Avatar className="size-7 lg:size10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
