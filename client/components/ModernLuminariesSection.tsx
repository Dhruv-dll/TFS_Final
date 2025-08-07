import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  Linkedin,
  Star,
  Users,
  Crown,
  Sparkles,
  Brain,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
  achievements: string[];
  expertise: string[];
  quote: string;
  isLeadership?: boolean;
}

// Enhanced team data with more details
const facultyMembers: TeamMember[] = [
  {
    id: "sanjay-parab",
    name: "Dr. Sanjay Parab",
    title: "Vice Principal and Associate Professor",
    bio: "Dr. Sanjay Parab, Vice Principal and Associate Professor, holds multiple qualifications including M.Com., M.A., M.Phil., Ph.D., LL.M., and FCS, with over 21 years of teaching experience. He has a keen research interest in Corporate Governance, Business Administration, and Corporate Finance, and was a university topper in Company Law during his LLB.",
    image: "/placeholder.svg",
    email: "sanjay.parab@xaviers.edu",
    linkedin: "sanjay-parab",
    achievements: [
      "M.Com., M.A., M.Phil., Ph.D., LL.M., FCS",
      "Over 21 years of teaching experience",
      "University topper in Company Law (LLB)",
      "Vice Principal and Associate Professor",
    ],
    expertise: [
      "Corporate Governance",
      "Business Administration",
      "Corporate Finance",
      "Company Law",
    ],
    quote:
      "Excellence in corporate governance and finance education drives sustainable business growth.",
  },
  {
    id: "pratik-purohit",
    name: "Mr. Pratik Purohit",
    title: "Assistant Professor",
    bio: "Mr. Pratik Purohit, Assistant Professor, holds an M.Com. in Accountancy, PGDFM, and M.Phil., and is currently pursuing a Ph.D. With 6 years of teaching experience, his research interests lie in Accountancy and Finance, Business Policy and Administration, and Management.",
    image: "/placeholder.svg",
    email: "pratik.purohit@xaviers.edu",
    linkedin: "pratik-purohit",
    achievements: [
      "M.Com. in Accountancy, PGDFM, M.Phil.",
      "Currently pursuing Ph.D.",
      "6 years of teaching experience",
      "Assistant Professor",
    ],
    expertise: [
      "Accountancy and Finance",
      "Business Policy and Administration",
      "Management",
    ],
    quote:
      "Integrating theoretical knowledge with practical management approaches creates well-rounded financial professionals.",
  },
  {
    id: "kamalika-ray",
    name: "Ms. Kamalika Ray",
    title: "Assistant Professor",
    bio: "Ms. Kamalika Ray, Assistant Professor, holds an M.Com. in Accountancy, PGDBA (Finance), EPG in Data Analytics, and is a Certified TRP, currently pursuing a Ph.D. With 3 years of teaching experience, her research interests include Accountancy and Finance, ESG, and Personal Finance.",
    image: "/placeholder.svg",
    email: "kamalika.ray@xaviers.edu",
    achievements: [
      "M.Com. in Accountancy, PGDBA (Finance)",
      "EPG in Data Analytics, Certified TRP",
      "Currently pursuing Ph.D.",
      "3 years of teaching experience",
    ],
    expertise: [
      "Accountancy and Finance",
      "ESG",
      "Personal Finance",
      "Data Analytics",
    ],
    quote:
      "Empowering students with data-driven financial insights and sustainable investment practices.",
  },
  {
    id: "vinayak-thool",
    name: "Mr. Vinayak Thool",
    title: "Assistant Professor",
    bio: "Mr. Vinayak Thool, Assistant Professor, holds an M.Com. degree and has 2 years of teaching experience. His research interests include Accountancy, Finance, and Digital Governance.",
    image: "/placeholder.svg",
    email: "vinayak.thool@xaviers.edu",
    achievements: [
      "M.Com. degree",
      "2 years of teaching experience",
      "Assistant Professor",
    ],
    expertise: ["Accountancy", "Finance", "Digital Governance"],
    quote:
      "Digital governance in finance ensures transparency and efficiency in modern financial systems.",
  },
  {
    id: "lloyd-serrao",
    name: "Mr. Lloyd Serrao",
    title: "Assistant Professor",
    bio: "Mr. Lloyd Serrao, Assistant Professor, is a C.S., L.L.B., and Associate Member of ICSI with over five years of experience in corporate filings, FEMA, IBC, and compliances. With 2 years of teaching experience, his research interests include Finance, Corporate and Commercial Laws, and Banking.",
    image: "/placeholder.svg",
    email: "lloyd.serrao@xaviers.edu",
    achievements: [
      "C.S., L.L.B., Associate Member of ICSI",
      "Over 5 years experience in corporate filings",
      "Expert in FEMA, IBC, and compliances",
      "2 years of teaching experience",
    ],
    expertise: [
      "Finance",
      "Corporate and Commercial Laws",
      "Banking",
      "Corporate Compliance",
    ],
    quote:
      "Understanding legal frameworks is essential for sound financial decision-making and corporate compliance.",
  },
];

