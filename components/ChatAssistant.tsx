"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import type { ChatMessage } from "@/lib/types";

// ─── Knowledge base & keyword matching ───────────────────────────────────────

const KB: { keywords: string[]; response: string }[] = [
  {
    keywords: ["prix", "combien", "tarif", "coûte", "coute", "cher"],
    response:
      "Nos tables débutent à partir de 890 € pour une pièce standard. Le prix final dépend de la forme, du motif de zellige, du style de pieds et de la taille. Vous pouvez composer votre pièce directement sur notre configurateur pour obtenir un prix précis. Nous proposons aussi le paiement en 3× sans frais avec Alma.",
  },
  {
    keywords: ["livraison", "délai", "delai", "expédition", "expedition", "quand", "recevoir"],
    response:
      "Chaque pièce est fabriquée à la main à Fès. Les délais habituels sont de 6 à 8 semaines après confirmation de commande. La livraison est offerte en France métropolitaine et dans toute l'Union Européenne. Un suivi en temps réel de votre fabrication vous est fourni depuis votre espace client.",
  },
  {
    keywords: ["retour", "rembours", "remboursement", "annul", "échange"],
    response:
      "Vous disposez de 14 jours à compter de la réception pour retourner un article. Les pièces configurées sur mesure ne peuvent pas être remboursées car elles sont créées spécifiquement pour vous. Pour les pièces du catalogue standard, le retour est gratuit en France. Contactez-nous à contact@maisonattar.com pour initier un retour.",
  },
  {
    keywords: ["zellige", "matière", "matiere", "carreaux", "céramique", "ceramique", "terre"],
    response:
      "Nos zelliges sont taillés à la main à Fès par nos maalems à partir de terres argileuses locales. Chaque carreau est coupé individuellement au marteau et au burin selon des techniques transmises depuis des siècles. Nous travaillons avec 6 motifs principaux : Écaille, Géométrique, Damier, Étoile, Arabesque et Uni Lisse. La surface émaillée est résistante aux taches et à l'humidité.",
  },
  {
    keywords: ["fabrication", "fait main", "artisan", "maalem", "atelier", "comment"],
    response:
      "Chaque table Maison Attar est réalisée entièrement à la main dans nos ateliers de Fès el-Bali. Le processus comprend : la taille individuelle de chaque zellige au marteau et burin, la mise en mosaïque, le coulage du mortier, puis la forge ou le travail de la structure métallique. L'ensemble représente entre 40 et 80 heures de travail artisanal. Vous pouvez suivre les étapes de fabrication depuis votre espace client avec des photos envoyées par votre maalem.",
  },
  {
    keywords: ["paiement", "alma", "3x", "trois fois", "virement", "carte", "stripe"],
    response:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, Amex) via Stripe, ainsi que le virement bancaire. Nous proposons également le paiement en 3× sans frais pour toute commande de plus de 400 € grâce à notre partenaire Alma. Vous pouvez sélectionner cette option au moment du checkout.",
  },
  {
    keywords: ["entretien", "nettoyer", "nettoyage", "entretenir", "produit", "tache"],
    response:
      "L'entretien du zellige est très simple : un simple coup d'éponge humide suffit pour le quotidien. Évitez les produits acides (vinaigre, citron) et les nettoyants abrasifs. Pour les taches tenaces, utilisez un savon de Castille dilué. La structure en acier peut être légèrement huilée une fois par an pour préserver sa finition. Évitez toute exposition prolongée à l'humidité intense pour les finitions non inoxydables.",
  },
  {
    keywords: ["cgv", "conditions", "mention", "légal", "legal", "politique", "confidentialité"],
    response:
      "Vous pouvez consulter nos Conditions Générales de Vente, notre politique de confidentialité et nos mentions légales en bas de chaque page de notre site. Pour toute question juridique ou commerciale, contactez-nous à contact@maisonattar.com ou au +33 1 XX XX XX XX.",
  },
  {
    keywords: ["garantie", "warranty"],
    response:
      "Toutes nos pièces sont garanties 2 ans contre les défauts de fabrication, conformément à la législation européenne. Le zellige étant un matériau naturel, de légères variations de teinte et des micro-irrégularités de surface font partie de son caractère artisanal et ne constituent pas des défauts.",
  },
  {
    keywords: ["sur mesure", "personnalisé", "personnalise", "custom", "dimension"],
    response:
      "Oui, nous réalisons des pièces entièrement sur mesure selon vos dimensions exactes, le motif de votre choix, et la structure de votre imagination. Contactez-nous à contact@maisonattar.com pour discuter de votre projet. Notre équipe vous recontactera sous 24h ouvrées avec un devis détaillé.",
  },
  {
    keywords: ["configurateur", "configure", "composer", "créer", "creer", "design"],
    response:
      "Notre configurateur en ligne vous permet de composer votre table en choisissant la forme, la taille, le motif de zellige, le style de pieds et la couleur de la structure. Le prix se met à jour en temps réel. Rendez-vous sur /configurateur pour commencer votre création.",
  },
  {
    keywords: ["contact", "joindre", "email", "téléphone", "telephone", "appeler"],
    response:
      "Vous pouvez nous contacter par email à contact@maisonattar.com. Notre équipe répond sous 24h ouvrées. Vous pouvez aussi utiliser le formulaire de contact sur notre page Notre Histoire, ou directement sur les réseaux sociaux.",
  },
];

