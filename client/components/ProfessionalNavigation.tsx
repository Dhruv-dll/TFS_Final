import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import {
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  BarChart3,
  Users,
  Calendar,
  Building2,
  Mail,
} from "lucide-react";

interface ProfessionalNavigationProps {
  scrolled: boolean;
}

export default function ProfessionalNavigation({
  scrolled,
}: ProfessionalNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [sponsorsDropdownOpen, setSponsorsDropdownOpen] = useState(false);
  const { scrollToElement } = useSmoothScroll();

  const navItems = [
    {
      name: "About TFS",
      href: "#about",
      icon: BarChart3,
    },
    {
      name: "Events",
      href: "#",
      icon: Calendar,
      dropdown: [
        {
          name: "Saturday Sessions",
          href: "/events/saturday-sessions",
        },
        { name: "Networking", href: "/events/networking" },
        { name: "Flagship Conclave", href: "/events/conclave" },
        { type: "separator" },
        { name: "Upcoming Events", href: "/events/upcoming" },
      ],
    },
    {
      name: "Finsight",
      href: "#insights",
      icon: TrendingUp,
    },
    {
      name: "Sponsors",
      href: "#",
      icon: Building2,
      dropdown: [
        { name: "Past Sponsors", href: "/sponsors/past" },
        { name: "Present Sponsors", href: "/sponsors/present" },
      ],
    },
    {
      name: "Meet the Team",
      href: "#team",
      icon: Users,
    },
    {
      name: "Contact Us",
      href: "#contact",
      icon: Mail,
    },
  ];

  useEffect(() => {
    const handleClickOutside = () => {
      setEventsDropdownOpen(false);
      setSponsorsDropdownOpen(false);
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
          ? "backdrop-blur-lg bg-finance-navy/90 border-b border-finance-teal/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Professional Logo Section */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              {/* TFS Logo */}
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg border border-finance-teal/30 relative overflow-hidden"
                  style={{
                    backgroundImage:
                      "url(https://cdn.builder.io/api/v1/image/assets%2F929e4df9940a4d789ccda51924367667%2F738f11e9971c4f0f8ef4fd148b7ae990)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "60px",
                    height: "60px",
                  }}
                />
              </motion.div>

              {/* St. Xavier's Logo */}
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="flex items-center justify-center border border-finance-teal/30 rounded-lg"
                  style={{
                    backgroundImage:
                      "url(https://cdn.builder.io/api/v1/image/assets%2F929e4df9940a4d789ccda51924367667%2F73bba102e8354fd08a042b5f690f50cd)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "60px",
                    height: "60px",
                  }}
                />
              </motion.div>
            </div>

            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-finance-cyan finance-heading">
                The Finance Symposium
              </h1>
              <p className="text-sm text-finance-teal/80 professional-text">
                St. Xavier's College Mumbai
              </p>
            </div>
          </motion.div>

          {/* Professional Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.name === "Events") {
                          setEventsDropdownOpen(!eventsDropdownOpen);
                          setSponsorsDropdownOpen(false);
                        } else if (item.name === "Sponsors") {
                          setSponsorsDropdownOpen(!sponsorsDropdownOpen);
                          setEventsDropdownOpen(false);
                        }
                      }}
                      className="flex items-center space-x-2 text-foreground hover:text-finance-cyan transition-colors duration-300 px-4 py-2 rounded-md professional-text"
                      whileHover={{ scale: 1.02 }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </motion.button>

                    {/* Professional Dropdown Menu */}
                    <AnimatePresence>
                      {((item.name === "Events" && eventsDropdownOpen) ||
                        (item.name === "Sponsors" && sponsorsDropdownOpen)) && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full mt-2 w-56 backdrop-blur-lg bg-finance-navy-light/95 rounded-lg shadow-xl border border-finance-teal/20 overflow-hidden z-50 ${item.name === "Sponsors" ? "right-0" : "left-0"}`}
                        >
                          {item.dropdown.map((dropdownItem, dropdownIndex) => {
                            if (dropdownItem.type === "separator") {
                              return (
                                <div
                                  key={dropdownIndex}
                                  className="h-px bg-finance-teal/20 my-2 mx-4"
                                />
                              );
                            }
                            return (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.href}
                                className="flex items-center px-4 py-3 text-foreground hover:text-finance-teal hover:bg-finance-teal/10 transition-all duration-200 professional-text"
                              >
                                <span className="font-medium">
                                  {dropdownItem.name}
                                </span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToElement(item.href);
                      }
                    }}
                    className="flex items-center space-x-2 text-foreground hover:text-finance-cyan transition-colors duration-300 px-4 py-2 rounded-md professional-text"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Professional Mobile Menu Button - Enlarged for touch */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-4 rounded-lg backdrop-blur-md bg-finance-navy-light/30 border border-finance-teal/30 min-h-[48px] min-w-[48px] flex items-center justify-center"
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
                  <X className="w-6 h-6 text-finance-teal" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-finance-teal" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Professional Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 backdrop-blur-lg bg-finance-navy-light/95 rounded-lg p-4 border border-finance-teal/20"
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
                          onClick={() => {
                            if (item.name === "Events") {
                              setEventsDropdownOpen(!eventsDropdownOpen);
                            } else if (item.name === "Sponsors") {
                              setSponsorsDropdownOpen(!sponsorsDropdownOpen);
                            }
                          }}
                          className="flex items-center justify-between w-full text-left py-3 px-4 text-foreground hover:text-finance-teal hover:bg-finance-teal/10 rounded-lg transition-all duration-200 professional-text"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                        </button>

                        <AnimatePresence>
                          {((item.name === "Events" && eventsDropdownOpen) ||
                            (item.name === "Sponsors" &&
                              sponsorsDropdownOpen)) && (
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
                                        className="h-px bg-finance-teal/20 my-2"
                                      />
                                    );
                                  }
                                  return (
                                    <Link
                                      key={dropdownIndex}
                                      to={dropdownItem.href}
                                      className="flex items-center py-2 px-3 text-muted-foreground hover:text-finance-teal hover:bg-finance-teal/5 rounded-lg transition-colors duration-200 professional-text"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <span>{dropdownItem.name}</span>
                                    </Link>
                                  );
                                },
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 py-3 px-4 text-foreground hover:text-finance-teal hover:bg-finance-teal/10 rounded-lg transition-all duration-200 professional-text"
                        onClick={(e) => {
                          if (item.href.startsWith("#")) {
                            e.preventDefault();
                            scrollToElement(item.href);
                          }
                          setMobileMenuOpen(false);
                        }}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
