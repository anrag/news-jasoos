import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineSettings } from "react-icons/md";
import Link from "next/link";
import { Button } from "antd";

function SideNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  return isScrolled == false ? (
    <header
      className={`bg-white dark:bg-slate-800 shadow-lg ${
        isScrolled ? "fixed top-0 w-full z-10" : ""
      }`}
    >
      <nav className="flex items-center justify-between flex-wrap p-3">
        <Link href={"/"} des passHref>
          <div className="flex items-center flex-shrink-0 mr-6">
            <span className="text-black dark:text-cyan-50 font-semibold text-xl tracking-tight">
              NEWS JASOOS
            </span>
          </div>
        </Link>
        <div className="block ">
          <div className="ml-1 mr-1">
            <Link href={"/aboutus"} des passHref>
              <button className="relative px-6 py-2 group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-orange-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-orange-700 group-hover:bg-orange-700"></span>
                <span className="relative text-orange-700 group-hover:text-indigo-100 ">
                  {" "}
                  <b>ABOUT US</b>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  ) : (
    <></>
  );
}

export default SideNavbar;
