import { TarotCard } from "./tarot_input";

interface ResponseModalProps {
  question: string;
  displayedText: string;
  selectedCards: TarotCard[];
  loading: boolean;
  onClose: () => void;
}

export default function ResponseModal({
  question,
  displayedText,
  selectedCards,
  loading,
  onClose,
}: ResponseModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
      <div className="bg-white text-black rounded-3xl p-10 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"></div>
    </div>
  );
}
