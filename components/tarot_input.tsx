"use client";

import { useState } from "react";
import { TarotCard } from "./tarot_input";

export default function TarotInput() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  return <div className="flex flex-col items-center w-full"></div>;
}
