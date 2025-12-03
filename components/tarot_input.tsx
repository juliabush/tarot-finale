"use client";

import { useState, useEffect } from "react";
import tarotCards from "@/tarot-json/tarot-loop.json";
import TarotCardDisplay from "./tarot_card_display";
import ResponseModal from "./response_modal";
import { pickRandomCards } from "../lib/tarot_utils";
import { typeWriterAppend } from "../lib/typewriter";

export interface TarotCard {
  name: string;
  url: string;
}

const [question, setQuestion] = useState("");
const [response, setResponse] = useState<string | null>(null);
const [displayedText, setDisplayedText] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);

async function handleAsk() {
  if (!question.trim()) {
    setError("Please enter a question before asking.");
    return;
  }

  setError("");
  setLoading(true);
  setResponse(null);
  setDisplayedText("");
  setSelectedCards([]);

  const cards = pickRandomCards(tarotCards, 3);
  setSelectedCards(cards);

  const cardNames = cards.map((c) => c.name).join(", ");
  const prompt = `Question: ${question.trim()}${
    question.trim().endsWith("?") ? "" : "?"
  } 
Tarot cards drawn: ${cardNames}. Include these cards in your answer.`;

try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt }),
      });

      if (!res.body) throw new Error("No response body.");

      const queue: string[] = [];
      let fullText = "";
      let animationActive = true;

      async function runTypewriter() {
        while (animationActive) {
          if (queue.length > 0) {
            const nextChar = queue.shift()!;
            setDisplayedText((prev) => prev + nextChar);
          }
          await new Promise((r) => setTimeout(r, 0));
        }
      }