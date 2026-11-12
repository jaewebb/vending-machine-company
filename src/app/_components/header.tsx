import { Menu } from "lucide-react";

import { Button } from "~/app/_components/ui/button/button";

interface HeaderProps {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (sidebarIsOpen: boolean) => void;
}

export function Header({ sidebarIsOpen, setSidebarIsOpen }: HeaderProps) {
  return (
    <header>
      <Button
        icon={<Menu aria-hidden="true" focusable="false" />}
        iconOnly
        label={sidebarIsOpen ? "close the sidebar" : "open the sidebar"}
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
      />
    </header>
  );
}
