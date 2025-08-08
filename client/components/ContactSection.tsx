import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Linkedin,
  ExternalLink,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: "St. Xavier's College, Mumbai",
    subDetails: "5, Mahapalika Marg, Mumbai 400001",
  },
  {
    icon: Mail,
    title: "Email",
    details: "thefinancesymposiumm@gmail.com",
    subDetails: "For all inquiries and partnerships",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/tfs.sxc/#",
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/the-finance-symposium/",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: ExternalLink,
    href: "https://linktr.ee/tfs.sxc",
    label: "Linktree",
    color: "hover:text-green-400",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundColor: "#12333E", // Solid dark teal background
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
            Get In <span className="text-finance-teal">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-finance-teal mx-auto mb-6" />
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Ready to join our financial community? TFS is proudly organized by
            the Department of Accounting and Finance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-finance-teal mb-8">
              Let's Connect
            </h3>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-finance-navy-light/95 rounded-xl border border-finance-teal/30 hover:border-finance-teal/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-finance-teal rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-finance-teal mb-1">
                      {info.title}
                    </h4>
                    <p className="text-white/90 font-medium">{info.details}</p>
                    <p className="text-white/70 text-sm">{info.subDetails}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-8"
            >
              <h4 className="text-xl font-semibold text-finance-teal mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-finance-navy-light/95 rounded-lg flex items-center justify-center border border-finance-teal/30 transition-all duration-300 text-finance-teal hover:border-finance-teal/60 hover:scale-110 shadow-lg"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-finance-navy-light/95 rounded-xl p-8 border border-finance-teal/30 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-finance-teal mb-6">
              Find Us Here
            </h3>

            <div className="relative w-full h-96 rounded-lg overflow-hidden border border-finance-teal/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.746413032561!2d72.82893677580397!3d18.94261545614518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b870ba222b0b%3A0xa35fb09925b0951d!2sSt.%20Xavier&#39;s%20College%20(Autonomous)!5e0!3m2!1sen!2sin!4v1754624006174!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="St. Xavier's College, Mumbai Location"
                className="filter brightness-90 contrast-110"
              />
            </div>

            <div className="mt-6 p-4 bg-finance-navy-medium/50 rounded-lg border border-finance-teal/20">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-finance-teal flex-shrink-0" />
                <div>
                  <p className="text-white/90 font-medium">
                    St. Xavier's College, Mumbai
                  </p>
                  <p className="text-white/70 text-sm">
                    5, Mahapalika Marg, Mumbai 400001
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
