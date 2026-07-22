import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Character } from "@/types/Character";

export const dynamic = "force-dynamic";

type HomeProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  // URLの「?q=検索文字」から検索条件を取得
  const params = await searchParams;

  const searchCondition = Array.isArray(params.q)
    ? params.q[0] ?? ""
    : params.q ?? "";

  const keyword = searchCondition.trim();

  // まず基本となるSELECT文を作成
  let query = supabase
    .from("characters")
    .select(`
      id,
      name,
      description,
      character_images!inner (
        storage_path,
        image_type
      )
    `)
    .eq("character_images.image_type", "main")
    .order("id", { ascending: true });

  // 検索条件が入力されている場合だけWHERE条件を追加
  if (keyword !== "") {
    query = query.or(
      `name.ilike.%${keyword}%,description.ilike.%${keyword}%`
    );
  }

  // ここでクエリを実行
  const { data, error } = await query;

  if (error) {
    console.error(error);

    return (
      <main className="p-8">
        <p>キャラクター情報の取得に失敗しました。</p>
        <p className="mt-2 text-sm">
          {error.message}
        </p>
      </main>
    );
  }

  const characters = (data ?? []) as Character[];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold">
          Characters
        </h1>

        {/* 検索フォーム */}
        <form
          action="/CharacterListPage"
          method="GET"
          className="mb-8 flex gap-3"
        >
          <input
            type="search"
            name="q"
            defaultValue={keyword}
            placeholder="名前または説明を検索"
            className="
              w-full
              rounded-xl
              border
              border-slate-600
              bg-slate-900
              px-4
              py-3
              text-white
              outline-none
              placeholder:text-slate-500
              focus:border-sky-400
            "
          />

          <button
            type="submit"
            className="
              shrink-0
              rounded-xl
              bg-sky-600
              px-6
              py-3
              font-bold
              transition
              hover:bg-sky-500
            "
          >
            検索
          </button>

          {keyword !== "" && (
            <Link
              href="/CharacterListPage"
              className="
                shrink-0
                rounded-xl
                bg-slate-700
                px-6
                py-3
                transition
                hover:bg-slate-600
              "
            >
              クリア
            </Link>
          )}
        </form>

        {keyword !== "" && (
          <p className="mb-6 text-sm text-slate-400">
            「{keyword}」の検索結果：
            {characters.length}件
          </p>
        )}

        {characters.length === 0 ? (
          <p className="rounded-xl bg-slate-900 p-6">
            {keyword === ""
              ? "公開中のキャラクターはいません。"
              : "検索条件に一致するキャラクターはいません。"}
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {characters.map((character, index) => {
              const mainImage =
                character.character_images[0];

              return (
                <article
                  key={character.id}
                  className="rounded-3xl bg-slate-600 p-6"
                >
                  {mainImage?.storage_path && (
                    <Image
                      src={mainImage.storage_path}
                      alt={`${character.name}の画像`}
                      width={600}
                      height={600}
                      loading={
                        index === 0 ? "eager" : "lazy"
                      }
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="mb-8 h-70 w-full rounded-xl object-contain"
                    />
                  )}

                  <h2 className="mb-3 text-xl font-bold">
                    {character.name}
                  </h2>

                  <p className="leading-5 text-slate-300">
                    {character.description ?? ""}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}