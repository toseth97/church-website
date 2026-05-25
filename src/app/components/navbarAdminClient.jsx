"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarAdminClient() {
  const [hasAdmin, setHasAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => r.json())
      .then((d) => setHasAdmin(!!d?.ok))
      .catch(() => setHasAdmin(false));
  }, []);

  if (!hasAdmin) return null;

  return (
    <li>
      <Link
        href="/admin/dashboard"
        className="
          relative cursor-pointer
          after:absolute after:left-0 after:-bottom-2
          after:h-[2px] after:w-0 after:bg-[#F2C79B]
          after:transition-all after:duration-300
          hover:after:w-full hover:text-white
        "
      >
        Admin
      </Link>
    </li>
  );
}
