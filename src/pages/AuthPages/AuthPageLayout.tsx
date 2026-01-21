import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
       
        <div className="relative items-center hidden w-full h-full lg:w-[30%] bg-linear-to-t from-[#F5F5F5] to-white dark:bg-white/5 lg:grid">
        <img className="absolute top-0 w-full h-full" src="/images/grid-image/bg-auth.png"/>

        <img className="absolute bottom-0 w-[90%] mx-auto right-[50%] translate-x-[50%]" src="/images/grid-image/kids.png"/>
          <div className="relative flex h-full items-top justify-center z-1 pt-10">
       
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/auth-logo1.png"
                  alt="Logo"
                />
              </Link>
              <Link to="/" className="block mb-4 mt-8">
                <img
                  width={130}
                  height={48}
                  src="/images/logo/auth-logo2.png"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div> 
        {children}
      </div>
    </div>
  );
}
