import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Award, Target } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1000+",
    label: "Active Members",
  },
  {
    icon: TrendingUp,
    value: "50+",
    label: "Industry Partners",
  },
  {
    icon: Award,
    value: "25+",
    label: "Annual Events",
  },
  {
    icon: Target,
    value: "5+",
    label: "Years of Excellence",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundColor: "#101E36", // Solid navy background
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={isMobile ? { duration: 0 } : { duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            About <span className="text-finance-teal">TFS</span>
          </h2>
          <div className="w-24 h-1 bg-finance-teal mx-auto mb-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={
              isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.2 }
            }
          >
            <h3 className="text-3xl font-bold text-finance-teal mb-6">
              Bridging Theory and Practice in Finance
            </h3>
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <div>
                <h4 className="text-xl font-semibold text-finance-teal mb-3">
                  Our Story
                </h4>
                <p className="text-lg">
                  The Finance Symposium (TFS) is a flagship initiative by the
                  Department of Accounting and Finance at St. Xavier's College, Mumbai.
                  TFS is not merely an event; it is an invaluable experience where all the different
                  dimensions of finance are explored effortlessly converging with knowledge based
                  amusement, knowledge which fosters innovation, networking which cultivates
                  opportunities. Get ready to be engrossed in stimulating discussions, gaining
                  insights from the industry stalwarts and top business leaders, and enjoy an
                  invigorating atmosphere designed to both inspire and educate.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={
              isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.4 }
            }
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={
                  isMobile
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={
                  isMobile
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.6 + index * 0.1 }
                }
                className="relative group"
              >
                <div className="bg-finance-navy-light/95 border border-finance-teal/30 p-6 rounded-xl text-center transform transition-all duration-300 group-hover:border-finance-teal/50 shadow-lg hover:shadow-xl">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-finance-teal" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
