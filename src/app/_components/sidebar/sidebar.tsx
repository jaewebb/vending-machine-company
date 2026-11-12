import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return !isOpen ? null : (
    <AnimatePresence>
      <motion.aside
        animate={{ x: 0 }}
        className="border border-white bg-white/7 md:w-1/6 w-full px-10 py-5"
        exit={{ x: "-100%" }}
        initial={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 250 }}
      >
        <ul>
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
      </motion.aside>
    </AnimatePresence>
  );
}
