import { Compass, BookOpen, Info } from "lucide-react";

export const navItems = [
  {
    label: "explore",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "documentation",
    href: "/documentation",
    icon: BookOpen,
  },
  {
    label: "about",
    href: "/about",
    icon: Info,
  },
];

const renderNavItems = (iconSize: number) =>
  navItems.map((item) => {
    const Icon = item.icon;

    return (
      <li key={item.href}>
        <a href={item.href}>
          <Icon size={iconSize} />
          <span>{item.label}</span>
        </a>
      </li>
    );
  });


export { renderNavItems }