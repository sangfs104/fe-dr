"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Send,
  Loader2,
  Tag,
  Shirt,
  Stars,
  X,
  ChevronDown,
  ChevronUp,
  Bot,
  User,
  Zap,
  Heart,
  ShoppingBag,
  Palette,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PlayCircle,
  PauseCircle,
  Settings,
  Minimize2,
  Maximize2,
  Headphones,
} from "lucide-react";

// ---------------------------------------------
// Types matching your Laravel API responses
// ---------------------------------------------

type ApiVariant = {
  id: number;
  product_id?: number;
  img_id?: number | null;
  size?: string | null;
  color?: string | null;
  price?: number | null;
  sale_price?: number | null;
  stock_quantity?: number | null;
  status?: number | null;
};

type ApiCategory = {
  id?: number | null;
  name?: string | null;
};

type ApiProductBasic = {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  images: string[] | null;
};

type ApiProductFull = {
  id: number;
  name: string;
  description?: string | null;
  images: string[] | null;
  variant?: ApiVariant[];
  category?: ApiCategory;
};

type ApiResponse = {
  message?: string | null;
  style_name?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  products?: (ApiProductBasic | ApiProductFull)[] | null;
  mix_and_match?: string[] | null;
};

// ---------------------------------------------
// Chat UI Types
// ---------------------------------------------

type ChatRole = "user" | "assistant" | "system";

type ChatAttachment = {
  kind: "style";
  style_name?: string | null | undefined;
  description?: string | null | undefined;
  keywords?: string[] | null | undefined;
  products?: (ApiProductBasic | ApiProductFull)[] | null | undefined;
  mix_and_match?: string[] | null | undefined;
};

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  attachment?: ChatAttachment;
  timestamp?: number;
  audioUrl?: string;
  isPlaying?: boolean;
};

type VoiceSettings = {
  enabled: boolean;
  rate: number;
  pitch: number;
  volume: number;
  voice: string | null;
  autoSpeak: boolean;
};

// ---------------------------------------------
// Speech Recognition Types
// ---------------------------------------------

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Extend Window interface to avoid `any` for SpeechRecognition
interface ExtendedWindow {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

// ---------------------------------------------
// Utilities
// ---------------------------------------------

function clsx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}

function formatPrice(p?: number | null): string {
  if (p == null) return "";
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(p);
  } catch {
    return `${p}`;
  }
}

