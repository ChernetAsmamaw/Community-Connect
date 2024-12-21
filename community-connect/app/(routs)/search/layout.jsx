import React from "react";
import CategoriesSideBar from "./_components/CategoriesSideBar";

function layout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 mt-8 gap-2 lg:mx-12 md:mx-4">
          <div className="hidden md:block col-span-1">
            {/* Side Category Nav Bar */}
            <CategoriesSideBar />
          </div>
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default layout;