const leadershipMembers: TeamMember[] = [
  {
    id: "aaradhy-mehra",
    name: "Aaradhy Mehra",
    title: "Chairperson – The Finance Symposium (TFS)",
    bio: "Aaradhy Mehra is a driven student-leader and aspiring entrepreneur from the BAF batch of 2026–27 at St. Xavier's College, Mumbai. As Chairperson of The Finance Symposium, he curates strategic initiatives that connect finance, innovation, and enterprise through student-led forums and industry collaborations. He serves as Editor-in-Chief of Currency of Change, leading its editorial vision while mentoring contributors. A former Summer Intern at SBI Securities and a CUET 98%iler, Aaradhy pairs strong analytical thinking with a forward-looking approach to market trends and institutional strategy. His deep interests in technology, automobiles, and design reflect in his digital presence, where he has garnered over 1.5 million views on YouTube and built a professional network of 5,000+ followers on LinkedIn.",
    image: "/placeholder.svg",
    email: "aaradhy.mehra@student.xaviers.edu",
    linkedin: "aaradhy-mehra",
    achievements: [
      "SBI Securities Summer Intern",
      "CUET 98%iler",
      "Editor-in-Chief – Currency of Change",
      "1.5M+ Views Digital Creator",
      "5,000+ LinkedIn Followers",
      "Sub-Head of Design – The Business Conference 2023–24",
    ],
    expertise: [
      "Strategic Leadership",
      "Editorial Management",
      "Digital Content Creation",
      "Financial Analysis",
      "Visual Storytelling",
    ],
    quote:
      "Balancing entrepreneurial curiosity with creative insight, exemplifying next-gen leadership rooted in impact, innovation, and influence.",
    isLeadership: true,
  },
  {
    id: "akarsh-ojha",
    name: "Akarsh Ojha",
    title: "Vice Chairperson – Networking, The Finance Society (TFS) 2025",
    bio: "Akarsh Ojha is currently pursuing a Bachelor's in Accounting and Finance at St. Xavier's College, Mumbai, and serves as the Vice Chairperson – Networking at The Finance Society (TFS) 2025. In this role, he leads strategic outreach, fostering connections with alumni, industry experts, and institutions across India and abroad. A Godha Family Scholar (2023) and Visiting Student at the University of Oxford (Trinity Term 2025) under the Betty and Keating Scholarship, Akarsh blends academic excellence with cross-disciplinary curiosity. He is the author of Nothing but Only You, a nationally acclaimed poetry collection, and a winner of multiple national literary and aptitude competitions, including an All India Rank 1 in a reasoning challenge. Raised in a remote village in Bihar, his journey from limited resources to global platforms reflects resilience, vision, and a deep belief in education as a force for transformation.",
    image: "/placeholder.svg",
    email: "akarsh.ojha@student.xaviers.edu",
    linkedin: "akarsh-ojha",
    achievements: [
      "Godha Family Scholar (2023)",
      "Visiting Student – University of Oxford (Trinity Term 2025)",
      "Betty and Keating Scholarship Recipient",
      "Author of 'Nothing but Only You'",
      "All India Rank 1 – Reasoning Challenge",
      "Multiple National Literary Competition Winner",
    ],
    expertise: [
      "Strategic Networking",
      "Cross-disciplinary Research",
      "Literary Writing",
      "Educational Leadership",
      "International Relations",
    ],
    quote:
      "Education as a force for transformation can bridge any gap between limited resources and global opportunities.",
    isLeadership: true,
  },
  {
    id: "jatin-phulwani",
    name: "Jatin Phulwani",
    title: "Vice Chairperson – Management, The Finance Symposium (TFS)",
    bio: "Jatin Phulwani is the only second-year student in the core trio of The Finance Symposium (TFS), where he serves as Vice Chairperson – Management. He is a two-time elected Course Representative of the BAF batch and a member of the Student Council at St. Xavier's College, Mumbai. Jatin has consistently led from the front, playing a pivotal role in streamlining internal operations, enabling team synergy, and ensuring flawless execution of the committee's flagship initiatives. As Organiser (OG) – Admin for Malhar 2025, one of India's largest student-run college festivals, he contributes with strategic foresight and unmatched precision. Crowned Mr. DPS at his school convocation — the highest honour awarded to a student — Jatin's leadership journey began early. He has earned certifications from IIM Bangalore, Wharton, and BCG, with expertise spanning strategy, consulting, and finance.",
    image: "/placeholder.svg",
    email: "jatin.phulwani@student.xaviers.edu",
    linkedin: "jatin-phulwani",
    achievements: [
      "Mr. DPS – Highest School Honour",
      "Certifications from IIM-B, Wharton & BCG",
      "Organiser (OG) – Admin, Malhar 2025",
      "Two-time elected Course Representative",
      "Student Council Member",
      "National Bronze Medalist – Cycle Polo",
      "NCC 'A' Certificate Holder",
      "State Rank #1 – Spell Bee",
      "Intern – Chtrbox",
    ],
    expertise: [
      "Strategic Management",
      "Operations Excellence",
      "Event Administration",
      "Team Leadership",
      "Marketing Strategy",
      "Process Optimization",
    ],
    quote:
      "Collaborative leadership and deep commitment to impact drives changemaking with an eye on the future.",
    isLeadership: true,
  },
];

