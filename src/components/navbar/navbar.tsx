'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-10 w-full items-center gap-2 border-b border-neutral-200 px-2">
      <Image
        src="/assets/images-removebg-preview.png"
        alt="logo"
        width={24}
        height={24}
      />
      <div className="flex items-center">
        <Link
          href="/projects"
          className={`flex h-7 cursor-pointer items-center rounded-lg px-2 text-sm text-neutral-600 duration-150 hover:bg-neutral-100 ${pathname === '/projects' ? 'font-medium text-neutral-900' : ''}`}
        >
          Projets
        </Link>
        <Link
          href="/logs"
          className={`flex h-7 cursor-pointer items-center rounded-lg px-2 font-sans text-sm text-neutral-600 duration-150 hover:bg-neutral-100 ${pathname === '/logs' ? 'font-medium text-neutral-900' : ''}`}
        >
          Logs
        </Link>
      </div>
    </div>
  );
};

export { Navbar };
