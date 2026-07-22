import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Character_Image = {
  storage_path:string;
  image_type:string;
}

type Character = {
  id: string;
  name: string;
  description: string;
  character_images:Character_Image[];
};

export default async function Home() {
  const { data, error } = await supabase
    .from("characters")
    .select(`
      id,
      name,
      description,
      character_images!inner(storage_path,image_type)
    `)
    .eq("character_images.image_type","main")
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
                {character.character_images[0].storage_path!=null && (
                  <Image
                    src={character.character_images[0].storage_path}
                    alt={`${character.name}の画像`}
                    width={600}
                    height={600}
                    loading="eager"
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