import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Instagram,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
  {
    icon: MessageCircle,
    href: "#",
    label: "Discord",
    color: "hover:text-purple-400",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            Ready to join our financial community? We'd love to hear from you.
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
                  className="flex items-start space-x-4 p-6 bg-white/95 rounded-xl border border-finance-teal/20 hover:border-finance-teal/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-finance-teal rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-finance-teal mb-1">
                      {info.title}
                    </h4>
                    <p className="text-finance-navy font-medium">
                      {info.details}
                    </p>
                    <p className="text-finance-navy/60 text-sm">
                      {info.subDetails}
                    </p>
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
                    className="w-12 h-12 bg-white/95 rounded-lg flex items-center justify-center border border-finance-teal/20 transition-all duration-300 text-finance-teal hover:border-finance-teal/60 hover:scale-110 shadow-lg"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/95 rounded-xl p-8 border border-finance-teal/20 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-finance-teal mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-finance-teal mb-2">
                    Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="bg-white border-finance-teal/30 text-finance-navy placeholder-finance-navy/50 focus:border-finance-teal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-finance-teal mb-2">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="bg-white border-finance-teal/30 text-finance-navy placeholder-finance-navy/50 focus:border-finance-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-finance-teal mb-2">
                  Subject
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  className="bg-white border-finance-teal/30 text-finance-navy placeholder-finance-navy/50 focus:border-finance-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-finance-teal mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more..."
                  rows={6}
                  className="bg-white border-finance-teal/30 text-finance-navy placeholder-finance-navy/50 focus:border-finance-teal resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-finance-teal text-white hover:bg-finance-teal-dark transition-all duration-300"
                size="lg"
              >
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
