import { ChevronLeft, Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { Button } from "~/app/_components/ui/button/button";

import { signOut } from "~/app/auth-client";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <AnimatePresence>
      {!isOpen ? (
        <Button
          className="md:p-4 p-2 text-white"
          icon={<Menu aria-hidden="true" focusable="false" />}
          kind="iconOnly"
          label={isOpen ? "close the sidebar" : "open the sidebar"}
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <motion.aside
          animate={{ opacity: 1, width: "auto" }}
          className="flex flex-col h-full border-r border-slate-600 bg-slate-900 text-slate-50 shadow-md overflow-auto"
          exit={{ opacity: 0, width: 0 }}
          initial={{ opacity: 0, width: 0 }}
          key="sidebar-aside"
          transition={{
            width: { type: "spring", damping: 25, stiffness: 250 },
            opacity: { duration: 0.15, ease: "easeOut" },
          }}
        >
          <div className="flex justify-end">
            <Button
              icon={<ChevronLeft aria-hidden="true" className="text-white" focusable="false" />}
              kind="iconOnly"
              label={isOpen ? "close the sidebar" : "open the sidebar"}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <div className="flex flex-col h-full justify-between md:p-4 p-2">
            <ul className="md:px-10 px-2">
              <li className="py-1">
                <Link className="hover:underline" href="/">
                  Dashboard
                </Link>
              </li>
              <li className="py-1">
                <Link className="hover:underline" href="/vendingMachine">
                  Vending Machines
                </Link>
              </li>
              <li className="py-1">
                <Link className="hover:underline" href="/location">
                  Locations
                </Link>
              </li>
              <li className="py-1">Companies</li>
              <li className="py-1">Contacts</li>
            </ul>
            <div className="flex md:justify-end justify-center mt-2">
              <Button label="Sign Out" onClick={() => signOut()} />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
