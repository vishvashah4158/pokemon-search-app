"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean).splice(1);

  return (
    <nav className="flex px-6 py-4 text-gray-600 text-sm bg-white/50 backdrop-blur-sm rounded-lg shadow-sm mb-4">
      <Link href="/" className="hover:text-gray-900">
        Home
      </Link>
      {paths.map((path, index) => (
        <div key={path}>
          <span className="mx-2">&gt;</span>
          <span
            className="capitalize hover:text-gray-900"
          >
            {path}
          </span>
        </div>
      ))}
    </nav>
  );
}
