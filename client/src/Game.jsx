export default function Game() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg px-6 py-4">
            <p className="text-gray-500 text-sm">Toi</p>
            <p className="text-3xl font-bold text-rose-600">5</p>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-rose-600">
              ♥ Dobble Love ♥
            </h1>

            <p className="text-gray-500 mt-2">
              Trouve le symbole commun !
            </p>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg px-6 py-4">
            <p className="text-gray-500 text-sm">Mon amour</p>
            <p className="text-3xl font-bold text-rose-600">4</p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-full bg-white shadow-2xl border-8 border-rose-200 p-8 flex flex-wrap justify-center items-center gap-5">

              <button className="text-5xl hover:scale-125 transition">
                🌸
              </button>

              <button className="text-5xl hover:scale-125 transition">
                🩷
              </button>

              <button className="text-5xl hover:scale-125 transition">
                🐱
              </button>

              <button className="text-5xl hover:scale-125 transition">
                ☀️
              </button>

              <button className="text-5xl hover:scale-125 transition">
                🍓
              </button>

              <button className="text-5xl hover:scale-125 transition">
                🌙
              </button>

              <button className="text-5xl hover:scale-125 transition">
                🎀
              </button>

              <button className="text-5xl hover:scale-125 transition">
                💖
              </button>

            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-full bg-white shadow-2xl border-8 border-rose-200 p-8 flex flex-wrap justify-center items-center gap-5">

              <div className="text-5xl">☀️</div>
              <div className="text-5xl">🦋</div>
              <div className="text-5xl">🌷</div>
              <div className="text-5xl">🍒</div>
              <div className="text-5xl">🐰</div>
              <div className="text-5xl">🎈</div>
              <div className="text-5xl">✨</div>
              <div className="text-5xl">🍀</div>

            </div>
          </div>

        </div>

        <div className="mt-10 flex justify-center">
          <div className="rounded-full bg-white/70 backdrop-blur-xl px-8 py-3 shadow-lg">
            <p className="text-rose-600 font-medium">
              Temps restant : 15 s
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}