import { cardToSymbols } from "../data/GenerateCards";

export default function Card({symbols}) {
  const cards = cardToSymbols(symbols);

  
  return (
    <div className="w-90 h-90 rounded-full bg-white shadow-2xl border-8 border-rose-200 p-8 flex flex-wrap justify-center items-center gap-5">
      {cards.map((symbol) => (
        <img 
          key= {symbol.id} 
          src={symbol.image} 
          alt={symbol.name} 
          loading="lazy"
          className="w-20 h-20 object-cover rounded-full"
        />
      ))}
    </div>
  )
}
