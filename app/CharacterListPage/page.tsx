import Image from "next/image";
import { supabase } from "@/lib/supabase";
import CharacterSearch from "@/Components/CharacterSearch";

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
          <div className="grid gap-3 md:grid-cols-3">
            {characters.map((character) => (
              <article
                key={character.id}
                className="rounded-3xl bg-slate-600 p-6"
              >
                {character.character_images[0].storage_path!=null && (
                  <Image
                    src={character.character_images[0].storage_path}
                    alt={`${character.name}の画像`}
                    width={600}
                    height={600}
                    loading="eager"
                    className="mb-8 h-70 w-full rounded-xl object-contain"
                  />
                )}

                <h2 className="mb-3 text-xl font-bold">
                  {character.name}
                </h2>

                <p className="leading-4 text-slate-300">
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