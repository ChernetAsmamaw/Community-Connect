"use client";

import React from "react";
import "../../public/logo.svg";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { data } = useSession();
  useEffect(() => {
    if (data) {
      //console.log(data);
    }
  }, [data]);

  return (
    <div className="bg-white shadow-sm flex justify-between items-center p-4 mx-3">
      <div className="flex items-center gap-8 justify-between">
        <img src="/logo.svg" alt="Logo" style={{ marginRight: "-25px" }} />
        <h1 className="text-primary text-2xl font-bold ">Connect</h1>
        <div className="md:flex space-x-4 items-center gap-6 hidden">
          <Link href={"/"}>
            <h2 className="hover:text-primary cursor-pointer">Home</h2>
          </Link>
          <Link href={"/about"}>
            <h2 className="hover:text-primary cursor-pointer">About</h2>
          </Link>
        </div>
      </div>
      <div className="">
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data.user.image}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/mybooking"}>My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/mymessages"}>My Messages</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/create-business"}>Create Business</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("descope")}>Sign In</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
