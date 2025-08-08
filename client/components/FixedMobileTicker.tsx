import { useState, useEffect } from "react";
import { FinnhubStockData } from "../services/finnhubMarketData";

interface FixedMobileTickerProps {
  stockData: FinnhubStockData[];
  isMarketOpen: () => boolean;
  marketSentiment: {
    sentiment: "bullish" | "bearish" | "neutral";
    positiveStocks: number;
    totalStocks: number;
  };
  connectionStatus: string;
  isLoading: boolean;
  lastUpdate: Date;
}

export default function FixedMobileTicker({
  stockData,
  isMarketOpen,
  marketSentiment,
  connectionStatus,
  isLoading,
  lastUpdate,
}: FixedMobileTickerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (symbol: string, price: number) => {
    if (
      symbol.includes(".NS") ||
      symbol.includes("^BSESN") ||
      symbol.includes("^NSEI")
    ) {
      return `₹${price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getSentimentColor = () => {
    // Always use dark professional theme regardless of sentiment
    return "from-gray-900/95 to-black/95";
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r ${getSentimentColor()} border-t border-finance-teal/50 z-40`}
    >
      {/* Mobile Layout - COMPLETELY HIDDEN */}
      <div className="hidden">
        {/* Status Row */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/95 border-b border-teal-500/30">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  isMarketOpen() ? "bg-green-400" : "bg-red-400"
                }`}
              />
              <span className="text-white font-bold text-xs">
                {isMarketOpen() ? "OPEN" : "CLOSED"}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  marketSentiment.sentiment === "bullish"
                    ? "bg-green-400"
                    : marketSentiment.sentiment === "bearish"
                      ? "bg-red-400"
                      : "bg-teal-400"
                }`}
              />
              <span className="text-teal-300 font-bold uppercase text-xs">
                {marketSentiment.sentiment}
              </span>
            </div>
          </div>
          <div className="text-teal-300 text-xs font-mono font-bold">
            {currentTime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            IST
          </div>
        </div>

        {/* Stock Ticker Row */}
        <div
          className="relative overflow-hidden bg-slate-800/95"
          style={{ touchAction: "none" }}
        >
          <div
            className="flex items-center space-x-6 py-2.5 mobile-ticker-never-pause"
            style={{
              width: "200%",
              animation: "mobileTicker 35s linear infinite",
              willChange: "transform",
              transform: "translateZ(0)", // Force GPU acceleration
              animationPlayState: "running",
            }}
          >
            {/* First set */}
            {stockData.slice(0, 8).map((stock, index) => (
              <div
                key={`mobile-${stock.symbol}-${index}`}
                className="flex items-center space-x-2 whitespace-nowrap text-sm font-bold bg-slate-700/90 px-3 py-1.5 rounded-lg border border-teal-400/40 shadow-lg"
                style={{ minWidth: "max-content" }}
              >
                <span className="text-teal-300 font-bold text-sm">
                  {stock.name.length > 7
                    ? stock.name.substring(0, 7)
                    : stock.name}
                </span>
                <span className="text-white font-bold text-sm">
                  {formatPrice(stock.symbol, stock.price)}
                </span>
                <span
                  className={`font-bold text-sm ${
                    stock.change > 0
                      ? "text-green-400"
                      : stock.change < 0
                        ? "text-red-400"
                        : "text-gray-400"
                  }`}
                >
                  {stock.change > 0 ? "↗" : stock.change < 0 ? "↘" : "→"}
                  {Math.abs(stock.changePercent).toFixed(1)}%
                </span>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {stockData.slice(0, 8).map((stock, index) => (
              <div
                key={`mobile-dup-${stock.symbol}-${index}`}
                className="flex items-center space-x-2 whitespace-nowrap text-sm font-bold bg-slate-700/90 px-3 py-1.5 rounded-lg border border-teal-400/40 shadow-lg"
                style={{ minWidth: "max-content" }}
              >
                <span className="text-teal-300 font-bold text-sm">
                  {stock.name.length > 7
                    ? stock.name.substring(0, 7)
                    : stock.name}
                </span>
                <span className="text-white font-bold text-sm">
                  {formatPrice(stock.symbol, stock.price)}
                </span>
                <span
                  className={`font-bold text-sm ${
                    stock.change > 0
                      ? "text-green-400"
                      : stock.change < 0
                        ? "text-red-400"
                        : "text-gray-400"
                  }`}
                >
                  {stock.change > 0 ? "↗" : stock.change < 0 ? "↘" : "→"}
                  {Math.abs(stock.changePercent).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Only Layout */}
      <div className="hidden md:block">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isMarketOpen() ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <span className="text-white font-medium">
                  Market {isMarketOpen() ? "Open" : "Closed"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-1 h-1 rounded-full ${
                    marketSentiment.sentiment === "bullish"
                      ? "bg-green-400"
                      : marketSentiment.sentiment === "bearish"
                        ? "bg-red-400"
                        : "bg-teal-400"
                  }`}
                />
                <span className="text-teal-300 font-medium capitalize">
                  {marketSentiment.sentiment} ({marketSentiment.positiveStocks}/
                  {marketSentiment.totalStocks})
                </span>
              </div>

              <div className="text-teal-300 text-xs">
                {currentTime.toLocaleTimeString("en-IN")} IST
              </div>

              <div className="text-xs text-gray-400">
                Updated: {lastUpdate.toLocaleTimeString("en-IN")}
              </div>
            </div>

            {/* Desktop Stock Ticker */}
            <div className="flex-1 overflow-hidden ml-8">
              <div className="flex space-x-6 animate-scroll">
                {stockData.map((stock, index) => (
                  <div
                    key={`desktop-${stock.symbol}-${index}`}
                    className="flex items-center space-x-2 whitespace-nowrap"
                  >
                    <span className="font-semibold text-teal-300 text-xs">
                      {stock.name}
                    </span>
                    <span className="text-white font-medium text-xs">
                      {formatPrice(stock.symbol, stock.price)}
                    </span>
                    <span
                      className={`flex items-center space-x-1 font-medium text-xs ${
                        stock.change > 0
                          ? "text-green-400"
                          : stock.change < 0
                            ? "text-red-400"
                            : "text-gray-400"
                      }`}
                    >
                      <span>
                        {stock.change > 0 ? "▲" : stock.change < 0 ? "▼" : "●"}
                      </span>
                      <span>{Math.abs(stock.change).toFixed(2)}</span>
                      <span>
                        ({stock.changePercent > 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%)
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
