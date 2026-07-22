import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide"
        >
          Character Portal
        </Link>

        <nav aria-label="メインメニュー">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                トップ
              </Link>
            </li>

            <li>
              <Link
                href="/CharacterListPage"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                キャラクター
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}