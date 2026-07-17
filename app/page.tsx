import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Character = {
  id: number;
  name: string;
  description: string;
  image_path: string | null;
};

export default async function Home() {
  const { data, error } = await supabase
    .from("characters")
    .select("id, name, description, image_path")
    .eq("is_published", true)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);

    return (
      <main className="p-8">
        <p>キャラクター情報の取得に失敗しました。</p>
      </main>
    );
  }

  const characters = (data ?? []) as Character[];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-4xl font-bold">
          Characters
        </h1>

        {characters.length === 0 ? (
          <p>公開中のキャラクターはいません。</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {characters.map((character) => (
              <article
                key={character.id}
                className="rounded-3xl bg-slate-900 p-6"
              >
                {character.image_path && (
                  <Image
                    src={character.image_path}
                    alt={`${character.name}の画像`}
                    width={600}
                    height={600}
                    className="mb-6 h-80 w-full rounded-2xl object-contain"
                  />
                )}

                <h2 className="mb-3 text-3xl font-bold">
                  {character.name}
                </h2>

                <p className="leading-7 text-slate-300">
                  {character.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}