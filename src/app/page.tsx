import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Link href={'/auth'}>
        Login
      </Link>
    </div>
  );
}
