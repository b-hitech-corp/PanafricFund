import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-brown/10 bg-cream/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">PanAfricFund</Link>
        <nav className="flex gap-5 text-sm">
          <Link href="/projects">Projects</Link>
          <Link href="/apply/founder">Founder Apply</Link>
          <Link href="/invest">Invest</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
