import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from 'react-icons/fa';

function SideNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuVisible,setisMenuVisible] = useState(false);
  useEffect(() => {
    console.log(window.innerWidth);
    if(window.innerWidth > 900) setisMenuVisible(true)
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
  const showMenu = () => {
    setisMenuVisible(!isMenuVisible)
  }
  return isScrolled == false ? (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          News Jasoos
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => showMenu()}
          className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
        >
          <FaBars className="h-5 w-5" />
        </button>
      </div>
      {isMenuVisible && (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Crime
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              Cricket
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white"
            >
              IPL
            </a>
          </div>
          <div>
            <Link href="/aboutus">
              <div
                style={{ cursor: "pointer" }}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0"
              >
                About Us
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  ) : (
    <></>
  );
}

export default SideNavbar;
