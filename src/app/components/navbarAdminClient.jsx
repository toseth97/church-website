"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarAdminClient() {
  const [hasAdmin, setHasAdmin] = useState(false);

  useEffect(() => {
    // Check if the admin cookie exists (client-side helper)
    // We can't read httpOnly cookie values; the endpoint will tell us.
    fetch("/api/admin/status")
      .then((r) => r.json())
      .then((d) => setHasAdmin(!!d?.ok))
      .catch(() => setHasAdmin(false));
  }, []);

  if (!hasAdmin) return null;

  return (
    <li>
      <Link
        href="/admin/live"
        className="relative cursor-pointer after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#F2C79B] after:transition-all after:duration-300 hover:after:w-full"
      >
        Admin
      </Link>
    </li>
  );
}

