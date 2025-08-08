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
        return "text-finance-green";
      case "bearish":
        return "text-finance-red";
      default:
        return "text-finance-electric";
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
          boxShadow: "0 0 60px rgba(0, 212, 204, 0.15), 0 25px 50px rgba(0, 0, 0, 0.3)",
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
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-finance-gold via-finance-electric to-finance-teal bg-clip-text text-transparent">
                    Market Central
                  </span>
                  <span className="text-xs text-finance-electric/80 font-medium">
                    Real-time Financial Data
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`bg-finance-green/10 border-finance-green/40 text-finance-green text-xs font-medium transition-all duration-300 ${
                      connectionStatus === "connected" ? "animate-pulse" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {connectionStatus === "connected" && <Wifi className="w-3 h-3" />}
                      {connectionStatus === "loading" && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw className="w-3 h-3" />
                        </motion.div>
                      )}
                      {connectionStatus === "error" && <WifiOff className="w-3 h-3" />}
                      <span>
                        {connectionStatus === "connected" && "LIVE"}
                        {connectionStatus === "loading" && "SYNC"}
                        {connectionStatus === "error" && "OFFLINE"}
                      </span>
                    </div>
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-finance-navy-light/30 border-finance-gold/30 text-finance-gold text-xs"
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
                  className="border-finance-gold/40 text-finance-gold hover:bg-finance-gold/15 hover:border-finance-gold/60 transition-all duration-300 group"
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  className="text-finance-electric hover:bg-finance-red/20 hover:text-finance-red transition-colors"
                >
                  <X className="w-4 h-4" />
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
                  {errorMessage || "Unable to fetch real-time market data. Showing cached information."}
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
                <TabsList className="grid w-full grid-cols-3 bg-finance-navy-light/30 backdrop-blur-sm border border-finance-gold/20 rounded-xl p-1">
                  <TabsTrigger
                    value="stocks"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-finance-gold data-[state=active]:to-finance-electric data-[state=active]:text-finance-navy font-semibold transition-all duration-300 data-[state=active]:shadow-lg rounded-lg"
                  >
                    <Building2 className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Stocks</span>
                    <span className="sm:hidden">📈</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="currencies"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-finance-gold data-[state=active]:to-finance-electric data-[state=active]:text-finance-navy font-semibold transition-all duration-300 data-[state=active]:shadow-lg rounded-lg"
                  >
                    <Globe className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Forex</span>
                    <span className="sm:hidden">💱</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="summary"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-finance-gold data-[state=active]:to-finance-electric data-[state=active]:text-finance-navy font-semibold transition-all duration-300 data-[state=active]:shadow-lg rounded-lg"
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
                        <h3 className="text-lg sm:text-xl font-bold text-finance-gold mb-1">
                          Indian Equity Markets
                        </h3>
                        <p className="text-sm text-finance-electric/80">
                          Real-time prices from NSE & BSE • {marketData.stocks.length} instruments
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0 flex items-center gap-2">
                        <Badge variant="outline" className="bg-finance-green/10 border-finance-green/40 text-finance-green text-xs">
                          {marketData.stocks.filter(s => s.change > 0).length} ↑
                        </Badge>
                        <Badge variant="outline" className="bg-finance-red/10 border-finance-red/40 text-finance-red text-xs">
                          {marketData.stocks.filter(s => s.change < 0).length} ↓
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
                                <div className="w-2 h-2 bg-finance-green rounded-full animate-pulse" />
                              ) : stock.change < 0 ? (
                                <div className="w-2 h-2 bg-finance-red rounded-full animate-pulse" />
                              ) : (
                                <div className="w-2 h-2 bg-finance-electric rounded-full" />
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
                                        {stock.marketState === "REGULAR" ? "LIVE" : "CLOSED"}
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
                                  <span>H: {formatPrice(stock.symbol, stock.dayHigh)}</span>
                                  <span>L: {formatPrice(stock.symbol, stock.dayLow)}</span>
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
                    <h3 className="text-lg font-semibold text-finance-gold mb-4">
                      💱 Currency Exchange Rates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {marketData.currencies.map((currency) => (
                        <motion.div
                          key={currency.symbol}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-finance-navy-light/30 border border-finance-gold/10 hover:border-finance-gold/30 transition-all duration-300 cursor-pointer hover:bg-finance-navy-light/50"
                          onClick={() => handleCurrencyClick(currency)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-finance-gold">
                                {currency.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {currency.symbol}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-foreground">
                                ₹{currency.rate.toFixed(4)}
                              </div>
                              {currency.change !== 0 && (
                                <div
                                  className={`text-xs ${
                                    currency.change > 0
                                      ? "text-finance-green"
                                      : currency.change < 0
                                        ? "text-finance-red"
                                        : "text-finance-electric"
                                  }`}
                                >
                                  <span>
                                    {currency.change > 0 ? "+" : ""}
                                    {currency.change.toFixed(4)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="summary" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <Card className="bg-finance-navy-light/50 border-finance-gold/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-muted-foreground">
                            Market Sentiment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-2">
                            <TrendingUp
                              className={`w-5 h-5 ${getSentimentColor(marketData.sentiment.sentiment)}`}
                            />
                            <span
                              className={`font-bold capitalize ${getSentimentColor(marketData.sentiment.sentiment)}`}
                            >
                              {marketData.sentiment.sentiment}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-finance-navy-light/50 border-finance-gold/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-muted-foreground">
                            Total Gainers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-lg font-bold text-finance-green">
                            {marketData.sentiment.positiveStocks}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            of {marketData.sentiment.totalStocks} stocks
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-finance-navy-light/50 border-finance-gold/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-muted-foreground">
                            Total Losers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-lg font-bold text-finance-red">
                            {marketData.sentiment.totalStocks -
                              marketData.sentiment.positiveStocks}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            of {marketData.sentiment.totalStocks} stocks
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-finance-navy-light/50 border-finance-gold/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-muted-foreground">
                            Last Update
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-finance-electric">
                            {safeFormatTimestamp(lastUpdate)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="text-center text-muted-foreground">
                      <p>
                        Switch between tabs to view detailed information about
                        stocks and currencies.
                      </p>
                    </div>
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
