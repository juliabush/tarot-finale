import { TarotCard } from "./tarot_input";

export default function TarotCardDisplay({
  selectedCards,
}: {
  selectedCards: TarotCard[];
}) {
  return (
    <div className="flex justify-center gap-6 mb-6 flex-wrap">
      {selectedCards.map((card) => (
        <div key={card.name}>
          <img src={card.url} alt={card.name} />
          <span>{card.name}</span>
        </div>
      ))}
    </div>
  );
}
