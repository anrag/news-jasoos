import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineSettings } from "react-icons/md";
import Link from "next/link";

function SideNavbar() {
  return (
    <div className="md:hidden ">
      <Disclosure as="nav">
        <Disclosure.Button
          aria-label="menu-navigation"
          className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
        >
          <GiHamburgerMenu
            className="text-black dark:text-slate-100 block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="bg-white dark:bg-slate-800 p-6 w-1/1 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <Link href={"/"} passHref>
              <h1 className="text-base text-black dark:text-slate-100 text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                News Jasoos
              </h1>
            </Link>
            {/* <div className=" my-4 border-b border-gray-100 pb-4"> */}
            {/* <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <GiAk47U className="text-black dark:text-slate-100 text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-black dark:text-slate-100 text-gray-800 group-hover:text-white font-semibold ">
                  Crime
                </h3>
              </div> */}
            {/* <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiCameraMovie className="text-black dark:text-slate-100 text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-black dark:text-slate-100 text-gray-800 group-hover:text-white font-semibold ">
                  Movie
                </h3>
              </div> */}
            {/* <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdSportsCricket className="text-black dark:text-slate-100 text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-black dark:text-slate-100 text-gray-800 group-hover:text-white font-semibold ">
                  Sports
                </h3>
              </div> */}
            {/* <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Analytics
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Messages
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Integration
                </h3>
              </div> */}
            {/* </div> */}
            {/* setting  */}
            <div className=" my-4 border-b border-gray-100 pb-4">
              <Link href={"/aboutus"} passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  {/* <MdOutlineSettings className="text-black dark:text-slate-100 text-2xl text-gray-600 group-hover:text-white " /> */}
                  <p className="text-black dark:text-slate-100 text-base text-gray-800 group-hover:text-white font-semibold ">
                    About Us
                  </p>
                </div>
              </Link>

              {/* <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FcContacts className="text-black dark:text-slate-100 text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-black dark:text-slate-100 text-base text-gray-800 group-hover:text-white font-semibold ">
                  Contact Us
                </h3>
              </div> */}
            </div>
            {/* logout */}
            {/* <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div> */}
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
