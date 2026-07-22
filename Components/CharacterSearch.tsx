"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type CharacterImage = {
  storage_path: string;
  image_type: string;
};

export type Character = {
  id: string;
  name: string;
  description: string | null;
  character_images: CharacterImage[];
};

type CharacterSearchProps = {
  characters: Character[];
};

export default function CharacterSearch({
  characters,
}: CharacterSearchProps) {
  const [keyword, setKeyword] = useState("");

  const filteredCharacters = useMemo(() => {
    const searchWord = keyword.trim().toLowerCase();

    if (searchWord === "") {
      return characters;
    }

    return characters.filter((character) => {
      const name = character.name.toLowerCase();
      const description =
        character.description?.toLowerCase() ?? "";

      return (
        name.includes(searchWord) ||
        description.includes(searchWord)
      );
    });
  }, [characters, keyword]);

  return (
    <>
      <div className="mb-8">
        <label
          htmlFor="character-search"
          className="mb-2 block text-sm font-bold text-slate-300"
        >
          キャラクター検索
        </label>

        <div className="flex gap-3">
          <input
            id="character-search"
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="名前や説明を入力"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
          />

          {keyword !== "" && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="shrink-0 rounded-xl bg-slate-700 px-5 py-3 transition hover:bg-slate-600"
            >
              クリア
            </button>
          )}
        </div>

        <p className="mt-3 text-sm text-slate-400">
          {filteredCharacters.length}件見つかりました
        </p>
      </div>

      {filteredCharacters.length === 0 ? (
        <p className="rounded-xl bg-slate-900 p-6 text-slate-300">
          検索条件に一致するキャラクターはいません。
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCharacters.map((character, index) => {
            const mainImage = character.character_images[0];

            const imageSrc = mainImage?.storage_path
              ? mainImage.storage_path.startsWith("/") ||
                mainImage.storage_path.startsWith("http")
                ? mainImage.storage_path
                : `/${mainImage.storage_path}`
              : null;

            return (
              <article
                key={character.id}
                className="rounded-2xl bg-slate-900 p-4"
              >
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={`${character.name}の画像`}
                    width={400}
                    height={400}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="mb-4 h-56 w-full rounded-xl object-contain"
                  />
                )}

                <h2 className="mb-2 text-xl font-bold">
                  {character.name}
                </h2>

                <p className="text-sm leading-6 text-slate-300">
                  {character.description ?? ""}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}