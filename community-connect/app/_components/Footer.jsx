import React from "react";

function Footer() {
  return (
    <footer className="bg-green-100 text-primary italic font-bold py-4 border border-t-2 border-gray-200 shadow-md w-full">
      <div className="container mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Community Connect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
