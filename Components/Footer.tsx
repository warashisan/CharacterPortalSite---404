import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-400">
          © {currentYear} Character Portal
        </p>

        <nav aria-label="フッターメニュー">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                トップ
              </Link>
            </li>

            <li>
              <Link
                href="/characters"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                キャラクター
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}