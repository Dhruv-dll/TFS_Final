import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, Briefcase, FileText } from "lucide-react";

const bafFeatures = [
  {
    icon: BookOpen,
    title: "Programme Overview",
    description:
      "Comprehensive 3-year undergraduate program in accounting and finance",
  },
  {
    icon: FileText,
    title: "Curriculum Structure",
    description: "Updated content designed for professional development",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description: "Transform yourself through professional expertise",
  },
  {
    icon: GraduationCap,
    title: "University Affiliation",
    description: "Affiliated to the University of Mumbai",
  },
];

export default function AboutBAFSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="about-baf"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundColor: "#112240", // Solid dark blue background
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            About <span className="text-finance-teal">BAF</span>
          </h2>
          <div className="w-24 h-1 bg-finance-teal mx-auto mb-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-finance-teal mb-6">
              Bachelor of Accounting and Finance
            </h3>
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <div>
                <h4 className="text-xl font-semibold text-finance-teal mb-3">
                  BAF Programme Foundation
                </h4>
                <p className="text-lg">
                  The BAF programme was effectively initiated at St. Xavier's
                  College from start of academic year 2022-23, as a self
                  –financed 3-year undergraduate program affiliated to the
                  University of Mumbai. The aim is to provide solid platform of
                  updated content in the domain field to students who wish to
                  transform themselves through professional in the field of
                  accounting and finance.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {bafFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className="bg-finance-navy-light/95 border border-finance-teal/30 p-6 rounded-xl text-center transform transition-all duration-300 group-hover:border-finance-teal/50 shadow-lg hover:shadow-xl">
                  <feature.icon className="w-8 h-8 mx-auto mb-3 text-finance-teal" />
                  <div className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </div>
                  <div className="text-white/80 text-xs leading-tight">
                    {feature.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional BAF Information */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-finance-navy-light/95 border border-finance-teal/30 p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-finance-teal mb-3">
              Programme Duration
            </h4>
            <p className="text-white/80">
              3-year undergraduate program with comprehensive curriculum
            </p>
          </div>

          <div className="bg-finance-navy-light/95 border border-finance-teal/30 p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-finance-teal mb-3">
              University Affiliation
            </h4>
            <p className="text-white/80">
              Affiliated to the University of Mumbai with recognized degree
            </p>
          </div>

          <div className="bg-finance-navy-light/95 border border-finance-teal/30 p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-finance-teal mb-3">
              Professional Focus
            </h4>
            <p className="text-white/80">
              Designed for career transformation in accounting and finance
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