const QUICK_ACTIONS = [
  { label: "Nos produits",       text: "Quels sont vos produits et leurs prix ?" },
  { label: "Délais livraison",   text: "Quels sont les délais de livraison ?" },
  { label: "Paiement en 3×",     text: "Comment fonctionne le paiement en 3 fois ?" },
  { label: "Contacter un artisan", text: "Comment puis-je contacter un maalem ?" },
];

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Bonjour ! Je suis l'assistant Maison Attar. Comment puis-je vous aider ? Je peux vous renseigner sur nos produits, délais de fabrication, matières, paiement, livraison et bien plus.",
  timestamp: new Date(),
};

function findResponse(input: string): string {
  const normalized = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const entry of KB) {
    const normalizedKw = entry.keywords.map((k) =>
      k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
    if (normalizedKw.some((kw) => normalized.includes(kw))) {
      return entry.response;
    }
  }
  return "Je ne suis pas sûr de bien comprendre votre question. Pourriez-vous la reformuler ? Vous pouvez aussi nous contacter directement à contact@maisonattar.com — notre équipe vous répondra sous 24h ouvrées.";
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 max-w-[80%]">
      <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
        <span className="text-gold text-xs font-display font-semibold">M</span>
      </div>
      <div className="bg-warm-gray-light border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-ink-muted"
              style={{
                animation: `bounce 1.2s infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Chat Message ─────────────────────────────────────────────────────────────

function Message({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-full`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mb-0.5">
          <span className="text-gold text-xs font-display font-semibold">M</span>
        </div>
      )}
      <div
        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[78%] ${
          isUser
            ? "bg-ink text-cream rounded-br-sm"
            : "bg-warm-gray-light text-ink border border-border rounded-bl-sm"
        }`}
        style={{ wordBreak: "break-word" }}
      >
        {msg.content}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const open = useCallback(() => {
    setIsOpen(true);
    setHasOpened(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setShowQuickActions(false);
      setIsTyping(true);

      const delay = 500 + Math.random() * 600;
      setTimeout(() => {
        const response = findResponse(text);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage]
  );

  const handleQuickAction = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return (
    <>
      {/* CSS for bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196, 162, 101, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(196, 162, 101, 0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-panel-enter {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[9990]">
        {!isOpen && (
          <button
            onClick={open}
            aria-label="Ouvrir l'assistant Maison Attar"
            className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-lg hover:bg-gold-light transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              animation: !hasOpened ? "pulse-gold 2.5s ease-in-out infinite" : "none",
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        )}

        {/* Chat panel */}
        {isOpen && (
          <div
            ref={panelRef}
            className="chat-panel-enter w-[360px] sm:w-[400px] bg-cream rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: 500, maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-ink text-cream flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-white text-sm font-display font-semibold">M</span>
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight">Assistant Maison Attar</p>
                  <p className="text-xs opacity-50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                    En ligne
                  </p>
                </div>
              </div>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Fermer le chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <Message key={msg.id} msg={msg} />
              ))}

              {/* Quick actions after welcome */}
              {showQuickActions && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.text)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-cream hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-200 text-ink-light"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 border-t border-border bg-cream px-4 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // Auto-resize
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 72)}px`;
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question…"
                  rows={1}
                  className="flex-1 resize-none bg-warm-gray-light border border-border rounded-xl px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-gold transition-colors duration-200 leading-relaxed"
                  style={{ maxHeight: 72, minHeight: 40 }}
                  disabled={isTyping}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center flex-shrink-0 hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                  aria-label="Envoyer"
                >
                  <svg className="w-4 h-4 text-white rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-[11px] text-ink-muted mt-2 text-center">
                Appuyez sur Entrée pour envoyer · Maj+Entrée pour un saut de ligne
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
