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
        <div className="py-2">
          <Button
            icon={<Menu aria-hidden="true" focusable="false" />}
            iconOnly
            label={isOpen ? "close the sidebar" : "open the sidebar"}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      ) : (
        <motion.aside
          animate={{ opacity: 1, width: "auto" }}
          className="flex flex-col border border-white bg-white/7 py-2"
          exit={{ opacity: 0, width: 0 }}
          initial={{ opacity: 0, width: 0 }}
          key="sidebar-aside"
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
        >
          <div className="flex justify-end">
            <Button
              icon={<ChevronLeft aria-hidden="true" focusable="false" />}
              iconOnly
              label={isOpen ? "close the sidebar" : "open the sidebar"}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <div className="flex flex-col grow justify-between">
            <ul className="px-16 py-4">
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
            <div className="flex justify-end">
              <Button label="Sign Out" onClick={() => signOut()} />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
