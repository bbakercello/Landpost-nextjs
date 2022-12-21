import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import { motion } from "framer-motion";
const Login = () => {
  const { user, isLoading } = useUser();
  return (
    <div className="flex flex-col justify-center pl-2 pr-2">
      {!isLoading && !user && (
        <Link href="/api/auth/login" className="btn btn-primary btn-margin">
          Sign in
        </Link>
      )}
      {user && (
        <div >
          <div>
            <Menu>
              <Menu.Button className="text-slate-700 relative w-40">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 0, 8, -8, 0, 0],
                    transition: {
                      duration: 0.5,
                      times: [0, 0.2, 0.5, 0.8, 1],
                      ease: "easeInOut",
                    },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="h-10 w-10 relative"
                >
                  <Image
                    src={user.picture}
                    alt="Profile"
                    className="md:scale-125 nav-user-profile rounded-full shadow-lg"
                    width='40'
                    height='40' // required
                    objectFit="cover"
                    data-testid="navbar-picture-desktop"
                  />{" "}
                </motion.div>
              </Menu.Button>
              <Menu.Items className="text-neutral-100 rounded-lg flex flex-col bg-slate-900 absolute">
                <Menu.Item >
                  {({ active }) => <p> {user.name}</p>}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/Profile"
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item disabled>
                  <Link
                    href="/api/auth/logout"
                  >
                    Log out
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
