import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  finnhubMarketDataService,
  FinnhubStockData,
  MarketSentiment,
  safeFormatTimestamp,
} from "../services/finnhubMarketData";
import { ChevronDown, ExternalLink } from "lucide-react";
import FixedMobileTicker from "./FixedMobileTicker";

// Professional Market Ticker
function ProfessionalMarketTicker() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stockData, setStockData] = useState<FinnhubStockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [marketSentiment, setMarketSentiment] = useState<MarketSentiment>({
    sentiment: "neutral",
    advanceDeclineRatio: 0.5,
    positiveStocks: 0,
    totalStocks: 0,
  });
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "reconnecting"
  >("connected");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setConnectionStatus("reconnecting");
    const unsubscribe = finnhubMarketDataService.subscribeToUpdates((data) => {
      setStockData(data.stocks);
      setMarketSentiment(data.sentiment);
      setLastUpdate(new Date());
      setIsLoading(false);
      setConnectionStatus("connected");
    });

    return unsubscribe;
  }, []);

  const isMarketOpen = () => {
    return finnhubMarketDataService.isMarketOpen();
  };

  const getSentimentColor = () => {
    switch (marketSentiment.sentiment) {
      case "bullish":
        return "from-finance-teal/20 to-finance-cyan/5";
      case "bearish":
        return "from-finance-red/20 to-finance-red/5";
      default:
        return "from-finance-cyan/20 to-finance-teal/5";
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-finance-teal";
      case "disconnected":
        return "text-finance-red";
      case "reconnecting":
        return "text-finance-cyan";
    }
  };

  const formatPrice = (symbol: string, price: number) => {
    if (symbol.includes("^")) {
      return price.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return `₹${price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <FixedMobileTicker
      stockData={stockData}
      isMarketOpen={isMarketOpen}
      marketSentiment={marketSentiment}
      connectionStatus={connectionStatus}
      isLoading={isLoading}
      lastUpdate={lastUpdate}
    />
  );
}

export default function ProfessionalHeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  // Subtle parallax effects
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 0.9]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden performance-optimized bg-finance-navy">
      {/* Professional Background Video */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: videoOpacity }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source
            src="https://cdn.builder.io/o/assets%2Fe85dfdd564234742bab315fb42ca6cc0%2Fcdaa0c914f444ba09397c133c8f6cab0?alt=media&token=89c8ffc7-fcb7-4ac8-95e3-4e03a2ebfee4&apiKey=e85dfdd564234742bab315fb42ca6cc0"
            type="video/mp4"
          />
          {/* Fallback background color matching our palette */}
          <div className="w-full h-full bg-finance-navy" />
        </video>
      </motion.div>

      {/* Professional Overlay - Enhanced for video background */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(11, 20, 38, 0.8) 0%, rgba(26, 43, 66, 0.6) 50%, rgba(30, 58, 95, 0.5) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* Additional overlay for better text contrast */}
      <div
        className="absolute inset-0 z-15"
        style={{
          background: "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Geometric wireframe pattern overlay - Using CSS classes instead of inline styles */}
      <div className="absolute inset-0 z-20 opacity-15 bg-gradient-to-br from-finance-teal/20 via-transparent to-finance-cyan/10" />

      {/* Hero Content */}
      <motion.div
        className="relative z-30 h-full flex items-center justify-center"
        style={{ y: textY }}
      >
        <div className="text-center px-6 max-w-6xl mx-auto">
          {/* Professional Typography */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight finance-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block text-finance-cyan font-light mb-2 drop-shadow-lg">
              The Finance
            </span>
            <span className="block text-white font-bold drop-shadow-xl">
              Symposium
            </span>
            <span className="block text-finance-teal text-2xl md:text-4xl lg:text-5xl font-normal mt-4 drop-shadow-lg">
              2025-2026
            </span>
          </motion.h1>

          {/* Department Initiative Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-finance-teal/20 to-finance-cyan/20 border border-finance-teal/50 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-finance-teal rounded-full mr-3 animate-pulse"></div>
              <span className="text-finance-teal font-semibold text-sm md:text-base tracking-wide">
                AN INITIATIVE BY DEPARTMENT OF ACCOUNTING AND FINANCE
              </span>
            </div>
          </motion.div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-4 leading-relaxed">
              Bridging Present & Future of Finance
            </p>
            <p className="text-lg md:text-xl text-finance-cyan font-medium">
              St. Xavier's College Mumbai
            </p>
          </motion.div>

          {/* Call-to-Action Buttons - Mobile Optimized */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.button
              className="w-full md:w-auto px-8 py-4 bg-finance-teal hover:bg-finance-teal-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px] professional-text"
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const eventsSection = document.getElementById("events");
                if (eventsSection) {
                  eventsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Events
            </motion.button>

            <motion.a
              href="https://xaviers.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-8 py-4 border-2 border-finance-teal text-finance-teal hover:bg-finance-teal hover:text-white transition-all duration-300 rounded-lg font-semibold shadow-lg hover:shadow-xl min-h-[48px] flex items-center justify-center space-x-2 professional-text"
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Visit College Website</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            onClick={scrollToNextSection}
          >
            <motion.div
              className="flex flex-col items-center space-y-2 text-finance-teal"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Professional Market Ticker */}
      <ProfessionalMarketTicker />
    </section>
  );
}
