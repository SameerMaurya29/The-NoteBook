import * as Menu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy-loaded from Layout so the Radix menu and positioning code stay out of the entry bundle.
export default function MoreMenu({ items, triggerClass, isActive }) {
  return (
    <Menu.Root>
      <Menu.Trigger className={triggerClass} aria-label="More notebook pages">More <ChevronDown size={14} /></Menu.Trigger>
      <Menu.Portal>
        <Menu.Content align="end" sideOffset={8} className="z-50 min-w-44 rounded-md border border-brown/30 bg-paper p-1.5 text-ink shadow-lg">
          {items.map((n) => <Menu.Item key={n.to} asChild><Link to={n.to} aria-current={isActive(n.to) ? "page" : undefined} className="block whitespace-nowrap rounded-sm px-3 py-2 text-sm text-brown outline-none focus:bg-paper-2 focus:text-ink">{n.label}</Link></Menu.Item>)}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
