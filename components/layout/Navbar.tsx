import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/home" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default async function Navbar() {
  return (
    <header>
      <nav aria-label="Main">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
