import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Building2,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  finnhubMarketDataService,
  FinnhubStockData,
  MarketSentiment,
  CurrencyRate,
  safeFormatTimestamp,
} from "../services/finnhubMarketData";
import { MarketDataLoader } from "./MarketDataErrorBoundary";

interface TabbedMarketDashboardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TabbedMarketDashboard({
  isOpen,
  onOpenChange,
}: TabbedMarketDashboardProps) {
  const [marketData, setMarketData] = useState<{
    stocks: FinnhubStockData[];
    sentiment: MarketSentiment;
    currencies: CurrencyRate[];
  }>({
    stocks: [],
    sentiment: {
      sentiment: "neutral",
      advanceDeclineRatio: 0.5,
      positiveStocks: 0,
      totalStocks: 0,
    },
    currencies: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "loading" | "error"
  >("loading");
  const [dataJustUpdated, setDataJustUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState("stocks");

  useEffect(() => {
    setConnectionStatus("loading");
    const unsubscribe = finnhubMarketDataService.subscribeToUpdates((data) => {
      try {
        setMarketData({
          stocks: data.stocks || [],
          sentiment: data.sentiment || {
            sentiment: "neutral",
            advanceDeclineRatio: 0.5,
            positiveStocks: 0,
            totalStocks: 0,
          },
          currencies: data.currencies || [],
        });
        setLastUpdate(new Date());
        setConnectionStatus("connected");
        setIsLoading(false);
        setErrorMessage("");

        // Flash effect when new data arrives
        setDataJustUpdated(true);
        setTimeout(() => setDataJustUpdated(false), 1000);
      } catch (error) {
        console.error("Error processing market data:", error);
        setConnectionStatus("error");
        setErrorMessage(error.message || "Failed to process market data");
      }
    });

    return unsubscribe;
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    setConnectionStatus("loading");
    setErrorMessage("");

    try {
      await finnhubMarketDataService.updateAllData();
    } catch (error) {
      setConnectionStatus("error");
      setErrorMessage(error.message || "Failed to refresh data");
      setIsLoading(false);
    }
  };

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

  const formatPrice = (symbol: string, price: number) => {
    if (symbol.includes("^")) {
      return price.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return `₹${price.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Ensure percentage is properly displayed
  const formatPercentage = (changePercent: number | undefined | null) => {
    if (
      changePercent === undefined ||
      changePercent === null ||
      isNaN(changePercent)
    ) {
      return "0.00%";
    }
    return `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(2)}%`;
  };

  // Navigation handlers for clickable items
  const handleStockClick = (stock: FinnhubStockData) => {
    // Create Google search URL for stock current price
    const searchQuery = `${stock.displayName || stock.name} current stock price`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(url, "_blank");
  };

  const handleCurrencyClick = (currency: CurrencyRate) => {
    // Create Google search URL for currency conversion
    const searchQuery = `${currency.name} current exchange rate conversion`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-6xl lg:max-w-7xl max-h-[95vh] bg-gradient-to-br from-finance-navy/98 via-finance-navy-medium/95 to-finance-navy-light/92 backdrop-blur-2xl border border-finance-gold/30 text-foreground shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(11, 20, 38, 0.98) 0%, rgba(26, 43, 66, 0.95) 50%, rgba(42, 59, 82, 0.92) 100%)",
          boxShadow:
            "0 0 60px rgba(0, 212, 204, 0.15), 0 25px 50px rgba(0, 0, 0, 0.3)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DialogHeader>
            <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3 flex-1">
                <motion.div
                  className="relative"
                  animate={{
                    rotate: dataJustUpdated ? [0, 360] : 0,
                    scale: dataJustUpdated ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-finance-gold/20 rounded-full blur-sm animate-pulse" />
                  <BarChart3 className="relative w-6 h-6 sm:w-7 sm:h-7 text-finance-gold drop-shadow-lg" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-finance-teal via-finance-teal-green to-finance-teal-mint bg-clip-text text-transparent">
                    Market Central
                  </span>
                  <span className="text-xs text-finance-electric/80 font-medium">
                    Real-time Financial Data
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`bg-finance-teal-green/10 border-finance-teal-green/40 text-finance-teal-green text-xs font-medium transition-all duration-300 ${
                      connectionStatus === "connected" ? "animate-pulse" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {connectionStatus === "connected" && (
                        <Wifi className="w-3 h-3" />
                      )}
                      {connectionStatus === "loading" && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <RefreshCw className="w-3 h-3" />
                        </motion.div>
                      )}
                      {connectionStatus === "error" && (
                        <WifiOff className="w-3 h-3" />
                      )}
                      <span>
                        {connectionStatus === "connected" && "LIVE"}
                        {connectionStatus === "loading" && "SYNC"}
                        {connectionStatus === "error" && "OFFLINE"}
                      </span>
                    </div>
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-finance-navy-light/30 border-finance-teal/30 text-finance-teal text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {safeFormatTimestamp(lastUpdate)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="border-finance-teal/40 text-finance-teal hover:bg-finance-teal/15 hover:border-finance-teal/60 transition-all duration-300 group"
                >
                  <motion.div
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={{
                      duration: 1,
                      repeat: isLoading ? Infinity : 0,
                      ease: "linear",
                    }}
                  >
                    <RefreshCw className="w-4 h-4 group-hover:text-white transition-colors" />
                  </motion.div>
                  <span className="ml-2 hidden sm:inline">
                    {isLoading ? "Syncing..." : "Refresh"}
                  </span>
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Error State */}
          <AnimatePresence>
            {connectionStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gradient-to-r from-finance-red/10 to-finance-red/5 border border-finance-red/30 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <AlertTriangle className="w-5 h-5 text-finance-red" />
                  </motion.div>
                  <span className="text-sm font-semibold text-finance-red">
                    Connection Interrupted
                  </span>
                </div>
                <div className="text-xs text-foreground/70 mb-3">
                  {errorMessage ||
                    "Unable to fetch real-time market data. Showing cached information."}
                </div>
                <Button
                  onClick={handleRefresh}
                  size="sm"
                  className="bg-finance-red/20 text-finance-red hover:bg-finance-red/30 border border-finance-red/30 transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Connection
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {connectionStatus === "loading" && (
            <MarketDataLoader message="Fetching comprehensive market data..." />
          )}

          {/* Tabbed Content */}
          {connectionStatus === "connected" && (
            <div className="mt-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-finance-navy-light/30 backdrop-blur-sm border border-finance-teal/20 rounded-xl p-1">
                  <TabsTrigger
                    value="stocks"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-finance-teal data-[state=active]:to-finance-teal-green data-[state=active]:text-finance-navy font-semibold transition-all duration-300 data-[state=active]:shadow-lg rounded-lg"
                  >
                    <Building2 className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Stocks</span>
                    <span className="sm:hidden">📈</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="currencies"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-finance-teal data-[state=active]:to-finance-teal-green data-[state=active]:text-finance-navy font-semibold transition-all duration-300 data-[state=active]:shadow-lg rounded-lg"
                  >
                    <Globe className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Forex</span>
                    <span className="sm:hidden">💱</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="summary"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-finance-teal data-[state=active]:to-finance-teal-green data-[state=active]:text-finance-navy font-semibold transition-all duration-300 data-[state=active]:shadow-lg rounded-lg"
                  >
                    <BarChart3 className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Overview</span>
                    <span className="sm:hidden">📊</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stocks" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-finance-teal mb-1">
                          Indian Equity Markets
                        </h3>
                        <p className="text-sm text-finance-teal-mint/80">
                          Real-time prices from NSE & BSE •{" "}
                          {marketData.stocks.length} instruments
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-finance-teal-green/10 border-finance-teal-green/40 text-finance-teal-green text-xs"
                        >
                          {marketData.stocks.filter((s) => s.change > 0).length}{" "}
                          ↑
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-finance-red/10 border-finance-red/40 text-finance-red text-xs"
                        >
                          {marketData.stocks.filter((s) => s.change < 0).length}{" "}
                          ↓
                        </Badge>
                      </div>
                    </div>

                    <ScrollArea className="h-[50vh] sm:h-[400px] pr-2">
                      <div className="grid gap-3">
                        {marketData.stocks.map((stock, index) => (
                          <motion.div
                            key={stock.symbol}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                            className="group relative p-4 rounded-xl bg-gradient-to-r from-finance-navy-light/20 via-finance-navy-medium/15 to-finance-navy-light/10 border border-finance-gold/15 hover:border-finance-gold/40 transition-all duration-300 cursor-pointer hover:bg-finance-navy-light/25 hover:shadow-lg hover:shadow-finance-gold/10"
                            onClick={() => handleStockClick(stock)}
                            whileHover={{ scale: 1.01, y: -2 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {/* Trending indicator */}
                            <div className="absolute top-3 left-3 flex items-center">
                              {stock.change > 0 ? (
                                <div className="w-2 h-2 bg-finance-teal-green rounded-full animate-pulse" />
                              ) : stock.change < 0 ? (
                                <div className="w-2 h-2 bg-finance-red rounded-full animate-pulse" />
                              ) : (
                                <div className="w-2 h-2 bg-finance-teal rounded-full" />
                              )}
                            </div>

                            <div className="flex items-start justify-between ml-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                  <div>
                                    <h4 className="font-bold text-finance-gold text-sm sm:text-base truncate group-hover:text-finance-electric transition-colors">
                                      {stock.displayName || stock.name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-muted-foreground font-mono">
                                        {stock.symbol}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs px-2 py-0 ${
                                          stock.marketState === "REGULAR"
                                            ? "bg-finance-green/15 border-finance-green/40 text-finance-green"
                                            : "bg-finance-red/15 border-finance-red/40 text-finance-red"
                                        }`}
                                      >
                                        {stock.marketState === "REGULAR"
                                          ? "LIVE"
                                          : "CLOSED"}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {/* Mobile: Price info below on small screens */}
                                <div className="mt-3 sm:hidden">
                                  <div className="text-xl font-bold text-foreground">
                                    {formatPrice(stock.symbol, stock.price)}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div
                                      className={`flex items-center gap-1 text-sm font-semibold ${
                                        stock.change > 0
                                          ? "text-finance-green"
                                          : stock.change < 0
                                            ? "text-finance-red"
                                            : "text-finance-electric"
                                      }`}
                                    >
                                      {stock.change > 0 ? (
                                        <ArrowUpRight className="w-3 h-3" />
                                      ) : stock.change < 0 ? (
                                        <ArrowDownRight className="w-3 h-3" />
                                      ) : (
                                        <div className="w-3 h-3" />
                                      )}
                                      <span>
                                        {stock.change > 0 ? "+" : ""}
                                        {stock.change.toFixed(2)}
                                      </span>
                                    </div>
                                    <span
                                      className={`text-sm ${
                                        stock.change > 0
                                          ? "text-finance-green"
                                          : stock.change < 0
                                            ? "text-finance-red"
                                            : "text-finance-electric"
                                      }`}
                                    >
                                      ({formatPercentage(stock.changePercent)})
                                    </span>
                                  </div>
                                </div>

                                {/* Day range */}
                                <div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-3">
                                  <span>
                                    H:{" "}
                                    {formatPrice(stock.symbol, stock.dayHigh)}
                                  </span>
                                  <span>
                                    L: {formatPrice(stock.symbol, stock.dayLow)}
                                  </span>
                                  <span className="text-finance-electric">
                                    🕐 {safeFormatTimestamp(stock.timestamp)}
                                  </span>
                                </div>
                              </div>

                              {/* Desktop: Price info on the right */}
                              <div className="hidden sm:block text-right ml-4">
                                <div className="text-xl font-bold text-foreground mb-1">
                                  {formatPrice(stock.symbol, stock.price)}
                                </div>
                                <div
                                  className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                                    stock.change > 0
                                      ? "text-finance-green"
                                      : stock.change < 0
                                        ? "text-finance-red"
                                        : "text-finance-electric"
                                  }`}
                                >
                                  {stock.change > 0 ? (
                                    <ArrowUpRight className="w-4 h-4" />
                                  ) : stock.change < 0 ? (
                                    <ArrowDownRight className="w-4 h-4" />
                                  ) : (
                                    <div className="w-4 h-4" />
                                  )}
                                  <div className="text-right">
                                    <div>
                                      {stock.change > 0 ? "+" : ""}
                                      {stock.change.toFixed(2)}
                                    </div>
                                    <div className="text-xs">
                                      ({formatPercentage(stock.changePercent)})
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-finance-gold/5 to-finance-electric/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </motion.div>
                </TabsContent>

                <TabsContent value="currencies" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-finance-gold mb-1">
                          Foreign Exchange Rates
                        </h3>
                        <p className="text-sm text-finance-electric/80">
                          Live INR conversion rates •{" "}
                          {marketData.currencies.length} major currencies
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="mt-3 sm:mt-0 bg-finance-teal/10 border-finance-teal/40 text-finance-teal text-xs"
                      >
                        24h Active
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {marketData.currencies.map((currency, index) => (
                        <motion.div
                          key={currency.symbol}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="group relative p-5 rounded-xl bg-gradient-to-br from-finance-navy-light/25 via-finance-navy-medium/20 to-finance-navy-light/15 border border-finance-gold/20 hover:border-finance-teal/50 transition-all duration-300 cursor-pointer hover:bg-finance-navy-light/30 hover:shadow-xl hover:shadow-finance-teal/10"
                          onClick={() => handleCurrencyClick(currency)}
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Currency pair header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-finance-teal to-finance-electric flex items-center justify-center">
                                <span className="text-xs font-bold text-finance-navy">
                                  {currency.name.split("/")[0]}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-bold text-finance-gold text-sm group-hover:text-finance-teal transition-colors">
                                  {currency.name}
                                </h4>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {currency.symbol}
                                </span>
                              </div>
                            </div>

                            {/* Trend indicator */}
                            {currency.change !== 0 && (
                              <div
                                className={`p-1 rounded-full ${
                                  currency.change > 0
                                    ? "bg-finance-green/20"
                                    : "bg-finance-red/20"
                                }`}
                              >
                                {currency.change > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-finance-green" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-finance-red" />
                                )}
                              </div>
                            )}
                          </div>

                          {/* Exchange rate */}
                          <div className="text-center mb-3">
                            <div className="text-2xl font-bold text-foreground mb-1">
                              ₹{currency.rate.toFixed(4)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              1 {currency.name.split("/")[0]} ={" "}
                              {currency.rate.toFixed(4)} INR
                            </div>
                          </div>

                          {/* Change information */}
                          {currency.change !== 0 && (
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <div
                                className={`flex items-center gap-1 text-sm font-semibold ${
                                  currency.change > 0
                                    ? "text-finance-green"
                                    : "text-finance-red"
                                }`}
                              >
                                {currency.change > 0 ? (
                                  <ArrowUpRight className="w-3 h-3" />
                                ) : (
                                  <ArrowDownRight className="w-3 h-3" />
                                )}
                                <span>
                                  {currency.change > 0 ? "+" : ""}
                                  {currency.change.toFixed(4)}
                                </span>
                              </div>
                              <span
                                className={`text-xs ${
                                  currency.change > 0
                                    ? "text-finance-green"
                                    : "text-finance-red"
                                }`}
                              >
                                ({currency.changePercent > 0 ? "+" : ""}
                                {currency.changePercent.toFixed(2)}%)
                              </span>
                            </div>
                          )}

                          {/* Last updated */}
                          <div className="text-center text-xs text-finance-electric/60">
                            Updated: {safeFormatTimestamp(currency.timestamp)}
                          </div>

                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-finance-teal/5 to-finance-electric/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                          {/* Border glow effect */}
                          <div
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-finance-teal/20 to-finance-electric/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(0, 212, 204, 0.1), transparent)",
                              animation: "border-flow 3s ease-in-out infinite",
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Empty state */}
                    {marketData.currencies.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <Globe className="w-12 h-12 mx-auto mb-4 text-finance-electric/50" />
                        <p className="text-muted-foreground">
                          No currency data available
                        </p>
                        <Button
                          onClick={handleRefresh}
                          size="sm"
                          className="mt-3 bg-finance-teal/20 text-finance-teal hover:bg-finance-teal/30"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh Data
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="summary" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-finance-gold mb-1">
                        Market Overview
                      </h3>
                      <p className="text-sm text-finance-electric/80">
                        Real-time market analysis and sentiment indicators
                      </p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                      {/* Market Sentiment */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Card className="bg-gradient-to-br from-finance-navy-light/40 to-finance-navy-medium/30 border-finance-gold/30 hover:border-finance-gold/50 transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div
                                className={`p-2 rounded-full ${
                                  marketData.sentiment.sentiment === "bullish"
                                    ? "bg-finance-green/20"
                                    : marketData.sentiment.sentiment ===
                                        "bearish"
                                      ? "bg-finance-red/20"
                                      : "bg-finance-electric/20"
                                }`}
                              >
                                {marketData.sentiment.sentiment ===
                                "bullish" ? (
                                  <TrendingUp className="w-4 h-4 text-finance-green" />
                                ) : marketData.sentiment.sentiment ===
                                  "bearish" ? (
                                  <TrendingDown className="w-4 h-4 text-finance-red" />
                                ) : (
                                  <Activity className="w-4 h-4 text-finance-electric" />
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                Sentiment
                              </span>
                            </div>
                            <div
                              className={`text-lg font-bold capitalize ${getSentimentColor(marketData.sentiment.sentiment)}`}
                            >
                              {marketData.sentiment.sentiment}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {(
                                marketData.sentiment.advanceDeclineRatio * 100
                              ).toFixed(1)}
                              % bullish ratio
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Gainers */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Card className="bg-gradient-to-br from-finance-green/10 to-finance-green/5 border-finance-green/30 hover:border-finance-green/50 transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="p-2 rounded-full bg-finance-green/20">
                                <ArrowUpRight className="w-4 h-4 text-finance-green" />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                Gainers
                              </span>
                            </div>
                            <div className="text-lg font-bold text-finance-green">
                              {marketData.sentiment.positiveStocks}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              of {marketData.sentiment.totalStocks} stocks
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Losers */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <Card className="bg-gradient-to-br from-finance-red/10 to-finance-red/5 border-finance-red/30 hover:border-finance-red/50 transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="p-2 rounded-full bg-finance-red/20">
                                <ArrowDownRight className="w-4 h-4 text-finance-red" />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                Decliners
                              </span>
                            </div>
                            <div className="text-lg font-bold text-finance-red">
                              {marketData.sentiment.totalStocks -
                                marketData.sentiment.positiveStocks}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              of {marketData.sentiment.totalStocks} stocks
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Last Update */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <Card className="bg-gradient-to-br from-finance-electric/10 to-finance-teal/5 border-finance-electric/30 hover:border-finance-electric/50 transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="p-2 rounded-full bg-finance-electric/20">
                                <Clock className="w-4 h-4 text-finance-electric" />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                Updated
                              </span>
                            </div>
                            <div className="text-sm font-bold text-finance-electric">
                              {safeFormatTimestamp(lastUpdate)}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Live data stream
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Market Status */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="mb-6"
                    >
                      <Card className="bg-gradient-to-r from-finance-navy-light/30 to-finance-navy-medium/20 border-finance-gold/20">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-lg font-bold text-finance-gold mb-2">
                                Market Status
                              </h4>
                              <div className="flex items-center gap-3">
                                <Badge
                                  variant="outline"
                                  className={`${
                                    finnhubMarketDataService.isMarketOpen()
                                      ? "bg-finance-green/20 border-finance-green/50 text-finance-green"
                                      : "bg-finance-red/20 border-finance-red/50 text-finance-red"
                                  }`}
                                >
                                  {finnhubMarketDataService.isMarketOpen()
                                    ? "MARKET OPEN"
                                    : "MARKET CLOSED"}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {finnhubMarketDataService.isMarketOpen()
                                    ? "Live trading session"
                                    : "Next session: 9:15 AM IST"}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-finance-electric mb-1">
                                Data Sources
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>NSE • BSE • Yahoo Finance</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="text-center"
                    >
                      <h4 className="text-sm font-semibold text-finance-gold mb-3">
                        Quick Navigation
                      </h4>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveTab("stocks")}
                          className="w-full sm:w-auto border-finance-gold/30 text-finance-gold hover:bg-finance-gold/10"
                        >
                          <Building2 className="w-4 h-4 mr-2" />
                          View Stocks
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveTab("currencies")}
                          className="w-full sm:w-auto border-finance-teal/30 text-finance-teal hover:bg-finance-teal/10"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          View Forex
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRefresh}
                          disabled={isLoading}
                          className="w-full sm:w-auto border-finance-electric/30 text-finance-electric hover:bg-finance-electric/10"
                        >
                          <RefreshCw
                            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                          />
                          Refresh All
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
