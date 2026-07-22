// components/TopPage.tsx

import Link from "next/link";

export default function TopPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm tracking-[0.3em] text-sky-300">
          ORIGINAL CHARACTER PORTAL
        </p>

        <h1 className="mb-6 text-5xl font-bold md:text-7xl">
          Character Portal
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-8 text-slate-300">
          オリジナルキャラクターたちのプロフィール、
          世界観、物語を紹介するポータルサイトです。
        </p>

        <Link
          href="/CharacterListPage"
          className="rounded-full bg-white px-8 py-4 font-bold text-slate-950 transition hover:bg-slate-200"
        >
          キャラクターを見る
        </Link>
      </section>
    </main>
  );
}