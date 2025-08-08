import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMarketDashboard } from "../contexts/MarketDashboardContext";
import { BarChart3, CheckCircle, AlertTriangle } from "lucide-react";
import {
  finnhubMarketDataService,
  MarketSentiment,
  safeFormatTimestamp,
} from "../services/finnhubMarketData";
import TabbedMarketDashboard from "./TabbedMarketDashboard";

interface FloatingMarketIconProps {
  className?: string;
}

export default function FloatingMarketIcon({
  className,
}: FloatingMarketIconProps) {
  const { isOpen, setIsOpen, toggleOpen } = useMarketDashboard();
  const [marketSentiment, setMarketSentiment] = useState<MarketSentiment>({
    sentiment: "neutral",
    advanceDeclineRatio: 0.5,
    positiveStocks: 0,
    totalStocks: 0,
  });
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "loading" | "error"
  >("loading");
  const [dataJustUpdated, setDataJustUpdated] = useState(false);

  useEffect(() => {
    setConnectionStatus("loading");
    const unsubscribe = finnhubMarketDataService.subscribeToUpdates((data) => {
      setMarketSentiment(
        data.sentiment || {
          sentiment: "neutral",
          advanceDeclineRatio: 0.5,
          positiveStocks: 0,
          totalStocks: 0,
        },
      );
      setLastUpdate(new Date());
      setConnectionStatus("connected");

      // Flash effect when new data arrives
      setDataJustUpdated(true);
      setTimeout(() => setDataJustUpdated(false), 1000);
    });

    return unsubscribe;
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-finance-teal-green";
      case "bearish":
        return "text-finance-red";
      default:
        return "text-finance-teal";
    }
  };

  // Floating icon click animation with haptic feedback
  const handleIconClick = () => {
    // Haptic feedback for mobile devices
    if ("vibrate" in navigator) {
      navigator.vibrate(50); // Short vibration
    }
    toggleOpen();
  };

  return (
    <>
      {/* Floating Market Dashboard Icon */}
      <motion.div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 ${className}`}
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.button
          onClick={handleIconClick}
          className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-finance-navy/90 via-finance-navy-medium/85 to-finance-navy-light/80 backdrop-blur-xl border border-finance-teal/40 shadow-2xl flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-finance-teal focus:ring-offset-2 focus:ring-offset-finance-navy transition-all duration-300"
          style={{
            boxShadow:
              "0 0 30px rgba(32, 178, 170, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
          aria-label="Open professional market dashboard"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleIconClick();
            }
          }}
          // Enhanced floating animation with breathe effect
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 30px rgba(32, 178, 170, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)",
              "0 0 40px rgba(32, 178, 170, 0.5), 0 12px 40px rgba(0, 0, 0, 0.5)",
              "0 0 30px rgba(32, 178, 170, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)",
            ],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.15,
            rotate: 8,
            y: -12,
            boxShadow:
              "0 0 50px rgba(32, 178, 170, 0.6), 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{
            scale: 0.9,
            y: -2,
            rotate: 0,
          }}
        >
          {/* Enhanced pulse ring effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-finance-teal/60"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.7, 0, 0.7],
              borderRadius: ["1rem", "2rem", "1rem"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Secondary pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-finance-teal-mint/40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          />

          {/* Data update flash effect */}
          <AnimatePresence>
            {dataJustUpdated && (
              <motion.div
                className="absolute inset-0 rounded-full bg-finance-gold/20"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>

          {/* Loading spinner */}
          {connectionStatus === "loading" && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-finance-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Status indicators */}
          <div className="absolute -top-1 -right-1">
            {connectionStatus === "connected" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 bg-finance-green rounded-full border border-finance-navy"
              >
                <CheckCircle className="w-3 h-3 text-finance-navy" />
              </motion.div>
            )}
            {connectionStatus === "error" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 bg-finance-red rounded-full border border-finance-navy"
              >
                <AlertTriangle className="w-3 h-3 text-finance-navy" />
              </motion.div>
            )}
          </div>

          {/* Main icon */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: dataJustUpdated ? [1, 1.3, 1] : 1,
              rotate: dataJustUpdated ? [0, 360] : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="relative">
              {/* Icon glow background */}
              <div className="absolute inset-0 bg-finance-teal/30 rounded-lg blur-sm group-hover:bg-finance-teal-mint/40 transition-all duration-300" />

              <BarChart3
                className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-finance-teal group-hover:text-finance-teal-mint transition-all duration-300"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(32, 178, 170, 0.8))",
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 rounded-full bg-finance-gold/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0, opacity: 0 }}
            whileTap={{
              scale: [0, 2],
              opacity: [0.6, 0],
              transition: { duration: 0.4 },
            }}
          />
        </motion.button>

        {/* Enhanced stats tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
          initial={{ y: 10, opacity: 0, scale: 0.9 }}
          whileHover={{ y: 0, opacity: 1, scale: 1 }}
        >
          <div className="bg-gradient-to-br from-finance-navy/95 to-finance-navy-medium/90 backdrop-blur-xl border border-finance-gold/30 rounded-xl p-4 text-xs whitespace-nowrap shadow-2xl">
            <div className="flex items-center gap-2 font-semibold text-finance-gold mb-2">
              <div className="w-2 h-2 bg-finance-green rounded-full animate-pulse" />
              Market Central
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Sentiment:</span>
                <span
                  className={`font-medium ${getSentimentColor(marketSentiment.sentiment)}`}
                >
                  {marketSentiment.sentiment.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Movement:</span>
                <span className="text-foreground">
                  {marketSentiment.positiveStocks}↑ /{" "}
                  {marketSentiment.totalStocks - marketSentiment.positiveStocks}
                  ↓
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Updated:</span>
                <span className="text-finance-electric font-mono">
                  {safeFormatTimestamp(lastUpdate)}
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-finance-gold/20 text-center">
              <span className="text-finance-electric/80">
                Click to open dashboard
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Professional Market Dashboard */}
      <TabbedMarketDashboard isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
