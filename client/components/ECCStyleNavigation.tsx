import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Calendar,
  TrendingUp,
  Building2,
  Users,
  Mail,
  BarChart3,
} from "lucide-react";
import { useMarketDashboard } from "../contexts/MarketDashboardContext";

interface ECCStyleNavigationProps {
  scrolled: boolean;
}

export default function ECCStyleNavigation({
  scrolled,
}: ECCStyleNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { scrollToElement } = useSmoothScroll();
  const { toggleOpen } = useMarketDashboard();

  // Single-page navigation structure (anchor-based scrolling)
  const navItems = [
    {
      name: "HOME",
      href: "#home",
      icon: Home,
    },
    {
      name: "ABOUT",
      href: "#about",
      icon: Info,
      dropdown: [
        { name: "About TFS", href: "#about", icon: "📊" },
        { name: "About BAF", href: "#about-baf", icon: "🎓" },
        { name: "Meet Our Luminaries", href: "#luminaries", icon: "⭐" },
      ],
    },
    {
      name: "EVENTS",
      href: "#events",
      icon: Calendar,
      dropdown: [
        { name: "Saturday Sessions", href: "#events", icon: "📚" },
        { name: "Networking Events", href: "#events", icon: "🤝" },
        { name: "Flagship Conclave", href: "#events", icon: "🏆" },
        { type: "separator" },
        { name: "Upcoming Events", href: "#events", icon: "📅" },
      ],
    },
    {
      name: "FINSIGHT",
      href: "#insights",
      icon: TrendingUp,
    },
    {
      name: "SPONSORS",
      href: "#sponsors",
      icon: Building2,
      dropdown: [{ name: "Our Partners", href: "#sponsors", icon: "🤝" }],
    },
    {
      name: "CONTACT",
      href: "#contact",
      icon: Mail,
    },
  ];

  // Get current active section based on scroll position
  const getCurrentSection = () => {
    const sections = [
      "home",
      "about",
      "about-baf",
      "luminaries",
      "events",
      "insights",
      "sponsors",
      "contact",
    ];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          return `#${section}`;
        }
      }
    }

    // Default to home if at top
    if (window.scrollY < 100) {
      return "#home";
    }

    return null;
  };

  // Calculate highlight bar position and width
  const updateHighlight = (element: HTMLElement | null) => {
    if (element && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = element.getBoundingClientRect();

      setHighlightStyle({
        width: itemRect.width,
        left: itemRect.left - navRect.left,
      });
    }
  };

  // Handle mouse enter for highlight
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    updateHighlight(event.currentTarget);
  };

  // Handle mouse leave to reset highlight
  const handleMouseLeave = () => {
    // Find active menu item based on current scroll position
    const currentSection = getCurrentSection();
    const activeItem = navItems.find((item) => item.href === currentSection);

    if (activeItem) {
      const activeElement = navRef.current?.querySelector(
        `[data-nav-item="${activeItem.name}"]`,
      ) as HTMLElement;
      updateHighlight(activeElement);
    } else {
      setHighlightStyle({ width: 0, left: 0 });
    }
  };

  // Initialize highlight and handle scroll-based highlighting
  useEffect(() => {
    const handleScroll = () => {
      handleMouseLeave(); // Update highlight based on current section
    };

    const timer = setTimeout(() => {
      handleMouseLeave();
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle dropdown toggles
  const handleDropdownToggle = (itemName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenu(activeMenu === itemName ? null : itemName);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-finance-navy/90 border-b border-finance-teal/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      {/* ECC Points style background effect */}
      {scrolled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-finance-navy/40 via-finance-navy-light/30 to-finance-navy/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      <div className="container mx-auto px-6 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo Section - ECC Points Style */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* College Logo */}
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-finance-navy border border-finance-teal/40 rounded-lg overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F929e4df9940a4d789ccda51924367667%2F73bba102e8354fd08a042b5f690f50cd"
                  alt="St. Xavier's College"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* TFS Logo */}
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-finance-navy border border-finance-teal/40 rounded-lg overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F929e4df9940a4d789ccda51924367667%2F738f11e9971c4f0f8ef4fd148b7ae990"
                  alt="The Finance Symposium"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Title */}
            <div className="hidden sm:block">
              <h1 className="text-sm md:text-lg font-bold text-finance-teal">
                The Finance Symposium
              </h1>
              <p className="text-xs text-muted-foreground">
                St. Xavier's College Mumbai
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation - ECC Points Style */}
          <div className="hidden lg:flex items-center">
            <div
              ref={navRef}
              className="relative flex items-center space-x-1"
              onMouseLeave={handleMouseLeave}
            >
              {/* Dynamic Highlight Bar */}
              <motion.div
                className="absolute top-0 h-full bg-finance-teal/20 rounded-lg border border-finance-teal/40"
                style={{
                  width: highlightStyle.width,
                  left: highlightStyle.left,
                }}
                initial={false}
                animate={{
                  width: highlightStyle.width,
                  left: highlightStyle.left,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8,
                }}
              />

              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        data-nav-item={item.name}
                        onClick={(e) => handleDropdownToggle(item.name, e)}
                        onMouseEnter={handleMouseEnter}
                        className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-foreground hover:text-finance-teal transition-all duration-300 relative z-10 whitespace-nowrap"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            activeMenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeMenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full mt-2 min-w-[200px] backdrop-blur-xl bg-finance-navy/90 rounded-lg shadow-2xl border border-finance-teal/20 overflow-hidden z-50"
                          >
                            {item.dropdown.map(
                              (dropdownItem, dropdownIndex) => {
                                if (dropdownItem.type === "separator") {
                                  return (
                                    <div
                                      key={dropdownIndex}
                                      className="h-px bg-gradient-to-r from-transparent via-finance-teal/40 to-transparent my-2 mx-4"
                                    />
                                  );
                                }
                                return (
                                  <button
                                    key={dropdownIndex}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      scrollToElement(dropdownItem.href);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:text-finance-teal hover:bg-finance-teal/10 transition-all duration-200"
                                  >
                                    <span className="text-base">
                                      {dropdownItem.icon}
                                    </span>
                                    <span>{dropdownItem.name}</span>
                                  </button>
                                );
                              },
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      data-nav-item={item.name}
                      onMouseEnter={handleMouseEnter}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToElement(item.href);
                      }}
                      className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-foreground hover:text-finance-teal transition-all duration-300 relative z-10 whitespace-nowrap"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-finance-navy/50 border border-finance-teal/30 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-finance-teal" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-finance-teal" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 backdrop-blur-xl bg-finance-navy/80 rounded-lg p-4 border border-finance-teal/20 overflow-hidden"
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={(e) => handleDropdownToggle(item.name, e)}
                          className="flex items-center justify-between w-full text-left py-3 px-4 text-foreground hover:text-finance-teal hover:bg-finance-teal/10 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeMenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeMenu === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-6 mt-2 space-y-1 overflow-hidden"
                            >
                              {item.dropdown.map(
                                (dropdownItem, dropdownIndex) => {
                                  if (dropdownItem.type === "separator") {
                                    return (
                                      <div
                                        key={dropdownIndex}
                                        className="h-px bg-gradient-to-r from-transparent via-finance-teal/40 to-transparent my-2"
                                      />
                                    );
                                  }
                                  return (
                                    <button
                                      key={dropdownIndex}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        scrollToElement(dropdownItem.href);
                                        setMobileMenuOpen(false);
                                        setActiveMenu(null);
                                      }}
                                      className="w-full flex items-center space-x-3 py-2 px-3 text-sm text-muted-foreground hover:text-finance-teal hover:bg-finance-teal/5 rounded-lg transition-colors duration-200"
                                    >
                                      <span>{dropdownItem.icon}</span>
                                      <span>{dropdownItem.name}</span>
                                    </button>
                                  );
                                },
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToElement(item.href);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 py-3 px-4 text-foreground hover:text-finance-teal hover:bg-finance-teal/10 rounded-lg transition-all duration-200"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    )}
                  </motion.div>
                ))}

                {/* Market Dashboard Button for Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                >
                  <button
                    onClick={() => {
                      toggleOpen();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 py-3 px-4 text-foreground hover:text-finance-teal hover:bg-finance-teal/10 rounded-lg transition-all duration-200 border-t border-finance-teal/20 mt-2 pt-4"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="font-medium">Market Dashboard</span>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-finance-green rounded-full animate-pulse"></div>
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
