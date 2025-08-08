import { useState, useEffect } from "react";
import { FinnhubStockData } from "../services/finnhubMarketData";

interface SimpleMarketTickerProps {
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

export default function SimpleMarketTicker({
  stockData,
  isMarketOpen,
  marketSentiment,
  connectionStatus,
  isLoading,
  lastUpdate,
}: SimpleMarketTickerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getSentimentColor = () => {
    switch (marketSentiment.sentiment) {
      case "bullish":
        return "from-finance-green/10 to-finance-green/5";
      case "bearish":
        return "from-finance-red/10 to-finance-red/5";
      default:
        return "from-finance-teal/10 to-finance-teal/5";
    }
  };

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

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${getSentimentColor()} backdrop-blur-md border-t border-finance-teal/30 overflow-hidden`}
    >
      <div className="container mx-auto px-2 md:px-6 py-1.5 md:py-3">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isMarketOpen() ? "bg-finance-green animate-pulse" : "bg-finance-red"}`}
                />
                <span className="text-foreground font-medium">
                  {isMarketOpen() ? "Open" : "Closed"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-1 h-1 rounded-full ${
                    marketSentiment.sentiment === "bullish"
                      ? "bg-finance-green"
                      : marketSentiment.sentiment === "bearish"
                        ? "bg-finance-red"
                        : "bg-finance-teal"
                  } animate-pulse`}
                />
                <span className="text-finance-teal font-medium capitalize">
                  {marketSentiment.sentiment}
                </span>
              </div>
            </div>
            <div className="text-finance-teal text-xs">
              {currentTime.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          {/* Mobile Stock Ticker */}
          <div className="overflow-hidden">
            <div
              className="flex space-x-4 text-xs"
              style={{
                animation: "mobileTickerScroll 60s linear infinite",
              }}
            >
              {/* First set of stocks */}
              {stockData.slice(0, 6).map((stock, index) => (
                <div
                  key={`mobile-${stock.symbol}-${index}`}
                  className="flex items-center space-x-1 whitespace-nowrap min-w-max"
                >
                  <span className="font-semibold text-finance-teal">
                    {stock.name.length > 6
                      ? stock.name.substring(0, 6)
                      : stock.name}
                  </span>
                  <span className="text-foreground font-medium">
                    {formatPrice(stock.symbol, stock.price)}
                  </span>
                  <span
                    className={`font-medium ${
                      stock.change > 0
                        ? "text-finance-green"
                        : stock.change < 0
                          ? "text-finance-red"
                          : "text-finance-teal"
                    }`}
                  >
                    {stock.change > 0 ? "↗" : stock.change < 0 ? "↘" : "→"}
                    {Math.abs(stock.changePercent).toFixed(1)}%
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {stockData.slice(0, 6).map((stock, index) => (
                <div
                  key={`mobile-dup-${stock.symbol}-${index}`}
                  className="flex items-center space-x-1 whitespace-nowrap min-w-max"
                >
                  <span className="font-semibold text-finance-teal">
                    {stock.name.length > 6
                      ? stock.name.substring(0, 6)
                      : stock.name}
                  </span>
                  <span className="text-foreground font-medium">
                    {formatPrice(stock.symbol, stock.price)}
                  </span>
                  <span
                    className={`font-medium ${
                      stock.change > 0
                        ? "text-finance-green"
                        : stock.change < 0
                          ? "text-finance-red"
                          : "text-finance-teal"
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

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isMarketOpen() ? "bg-finance-green animate-pulse" : "bg-finance-red"}`}
              />
              <span className="text-foreground text-xs font-medium">
                Market {isMarketOpen() ? "Open" : "Closed"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`w-1 h-1 rounded-full ${
                  marketSentiment.sentiment === "bullish"
                    ? "bg-finance-green"
                    : marketSentiment.sentiment === "bearish"
                      ? "bg-finance-red"
                      : "bg-finance-teal"
                } animate-pulse`}
              />
              <span className="text-finance-teal text-xs font-medium capitalize">
                {marketSentiment.sentiment} ({marketSentiment.positiveStocks}/
                {marketSentiment.totalStocks})
              </span>
            </div>

            <div className="flex items-center space-x-2 text-finance-teal">
              <div className="w-1 h-1 rounded-full bg-finance-teal animate-pulse" />
              <span className="text-xs capitalize">{connectionStatus}</span>
            </div>

            <div className="text-finance-teal text-xs">
              {currentTime.toLocaleTimeString("en-IN")} IST
            </div>

            {isLoading && (
              <div className="flex items-center space-x-2 text-finance-teal text-xs">
                <div className="w-1 h-1 bg-finance-teal rounded-full animate-bounce" />
                <div
                  className="w-1 h-1 bg-finance-teal rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-1 h-1 bg-finance-teal rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <span className="ml-2">Loading...</span>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Updated: {lastUpdate.toLocaleTimeString("en-IN")}
            </div>
          </div>

          {/* Desktop Stock Ticker */}
          <div className="flex-1 overflow-hidden ml-8">
            <div
              className="flex space-x-6"
              style={{
                animation: "desktopTickerScroll 90s linear infinite",
              }}
            >
              {/* First set of stocks */}
              {stockData.map((stock, index) => (
                <div
                  key={`${stock.symbol}-${index}`}
                  className="flex items-center space-x-2 whitespace-nowrap min-w-max"
                >
                  <span className="font-semibold text-finance-teal text-xs">
                    {stock.name}
                  </span>
                  <span className="text-foreground font-medium text-xs">
                    {formatPrice(stock.symbol, stock.price)}
                  </span>
                  <span
                    className={`flex items-center space-x-1 font-medium text-xs ${
                      stock.change > 0
                        ? "text-finance-green"
                        : stock.change < 0
                          ? "text-finance-red"
                          : "text-finance-teal"
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
              {/* Duplicate set for seamless loop */}
              {stockData.map((stock, index) => (
                <div
                  key={`dup-${stock.symbol}-${index}`}
                  className="flex items-center space-x-2 whitespace-nowrap min-w-max"
                >
                  <span className="font-semibold text-finance-teal text-xs">
                    {stock.name}
                  </span>
                  <span className="text-foreground font-medium text-xs">
                    {formatPrice(stock.symbol, stock.price)}
                  </span>
                  <span
                    className={`flex items-center space-x-1 font-medium text-xs ${
                      stock.change > 0
                        ? "text-finance-green"
                        : stock.change < 0
                          ? "text-finance-red"
                          : "text-finance-teal"
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
  );
}