function formatTime(timestamp: number): string {
  const now = Date.now();
  const messageTime = new Date(timestamp);
  const diffMs = now - messageTime.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)} giờ trước`;
  return messageTime.toLocaleDateString("vi-VN");
}

// Hàm merge triệt để để gộp mảng ApiResponse thành một object, tránh lặp array
function mergeResponses(responses: ApiResponse[]): ApiResponse {
  return responses.reduce((acc, curr) => {
    const merged: ApiResponse = { ...acc };
    Object.entries(curr).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        switch (key) {
          case "keywords":
          case "mix_and_match":
            const currentKeywords = merged[
              key as "keywords" | "mix_and_match"
            ] as string[] | null | undefined;
            const newKeywords = value as string[];
            merged[key as "keywords" | "mix_and_match"] = Array.from(
              new Set([...(currentKeywords || []), ...newKeywords])
            );
            break;
          case "products":
            const currentProducts = merged.products as
              | (ApiProductBasic | ApiProductFull)[]
              | null
              | undefined;
            const newProducts = value as (ApiProductBasic | ApiProductFull)[];
            merged.products = Array.from(
              new Set([...(currentProducts || []), ...newProducts])
            );
            break;
          case "message":
          case "style_name":
          case "description":
            merged[key as "message" | "style_name" | "description"] = value as
              | string
              | null;
            break;
          default:
            break;
        }
      }
    });
    return merged;
  }, {} as ApiResponse);
}

// ---------------------------------------------
// Voice Settings Modal Component
// ---------------------------------------------

function VoiceSettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  availableVoices,
}: {
  isOpen: boolean;
  onClose: () => void;
  settings: VoiceSettings;
  onSettingsChange: (settings: VoiceSettings) => void;
  availableVoices: SpeechSynthesisVoice[];
}) {
  const [tempSettings, setTempSettings] = useState<VoiceSettings>(settings);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSettingsChange(tempSettings);
    onClose();
  };

  const testVoice = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        "Xin chào! Đây là giọng nói thử nghiệm của Stylist AI."
      );
      utterance.lang = "vi-VN";
      utterance.rate = tempSettings.rate;
      utterance.pitch = tempSettings.pitch;
      utterance.volume = tempSettings.volume;

      if (tempSettings.voice) {
        const voice = availableVoices.find(
          (v) => v.name === tempSettings.voice
        );
        if (voice) {
          utterance.voice = voice;
        }
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Cài đặt giọng nói</h2>
                <p className="text-white/80 text-sm">
                  Tùy chỉnh trải nghiệm âm thanh
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Enable Voice */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Bật giọng nói
              </label>
              <p className="text-xs text-gray-500">
                Phát âm thanh khi AI trả lời
              </p>
            </div>
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, enabled: !prev.enabled }))
              }
              className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                tempSettings.enabled
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gray-300"
              )}
            >
              <span
                className={clsx(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  tempSettings.enabled ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          {/* Auto Speak */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Tự động phát
              </label>
              <p className="text-xs text-gray-500">Tự động đọc tin nhắn mới</p>
            </div>
            <button
              onClick={() =>
                setTempSettings((prev) => ({
                  ...prev,
                  autoSpeak: !prev.autoSpeak,
                }))
              }
              className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                tempSettings.autoSpeak
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : "bg-gray-300"
              )}
            >
              <span
                className={clsx(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  tempSettings.autoSpeak ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          {/* Voice Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Chọn giọng
            </label>
            <select
              value={tempSettings.voice || ""}
              onChange={(e) =>
                setTempSettings((prev) => ({
                  ...prev,
                  voice: e.target.value || null,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Mặc định</option>
              {availableVoices
                .filter(
                  (voice) =>
                    voice.lang.includes("vi") || voice.lang.includes("en")
                )
                .map((voice, index) => (
                  <option key={index} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
            </select>
          </div>

          {/* Rate */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-900">
                Tốc độ nói
              </label>
              <span className="text-sm text-gray-500">
                {tempSettings.rate.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={tempSettings.rate}
              onChange={(e) =>
                setTempSettings((prev) => ({
                  ...prev,
                  rate: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Chậm</span>
              <span>Bình thường</span>
              <span>Nhanh</span>
            </div>
          </div>

          {/* Pitch */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-900">
                Cao độ
              </label>
              <span className="text-sm text-gray-500">
                {tempSettings.pitch.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={tempSettings.pitch}
              onChange={(e) =>
                setTempSettings((prev) => ({
                  ...prev,
                  pitch: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Trầm</span>
              <span>Bình thường</span>
              <span>Cao</span>
            </div>
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-900">
                Âm lượng
              </label>
              <span className="text-sm text-gray-500">
                {Math.round(tempSettings.volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={tempSettings.volume}
              onChange={(e) =>
                setTempSettings((prev) => ({
                  ...prev,
                  volume: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Test Button */}
          <button
            onClick={testVoice}
            disabled={!tempSettings.enabled}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Headphones className="h-4 w-4" />
            Thử giọng nói
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-200"
          >
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Main Component
// ---------------------------------------------

export default function ChatBoxStylistAI({
  apiUrl,
  title = "Stylist AI",
}: {
  /** Optional override. Defaults to `${process.env.NEXT_PUBLIC_API_URL}/api/stylist/analyze` */
  apiUrl?: string;
  title?: string;
}) {
  const endpoint = useMemo(() => {
    const defaultUrl = `${process.env.NEXT_PUBLIC_API_URL ??
      ""}/api/stylist/analyze`;
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL is not set. Using default endpoint.");
    }
    return apiUrl || defaultUrl;
  }, [apiUrl]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Voice features state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    voice: null,
    autoSpeak: true,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      text:
        "Xin chào! Mình là Stylist AI 👗 Hãy nói cho mình biết bạn muốn tìm sản phẩm gì, hỏi size, xem ưu đãi/flash sale, hoặc mình có thể phối một set đồ theo gu của bạn nhé!",
      timestamp: Date.now(),
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSpeakingRef = useRef<boolean>(false); // Track speaking state to prevent overlaps

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;

      // Load available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    if (typeof window !== "undefined") {
      const extendedWindow = (window as unknown) as ExtendedWindow;
      const SpeechRecognitionConstructor =
        extendedWindow.SpeechRecognition ||
        extendedWindow.webkitSpeechRecognition;

      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "vi-VN";

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognitionRef.current.onerror = (
          event: SpeechRecognitionErrorEvent
        ) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (listRef.current && !isMinimized) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length, sending, isTyping, isMinimized]);

  useEffect(() => {
    if (!textareaRef.current || isMinimized) return;
    const el = textareaRef.current;
    el.style.height = "0px";
    el.style.height = `${Math.min(120, el.scrollHeight)}px`;
  }, [input, isMinimized]);

  // Speech-to-Text functions
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        setIsListening(false);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  // Text-to-Speech functions
  const speakText = useCallback(
    (text: string, messageId?: string) => {
      if (
        !synthesisRef.current ||
        !voiceSettings.enabled ||
        isSpeakingRef.current
      )
        return;

      // Cancel any existing speech
      synthesisRef.current.cancel();
      isSpeakingRef.current = true;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      // Set selected voice if available
      if (voiceSettings.voice && availableVoices.length > 0) {
        const selectedVoice = availableVoices.find(
          (voice) => voice.name === voiceSettings.voice
        );
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (messageId) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? { ...msg, isPlaying: true }
                : { ...msg, isPlaying: false }
            )
          );
        }
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
        if (messageId) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId ? { ...msg, isPlaying: false } : msg
            )
          );
        }
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      currentUtteranceRef.current = utterance;
      synthesisRef.current.speak(utterance);
    },
    [voiceSettings, availableVoices]
  );

  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
      setMessages((prev) => prev.map((msg) => ({ ...msg, isPlaying: false })));
    }
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceSettings((prev) => {
      const newSettings = { ...prev, enabled: !prev.enabled };
      if (!newSettings.enabled && synthesisRef.current) {
        synthesisRef.current.cancel();
        isSpeakingRef.current = false;
        setIsSpeaking(false);
      }
      return newSettings;
    });
  }, []);

  const sendInput = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setIsTyping(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const res = await axios.post<ApiResponse[] | ApiResponse>(endpoint, {
        answers: [trimmed],
      });

      let data: ApiResponse;
      if (Array.isArray(res.data)) {
        data = mergeResponses(res.data);
      } else {
        data = res.data || {};
      }

      const attachment: ChatAttachment | undefined =
        data.style_name !== undefined ||
        data.description !== undefined ||
        data.keywords !== undefined ||
        data.products !== undefined ||
        data.mix_and_match !== undefined
          ? {
              kind: "style",
              style_name: data.style_name,
              description: data.description,
              keywords: data.keywords,
              products: data.products ?? null,
              mix_and_match: data.mix_and_match ?? null,
            }
          : undefined;

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: data.message || "Mình đã tìm thấy một số gợi ý cho bạn!",
        attachment,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (
        voiceSettings.enabled &&
        voiceSettings.autoSpeak &&
        (data.message || "Mình đã tìm thấy một số gợi ý cho bạn!")
      ) {
        setTimeout(() => {
          speakText(
            data.message || "Mình đã tìm thấy một số gợi ý cho bạn!",
            assistantMsg.id
          );
        }, 500);
      }
    } catch (err) {
      console.error("API Error:", err);
      let msg = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      if (err instanceof axios.AxiosError && err.response?.data?.message) {
        msg = err.response.data.message;
      }
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: msg,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);

      if (voiceSettings.enabled && voiceSettings.autoSpeak) {
        setTimeout(() => {
          speakText(msg, errorMsg.id);
        }, 500);
      }
    } finally {
      setSending(false);
      setIsTyping(false);
    }
  }, [input, endpoint, voiceSettings, speakText]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!sending) sendInput();
      }
    },
    [sending, sendInput]
  );

  return (
    <>
      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={showVoiceSettings}
        onClose={() => setShowVoiceSettings(false)}
        settings={voiceSettings}
        onSettingsChange={setVoiceSettings}
        availableVoices={availableVoices}
      />

      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <button
              onClick={() => setIsOpen(true)}
              className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              <MessageCircle className="h-6 w-6 relative z-10" />
            </button>

            {/* Status indicators */}
            <div className="absolute -top-1 -right-1 flex flex-col gap-1">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              {voiceSettings.enabled && (
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full">
                  <Volume2 className="h-2 w-2 text-white m-0.5" />
                </div>
              )}
            </div>

            {/* Floating hint */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/80 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap">
                Bấm để chat với Stylist AI
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
          <div
            className={clsx(
              "backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300",
              isMinimized ? "h-16" : ""
            )}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-4">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{title}</div>
                    <div className="text-white/80 text-xs flex items-center gap-2">
                      <Zap className="h-3 w-3" />
                      <span>Trợ lý thời trang AI</span>
                      {voiceSettings.enabled && (
                        <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                          <Volume2 className="h-3 w-3" />
                          <span>Voice</span>
                          {isSpeaking && (
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Voice settings button */}
                  <button
                    onClick={() => setShowVoiceSettings(true)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm group"
                    title="Cài đặt giọng nói"
                  >
                    <Settings className="h-4 w-4 text-white group-hover:rotate-45 transition-transform duration-300" />
                  </button>

                  {/* Voice toggle button */}
                  <button
                    onClick={toggleVoice}
                    className={clsx(
                      "p-2 rounded-xl backdrop-blur-sm transition-all duration-200",
                      voiceSettings.enabled
                        ? "bg-emerald-500/20 hover:bg-emerald-500/30"
                        : "bg-white/10 hover:bg-white/20"
                    )}
                    title={
                      voiceSettings.enabled ? "Tắt giọng nói" : "Bật giọng nói"
                    }
                  >
                    {voiceSettings.enabled ? (
                      <Volume2 className="h-4 w-4 text-white" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-white/60" />
                    )}
                  </button>

                  {/* Minimize/Maximize button */}
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                    title={isMinimized ? "Mở rộng" : "Thu gọn"}
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4 text-white" />
                    ) : (
                      <Minimize2 className="h-4 w-4 text-white" />
                    )}
                  </button>

                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages - Hidden when minimized */}
            {!isMinimized && (
              <div
                ref={listRef}
                className="max-h-[65vh] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white custom-scrollbar"
              >
                {messages.map((m) => (
                  <MessageBubble
                    key={m.id}
                    msg={m}
                    onPlayPause={speakText}
                    onStopSpeaking={stopSpeaking}
                    voiceSettings={voiceSettings}
                  />
                ))}
                {(sending || isTyping) && (
                  <div className="flex items-center gap-3 animate-fade-in">
                    <div className="h-8 w-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-white/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                      <span className="text-sm text-slate-600">
                        Đang soạn trả lời...
                      </span>
                      {isSpeaking && (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <Volume2 className="h-3 w-3" />
                          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input - Hidden when minimized */}
            {!isMinimized && (
              <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={
                      isListening
                        ? "Đang nghe... hãy nói gì đó"
                        : "Nhập câu hỏi hoặc nhấn mic để nói..."
                    }
                    className="w-full resize-none bg-white/80 backdrop-blur-sm text-slate-800 rounded-2xl p-4 pr-32 placeholder:text-slate-500 border border-white/20 focus:border-purple-300 outline-none focus:ring-4 focus:ring-purple-100/50 transition-all duration-200"
                    rows={1}
                    disabled={isListening}
                  />

                  <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    {/* Stop speaking button */}
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="rounded-xl p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        title="Dừng đọc"
                      >
                        <PauseCircle className="h-4 w-4" />
                      </button>
                    )}

                    {/* Voice input button */}
                    <button
                      onClick={isListening ? stopListening : startListening}
                      disabled={sending}
                      className={clsx(
                        "rounded-xl p-3 transition-all duration-200 transform shadow-lg",
                        isListening
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse hover:from-red-600 hover:to-pink-600"
                          : sending
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:scale-105"
                      )}
                      title={isListening ? "Nhấn để dừng nghe" : "Nhấn để nói"}
                    >
                      {isListening ? (
                        <div className="relative">
                          <MicOff className="h-4 w-4" />
                          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                        </div>
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </button>

                    {/* Send button */}
                    <button
                      onClick={sendInput}
                      disabled={sending || !input.trim()}
                      className={clsx(
                        "rounded-xl p-3 transition-all duration-200 transform shadow-lg",
                        sending || !input.trim()
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-purple-500/25"
                      )}
                    >
                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>Enter để gửi • Shift+Enter xuống dòng</span>
                    {isListening && (
                      <span className="flex items-center gap-1 text-red-600 animate-pulse font-medium">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        Đang nghe...
                      </span>
                    )}
                    {isSpeaking && (
                      <span className="flex items-center gap-1 text-emerald-600 animate-pulse font-medium">
                        <Volume2 className="h-3 w-3" />
                        Đang đọc...
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400">
                    {formatTime(Date.now())}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------
// Message Bubble + Rich Attachments
// ---------------------------------------------

function MessageBubble({
  msg,
  onPlayPause,
  onStopSpeaking,
  voiceSettings,
}: {
  msg: ChatMessage;
  onPlayPause: (text: string, messageId?: string) => void;
  onStopSpeaking: () => void;
  voiceSettings: VoiceSettings;
}) {
  const isUser = msg.role === "user";
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePlayPause = () => {
    if (msg.isPlaying) {
      onStopSpeaking();
    } else {
      onPlayPause(msg.text, msg.id);
    }
  };

  return (
    <div
      className={clsx(
        "flex gap-3 animate-fade-in group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={clsx(
          "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ring-2 ring-white/50 transition-all duration-200 group-hover:scale-110",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25"
            : "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={clsx(
          "flex-1 max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={clsx(
            "rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl border",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white ml-auto border-blue-300/20 hover:shadow-blue-500/25"
              : "bg-white/90 text-slate-800 border-white/30 hover:shadow-slate-200/50"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              {msg.text && (
                <div className="whitespace-pre-wrap leading-relaxed text-sm">
                  {msg.text}
                </div>
              )}

              {msg.timestamp && (
                <div
                  className={clsx(
                    "text-xs mt-2 opacity-70 flex items-center gap-2",
                    isUser ? "text-white/80" : "text-slate-500"
                  )}
                >
                  <span>{formatTime(msg.timestamp)}</span>
                  {!isUser && voiceSettings.enabled && (
                    <div className="flex items-center gap-1">
                      <Volume2 className="h-2 w-2" />
                      <span className="text-xs">Voice ready</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Voice playback button for assistant messages */}
            {!isUser && msg.text && voiceSettings.enabled && (
              <div className="flex-shrink-0 flex items-center gap-1">
                <button
                  onClick={handlePlayPause}
                  className={clsx(
                    "p-2 rounded-xl transition-all duration-200 hover:scale-110",
                    msg.isPlaying
                      ? "bg-red-100 hover:bg-red-200 text-red-600"
                      : "bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
                  )}
                  title={msg.isPlaying ? "Dừng phát" : "Phát giọng nói"}
                >
                  {msg.isPlaying ? (
                    <div className="relative">
                      <PauseCircle className="h-4 w-4" />
                      <div className="absolute inset-0 rounded-full border border-red-400 animate-pulse" />
                    </div>
                  ) : (
                    <PlayCircle className="h-4 w-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Attachments */}
        {!isUser && msg.attachment?.kind === "style" && (
          <div className="mt-3 space-y-3 w-full">
            <StyleSummary
              name={msg.attachment.style_name}
              desc={msg.attachment.description}
              keywords={msg.attachment.keywords}
            />
            {Array.isArray(msg.attachment.mix_and_match) &&
              msg.attachment.mix_and_match.length > 0 && (
                <MixAndMatch names={msg.attachment.mix_and_match} />
              )}
            {Array.isArray(msg.attachment.products) &&
              msg.attachment.products.length > 0 && (
                <ProductsGrid
                  products={msg.attachment.products}
                  isExpanded={isExpanded}
                  onToggleExpanded={() => setIsExpanded(!isExpanded)}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );
}

function StyleSummary({
  name,
  desc,
  keywords,
}: {
  name?: string | null | undefined;
  desc?: string | null | undefined;
  keywords?: string[] | null | undefined;
}) {
  if (!name && !desc && (!keywords || keywords?.length === 0)) return null;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 mb-3">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
          <Stars className="h-4 w-4 text-white" />
        </div>
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {name || "Gu thời trang của bạn"}
        </span>
      </div>
      {desc && (
        <p className="text-slate-600 text-sm leading-relaxed mb-3 bg-white/50 rounded-lg p-3 border border-purple-100">
          {desc}
        </p>
      )}
      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((k, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-white/70 backdrop-blur-sm border border-purple-200/50 px-3 py-1.5 text-xs text-purple-700 hover:bg-purple-100/60 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <Tag className="h-3 w-3" />
              <span className="font-medium">{k}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MixAndMatch({ names }: { names: string[] }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200/50 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-2 text-sm font-semibold text-orange-700 mb-3">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
          <Palette className="h-4 w-4 text-white" />
        </div>
        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Set phối đồ gợi ý
        </span>
      </div>
      <div className="space-y-3">
        {names.map((n, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm text-slate-700 bg-white/50 rounded-lg p-3 border border-orange-100 hover:bg-white/70 transition-colors"
          >
            <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full shadow-sm flex-shrink-0" />
            <span className="font-medium">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsGrid({
  products,
  isExpanded,
  onToggleExpanded,
}: {
  products: (ApiProductBasic | ApiProductFull)[] | null | undefined;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}) {
  if (!products || products.length === 0) return null;

  const displayProducts = isExpanded ? products : products.slice(0, 2);
  const hasMore = products.length > 2;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
          <ShoppingBag className="h-4 w-4 text-white" />
        </div>
        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Sản phẩm gợi ý ({products.length})
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {displayProducts.map((p) => (
          <ProductCard
            key={p.id + ((p as ApiProductFull).variant ? "-full" : "-basic")}
            product={p}
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={onToggleExpanded}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-slate-600 hover:text-purple-600 transition-all duration-200 rounded-xl hover:bg-purple-50 border-2 border-dashed border-slate-200 hover:border-purple-300"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span className="font-medium">Thu gọn</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span className="font-medium">
                Xem thêm {products.length - 2} sản phẩm
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: ApiProductBasic | ApiProductFull;
}) {
  const cover =
    product.images && product.images.length > 0 ? product.images[0] : null;
  const hasVariants = Array.isArray((product as ApiProductFull).variant);
  const variants = (product as ApiProductFull).variant || [];
  const [showVariants, setShowVariants] = useState(false);

  // Compute display price
  const basePrice = "price" in product ? product.price ?? null : null;
  const firstSale =
    variants.find((v) => v.sale_price != null)?.sale_price ?? null;
  const firstPrice = variants.find((v) => v.price != null)?.price ?? null;
  const displayPrice = basePrice ?? firstSale ?? firstPrice ?? null;

  // Đường dẫn tới trang chi tiết sản phẩm
  const productUrl = `/products/${product.id}`;

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-purple-300/50">
      <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {cover ? (
          <Link
            href={productUrl}
            aria-label={`Xem chi tiết sản phẩm ${product.name}`}
          >
            <Image
              src={cover}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              width={500}
              height={281}
              unoptimized
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
            <div className="text-center">
              <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-50" />
              Không có ảnh
            </div>
          </div>
        )}

        {/* Quick action buttons */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
            <Heart className="h-4 w-4 text-slate-600 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Price badge */}
        {displayPrice != null && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {formatPrice(displayPrice)}
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors duration-200 text-base">
          {product.name}
        </div>

        {displayPrice != null && (
          <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {formatPrice(displayPrice)}
          </div>
        )}

        {product.description && (
          <div className="text-sm text-slate-500 line-clamp-2 mb-3 bg-slate-50 rounded-lg p-2 border border-slate-100">
            {product.description}
          </div>
        )}

        {hasVariants && variants.length > 0 && (
          <div className="space-y-3 mb-4">
            <button
              onClick={() => setShowVariants(!showVariants)}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-purple-600 transition-colors w-full bg-slate-50 hover:bg-purple-50 p-2 rounded-lg border border-slate-200 hover:border-purple-200"
            >
              <Shirt className="h-4 w-4" />
              <span className="flex-1 text-left font-medium">
                Chi tiết size & màu ({variants.length} biến thể)
              </span>
              {showVariants ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showVariants && (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 shadow-inner">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-slate-600 border-b border-slate-300">
                        <th className="text-left font-semibold py-2 px-2">
                          Size
                        </th>
                        <th className="text-left font-semibold py-2 px-2">
                          Màu
                        </th>
                        <th className="text-left font-semibold py-2 px-2">
                          Giá
                        </th>
                        <th className="text-left font-semibold py-2 px-2">
                          Giá KM
                        </th>
                        <th className="text-left font-semibold py-2 px-2">
                          Kho
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((v, i) => (
                        <tr
                          key={v.id ?? i}
                          className="text-slate-700 hover:bg-white/70 transition-colors border-b border-slate-200 last:border-0"
                        >
                          <td className="py-2 px-2 font-medium">
                            {v.size ?? "-"}
                          </td>
                          <td className="py-2 px-2">
                            {v.color ? (
                              <span className="inline-flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-300"
                                  style={{
                                    backgroundColor: v.color.toLowerCase(),
                                  }}
                                />
                                <span className="font-medium">{v.color}</span>
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="py-2 px-2 font-medium">
                            {v.price != null ? formatPrice(v.price) : "-"}
                          </td>
                          <td className="py-2 px-2">
                            {v.sale_price != null ? (
                              <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded-full">
                                {formatPrice(v.sale_price)}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="py-2 px-2">
                            <span
                              className={clsx(
                                "px-2 py-1 rounded-full text-xs font-bold",
                                (v.stock_quantity ?? 0) > 10
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : (v.stock_quantity ?? 0) > 0
                                  ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                  : "bg-red-100 text-red-700 border border-red-200"
                              )}
                            >
                              {v.stock_quantity ?? 0}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <Link
            href={productUrl}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
          >
            <span>Xem chi tiết</span>
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
          </Link>
          <button className="p-3 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-xl transition-all duration-200 hover:scale-105 shadow-md">
            <ShoppingBag className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Add enhanced custom CSS animations and styles
const enhancedCustomStyles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse-border {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(168, 85, 247, 0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.4s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }

  .animate-pulse-border {
    animation: pulse-border 2s infinite;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Enhanced scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #a855f7, #ec4899);
    border-radius: 3px;
    transition: all 0.2s ease;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #9333ea, #db2777);
    width: 8px;
  }

  /* Enhanced slider styles */
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a855f7, #ec4899);
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(168, 85, 247, 0.3);
    transition: all 0.2s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(168, 85, 247, 0.4);
  }

  .slider::-webkit-slider-track {
    height: 8px;
    border-radius: 4px;
    background: linear-gradient(90deg, #f1f5f9, #e2e8f0);
    border: none;
  }

  /* Glass morphism effects */
  .glass-effect {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* Hover glow effects */
  .glow-hover:hover {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(236, 72, 153, 0.2);
  }

  /* Message bubble animations */
  .message-bubble {
    transform: translateY(10px);
    opacity: 0;
    animation: slide-up 0.4s ease-out forwards;
  }

  /* Voice wave animation */
  @keyframes voice-wave {
    0%, 100% { height: 4px; }
    50% { height: 16px; }
  }

  .voice-wave {
    display: inline-block;
    width: 2px;
    height: 4px;
    background: currentColor;
    margin: 0 1px;
    animation: voice-wave 0.8s ease-in-out infinite;
  }

  .voice-wave:nth-child(2) { animation-delay: 0.1s; }
  .voice-wave:nth-child(3) { animation-delay: 0.2s; }
  .voice-wave:nth-child(4) { animation-delay: 0.3s; }

  /* Enhanced button hover effects */
  .btn-gradient {
    position: relative;
    overflow: hidden;
  }

  .btn-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .btn-gradient:hover::before {
    left: 100%;
  }

  /* Product card enhancements */
  .product-card {
    transform: translateY(0);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .product-card:hover {
    transform: translateY(-8px);
  }

  /* Loading spinner enhancement */
  @keyframes enhanced-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .enhanced-spin {
    animation: enhanced-spin 1s linear infinite;
  }

  /* Notification styles */
  .notification {
    animation: slide-up 0.4s ease-out;
  }

  .notification.fade-out {
    animation: fade-in 0.3s ease-out reverse;
  }

  /* Voice settings modal animations */
  .modal-backdrop {
    animation: fade-in 0.2s ease-out;
  }

  .modal-content {
    animation: slide-up 0.3s ease-out;
  }

  /* Enhanced focus styles */
  .focus-enhanced:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
    border-color: #a855f7;
  }

  /* Typing indicator enhancement */
  .typing-dots {
    display: inline-flex;
    gap: 2px;
  }

  .typing-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: typing-bounce 1.4s ease-in-out infinite both;
  }

  .typing-dot:nth-child(1) { animation-delay: -0.32s; }
  .typing-dot:nth-child(2) { animation-delay: -0.16s; }

  @keyframes typing-bounce {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Responsive improvements */
  @media (max-width: 640px) {
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
  }
`;

// Inject enhanced custom styles
if (typeof document !== "undefined") {
  const styleElement = document.getElementById("chatbox-enhanced-styles");
  if (!styleElement) {
    const style = document.createElement("style");
    style.id = "chatbox-enhanced-styles";
    style.textContent = enhancedCustomStyles;
    document.head.appendChild(style);
  }
}
