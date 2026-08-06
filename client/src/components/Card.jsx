import { useMemo } from "react";
import { cardToSymbols } from "../data/GenerateCards";

export default function Card({symbols , onSymbolClick}) {
  const cards = cardToSymbols(symbols);

  const sizes = useMemo(() => {
    return cards.map(() => 
      Math.floor(Math.random() * (100 - 40 + 1)) + 40
    );
  }, [symbols]);

  return (
    <div className="w-90 h-90 rounded-full bg-white shadow-2xl border-8 border-rose-200 p-8 flex flex-wrap justify-center items-center gap-5">
      {cards.map((symbol, index) => (
        <img 
          key={symbol.id}
          src={symbol.image}
          alt={symbol.name}
          loading="lazy"
          draggable={false}
          onClick={() => onSymbolClick(symbol.id)}
          style={{
            width: `${sizes[index]}px`,
            height: `${sizes[index]}px`,
          }}
          className="object-cover rounded-full cursor-pointer"
        />
      ))}
    </div>
  )
}