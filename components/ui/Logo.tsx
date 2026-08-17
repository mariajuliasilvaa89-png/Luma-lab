import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="focus-luma inline-flex h-12 w-[92px] items-center rounded-md sm:w-[100px]" aria-label="Luma Lab">
      <Image
        src="/images/luma-logo.png"
        alt="Luma Lab"
        width={4116}
        height={2805}
        sizes="(max-width: 640px) 92px, 100px"
        priority
        className="h-full w-full object-contain"
      />
    </Link>
  );
}
