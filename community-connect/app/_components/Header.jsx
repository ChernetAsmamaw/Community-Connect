import React from "react";
import "../../public/logo.svg";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="bg-white shadow-sm flex justify-between items-center p-4">
      <div className="flex items-center gap-8 justify-between">
        <img src="/logo.svg" alt="Logo" />
        <h1 className="text-primary text-2xl font-bold ">CConnect</h1>
        <div className="md:flex space-x-4 items-center gap-6 hidden">
          <h2 className="hover:text-primary cursor-pointer">Home</h2>
          <h2 className="hover:text-primary cursor-pointer">Services</h2>
          <h2 className="hover:text-primary cursor-pointer">About</h2>
        </div>
      </div>
      <div className="">
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