export default function ModernLuminariesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeGroup, setActiveGroup] = useState<"faculty" | "leadership">(
    "faculty",
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const facultyButtonRef = useRef<HTMLButtonElement>(null);
  const leadershipButtonRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });

  const updateSliderPosition = () => {
    const activeButton =
      activeGroup === "faculty"
        ? facultyButtonRef.current
        : leadershipButtonRef.current;
    if (activeButton) {
      setSliderStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      });
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Update slider position when active group changes
    updateSliderPosition();
  }, [activeGroup]);

  useEffect(() => {
    // Update slider position after initial render
    const timer = setTimeout(updateSliderPosition, 100);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Simple scroll effects
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const currentMembers =
    activeGroup === "faculty" ? facultyMembers : leadershipMembers;

  const MemberCard = ({
    member,
    index,
  }: {
    member: TeamMember;
    index: number;
  }) => {
    const isHovered = hoveredCard === member.id;

    return (
      <div
        className="relative group"
        onMouseEnter={() => setHoveredCard(member.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Professional Card Container */}
        <motion.div
          className="relative h-80 sm:h-96"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Main Professional Card */}
          <motion.div
            className="relative h-full bg-finance-navy-light border border-finance-teal/30 rounded-xl overflow-hidden cursor-pointer shadow-lg"
            onClick={() => setSelectedMember(member)}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 12px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 212, 204, 0.4)",
              borderColor: "rgba(0, 212, 204, 0.6)",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Leadership Badge - Positioned absolutely in top-right */}
            {member.isLeadership && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-finance-teal text-white font-semibold px-2 py-1 text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Leadership
                </Badge>
              </div>
            )}

            {/* Professional Card Content */}
            <div className="relative h-full p-6 flex flex-col">
              {/* Header with Professional Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-finance-teal/10 border border-finance-teal/20 flex items-center justify-center">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-finance-teal" />
                </div>
              </div>

              {/* Professional Member Info - flex-1 to take available space */}
              <div className="text-center space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {member.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/80 font-medium leading-tight px-2">
                    {member.title}
                  </p>

                  {/* Professional Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-center px-2">
                    {member.expertise.slice(0, 2).map((skill, i) => (
                      <span
                        key={skill}
                        className="text-xs bg-finance-teal/20 text-finance-teal border border-finance-teal/30 px-2 py-1 rounded-lg font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Professional CTA Button - Always at bottom */}
                <div className="pt-2">
                  <Button
                    size="sm"
                    className="bg-finance-teal text-white hover:bg-finance-teal-dark hover:shadow-lg transition-all duration-300 px-4 py-2 font-semibold border border-finance-teal/30"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        backgroundColor: "#112240", // Solid dark blue background
      }}
    >
      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 212, 204, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 204, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Meet Our <span className="text-finance-teal">Luminaries</span>
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-finance-teal mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover the brilliant minds shaping the future of finance
            education. Our distinguished faculty and visionary student leaders
            are here to guide your journey.
          </p>
        </motion.div>

        {/* Group Selector */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative bg-finance-navy-medium/80 backdrop-blur-xl rounded-xl p-1 border border-finance-teal/30 shadow-lg">
            <motion.div
              className="absolute top-1 bottom-1 bg-finance-teal rounded-lg shadow-md"
              animate={{
                width: sliderStyle.width,
                left: sliderStyle.left,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            <div className="relative flex space-x-1">
              <Button
                ref={facultyButtonRef}
                variant="ghost"
                size="lg"
                onClick={() => setActiveGroup("faculty")}
                className={`relative z-10 px-6 py-3 transition-colors duration-300 ${
                  activeGroup === "faculty"
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Star className="w-5 h-5 mr-2" />
                Faculty Excellence
              </Button>

              <Button
                ref={leadershipButtonRef}
                variant="ghost"
                size="lg"
                onClick={() => setActiveGroup("leadership")}
                className={`relative z-10 px-6 py-3 transition-colors duration-300 ${
                  activeGroup === "leadership"
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Crown className="w-5 h-5 mr-2" />
                Student Leadership
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Members Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-0"
          >
            {currentMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-finance-navy-light border border-finance-teal/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative p-8 pb-6">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-finance-teal/10 hover:bg-finance-teal/20 transition-colors border border-finance-teal/20"
                  >
                    <X className="w-6 h-6 text-finance-teal" />
                  </motion.button>

                  <div className="flex items-start space-x-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                      className="relative"
                    >
                      <div className="w-24 h-24 rounded-2xl bg-finance-teal/20 border border-finance-teal/30 flex items-center justify-center">
                        <Users className="w-12 h-12 text-finance-teal" />
                      </div>
                      {selectedMember.isLeadership && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-finance-teal text-white font-bold">
                            <Crown className="w-3 h-3" />
                          </Badge>
                        </div>
                      )}
                    </motion.div>

                    <div className="flex-1">
                      <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-white mb-2"
                      >
                        {selectedMember.name}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/80 mb-4"
                      >
                        {selectedMember.title}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex space-x-3"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-finance-teal border border-finance-teal/30 hover:bg-finance-teal/10"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        {selectedMember.linkedin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-finance-teal border border-finance-teal/30 hover:bg-finance-teal/10"
                          >
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </Button>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bio & Quote */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h4 className="text-lg font-semibold text-finance-teal mb-3">
                          About
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {selectedMember.bio}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="relative p-4 rounded-xl bg-finance-teal/5 border border-finance-teal/10"
                      >
                        <div className="text-4xl text-finance-teal/20 mb-2">
                          "
                        </div>
                        <p className="text-white/90 italic text-sm">
                          {selectedMember.quote}
                        </p>
                      </motion.div>
                    </div>

                    {/* Achievements & Expertise */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <h4 className="text-lg font-semibold text-finance-teal mb-3 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-finance-teal" />
                          Achievements
                        </h4>
                        <div className="space-y-2">
                          {selectedMember.achievements.map(
                            (achievement, index) => (
                              <motion.div
                                key={achievement}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                                className="flex items-center space-x-2 text-white/80 text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-finance-teal rounded-full" />
                                <span>{achievement}</span>
                              </motion.div>
                            ),
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                      >
                        <h4 className="text-lg font-semibold text-finance-teal mb-3 flex items-center">
                          <Brain className="w-5 h-5 mr-2 text-finance-teal" />
                          Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.expertise.map((skill, index) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 1.1 + index * 0.1,
                                type: "spring",
                                bounce: 0.4,
                              }}
                              className="px-3 py-1 text-xs bg-finance-teal/20 border border-finance-teal/30 rounded-lg text-white/90"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
