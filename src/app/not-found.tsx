import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="spec-mono text-brass-marker">404</p>
      <h1 className="mt-2 font-display text-4xl">Page not found</h1>
      <p className="mt-4 text-northline-steel">
        That route is not part of the Northline Kitchen Goods catalog.
      </p>
      <Link href="/" className="mt-6 inline-block text-tempered-blue underline focus-ring">
        Return home
      </Link>
    </div>
  );
}
