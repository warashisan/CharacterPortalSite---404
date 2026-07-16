import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-800">
            <Image
              src="/character.jpg"
              alt="オリジナルキャラクターの立ち絵"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div>
            <p className="mb-3 text-sm tracking-widest text-sky-300">
              ORIGINAL CHARACTER
            </p>

            <h1 className="mb-4 text-5xl font-bold">
              キャラクター名
            </h1>

            <p className="mb-8 text-lg leading-8 text-slate-300">
              この場所にキャラクターの短い紹介文を記載します。
              どのような人物なのかを、初めて見る人にも伝わるように説明します。
            </p>

            <dl className="space-y-4 rounded-2xl bg-slate-900 p-6">
              <div>
                <dt className="text-sm text-slate-400">性格</dt>
                <dd>冷静だが、好奇心が強い</dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">能力</dt>
                <dd>月の光を集めて操る</dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">目的</dt>
                <dd>失われた月の欠片を探している</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}