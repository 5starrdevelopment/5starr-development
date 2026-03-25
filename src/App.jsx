import { useState, useEffect } from "react";

// ─── SVG Logo Component ───
const StarrLogo = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A843" />
        <stop offset="50%" stopColor="#F0D78C" />
        <stop offset="100%" stopColor="#D4A843" />
      </linearGradient>
    </defs>
    <polygon
      points="50,8 61,38 93,38 67,56 76,88 50,70 24,88 33,56 7,38 39,38"
      fill="url(#goldGrad)" stroke="#F0D78C" strokeWidth="1"
    />
    <text x="50" y="58" textAnchor="middle" fill="#0A0E1A" fontFamily="Georgia, serif" fontWeight="bold" fontSize="28">5</text>
  </svg>
);

const StarAccent = ({ className = "" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4A843" className={className}>
    <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
  </svg>
);

// ─── Shared Styles ───
const cardStyle = {
  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,168,67,0.12)",
  borderRadius: 8, padding: 32, position: "relative", overflow: "hidden",
};
const goldTopBar = {
  position: "absolute", top: 0, left: 0, right: 0, height: 3,
  background: "linear-gradient(90deg, transparent, #D4A843, transparent)",
};
const tagStyle = {
  fontFamily: "'Oswald', sans-serif", fontSize: 10, color: "#D4A843",
  letterSpacing: 2, textTransform: "uppercase",
  background: "rgba(212,168,67,0.1)", padding: "3px 10px", borderRadius: 3,
  display: "inline-block",
};
const bodyFont = { fontFamily: "'Libre Baskerville', serif", fontSize: 14, color: "#8A8FA3", lineHeight: 1.8 };
const headingFont = (size = 20) => ({ fontFamily: "'Oswald', sans-serif", fontSize: size, color: "#F0D78C", letterSpacing: 2, margin: 0 });

// ─── Navigation ───
const NAV_ITEMS = ["Home", "About", "Services", "Player Cards", "Accessibility", "Book Now"];

const Navigation = ({ currentPage, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,14,26,0.97)" : "rgba(10,14,26,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid rgba(212,168,67,0.2)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("Home")}>
          <StarrLogo size={36} />
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 18, color: "#F0D78C", letterSpacing: 2, lineHeight: 1 }}>5-STARR</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 10, color: "#8A8FA3", letterSpacing: 4, lineHeight: 1 }}>DEVELOPMENT</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => setPage(item)} style={{
              background: item === "Book Now" ? "linear-gradient(135deg, #D4A843, #B8902F)" : "none",
              border: "none", padding: item === "Book Now" ? "8px 18px" : "8px 11px",
              color: currentPage === item ? "#F0D78C" : item === "Book Now" ? "#0A0E1A" : "#C8CCD8",
              fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: currentPage === item ? 600 : 400,
              letterSpacing: 1.2, cursor: "pointer", borderRadius: item === "Book Now" ? 4 : 0,
              textTransform: "uppercase", transition: "all 0.3s",
              borderBottom: currentPage === item && item !== "Book Now" ? "2px solid #D4A843" : "2px solid transparent",
            }}>
              {item}
            </button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", color: "#F0D78C", fontSize: 28, cursor: "pointer",
        }} className="mobile-menu-btn">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "rgba(10,14,26,0.98)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }} className="mobile-menu">
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => { setPage(item); setMenuOpen(false); }} style={{
              background: item === "Book Now" ? "linear-gradient(135deg, #D4A843, #B8902F)" : "none",
              border: "none", padding: "12px 0", textAlign: "left",
              color: item === "Book Now" ? "#0A0E1A" : "#C8CCD8",
              fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 400,
              letterSpacing: 1.5, cursor: "pointer", textTransform: "uppercase",
              borderRadius: item === "Book Now" ? 4 : 0,
            }}>
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── Hero Section ───
const HeroSection = ({ setPage }) => (
  <section style={{
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden",
    background: "linear-gradient(135deg, #0A0E1A 0%, #111833 40%, #0A0E1A 100%)",
  }}>
    <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)" }} />
    <div style={{ position: "absolute", top: 0, right: "10%", width: 1, height: "40%", background: "linear-gradient(to bottom, transparent, rgba(212,168,67,0.3), transparent)", transform: "rotate(15deg)" }} />
    <div style={{ position: "absolute", bottom: 0, left: "15%", width: 1, height: "35%", background: "linear-gradient(to top, transparent, rgba(212,168,67,0.2), transparent)", transform: "rotate(-10deg)" }} />
    <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "120px 24px 80px" }}>
      <div style={{ animation: "fadeInDown 1s ease", display: "inline-block", marginBottom: 24 }}><StarrLogo size={80} /></div>
      <h1 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(48px, 8vw, 96px)", color: "#FFFFFF", letterSpacing: 6, lineHeight: 1, margin: 0, animation: "fadeInUp 1s ease 0.2s both" }}>5-STARR</h1>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: "clamp(18px, 3vw, 32px)", color: "#D4A843", letterSpacing: 12, margin: "4px 0 32px", animation: "fadeInUp 1s ease 0.4s both" }}>DEVELOPMENT</h2>
      <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #D4A843, transparent)", margin: "0 auto 28px", animation: "fadeInUp 1s ease 0.5s both" }} />
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(18px, 2.5vw, 26px)", color: "#8A8FA3", margin: "0 auto 12px", maxWidth: 500, animation: "fadeInUp 1s ease 0.6s both" }}>Earned Not Given</p>
      <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 14, color: "#5A5F73", letterSpacing: 4, textTransform: "uppercase", margin: "0 0 48px", animation: "fadeInUp 1s ease 0.7s both" }}>Elite Player Development — Youth to Pro</p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 1s ease 0.8s both" }}>
        <button onClick={() => setPage("Book Now")} style={{ background: "linear-gradient(135deg, #D4A843, #B8902F)", border: "none", padding: "14px 36px", color: "#0A0E1A", fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: 2, cursor: "pointer", borderRadius: 4, textTransform: "uppercase" }}>Book A Session</button>
        <button onClick={() => setPage("Services")} style={{ background: "transparent", border: "1px solid rgba(212,168,67,0.4)", padding: "14px 36px", color: "#D4A843", fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 400, letterSpacing: 2, cursor: "pointer", borderRadius: 4, textTransform: "uppercase" }}>View Services</button>
      </div>
    </div>
  </section>
);

// ─── Section Helpers ───
const Section = ({ children, bg = "transparent" }) => (
  <section style={{ padding: "100px 24px", background: bg, position: "relative" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
  </section>
);

const SectionTitle = ({ pre, title, sub }) => (
  <div style={{ textAlign: "center", marginBottom: 60 }}>
    {pre && <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: 4, color: "#D4A843", textTransform: "uppercase", margin: "0 0 8px" }}>{pre}</p>}
    <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", color: "#FFFFFF", letterSpacing: 3, margin: "0 0 16px" }}>{title}</h2>
    <div style={{ width: 40, height: 2, margin: "0 auto 16px", background: "#D4A843" }} />
    {sub && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#8A8FA3", maxWidth: 560, margin: "0 auto", fontStyle: "italic" }}>{sub}</p>}
  </div>
);

const GoldButton = ({ onClick, children, full = false }) => (
  <button onClick={onClick} style={{
    background: "linear-gradient(135deg, #D4A843, #B8902F)", border: "none",
    padding: "14px 40px", color: "#0A0E1A", fontFamily: "'Oswald', sans-serif",
    fontSize: 15, fontWeight: 600, letterSpacing: 2, cursor: "pointer", borderRadius: 4,
    textTransform: "uppercase", width: full ? "100%" : "auto",
  }}>{children}</button>
);

// ─── About Page ───
const AboutPage = () => (
  <>
    <div style={{ paddingTop: 80 }} />
    <Section bg="#0A0E1A">
      <SectionTitle pre="The Story" title="ABOUT COACH STARR" sub="Have Fun. Get Better." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, maxWidth: 800, margin: "0 auto" }}>
        <div style={{ ...cardStyle, padding: 40 }}>
          <p style={{ ...bodyFont, fontSize: 16, color: "#C8CCD8", lineHeight: 1.9, margin: "0 0 20px" }}>Chris Starr didn't take the traditional path to coaching — and that's exactly what makes him different. He left an MBA, a Master's in Management Information Technology, and a corporate consulting career to pursue the work that actually mattered: developing young people through basketball.</p>
          <p style={{ ...bodyFont, fontSize: 16, color: "#C8CCD8", lineHeight: 1.9, margin: "0 0 20px" }}>Today he coaches high school basketball in Oklahoma City across varsity, JV, and freshman levels, has directed an AAU program, and has assisted in training NBA players, overseas professionals, and high-level college athletes. His work spans every level of the game — but his coaching identity goes far beyond it.</p>
          <p style={{ ...bodyFont, fontSize: 16, color: "#C8CCD8", lineHeight: 1.9, margin: "0 0 20px" }}>Chris operates where five disciplines intersect: motor learning science, analytics, human development, philosophy, and basketball craft. Influenced by Timothy Gallwey's Inner Game — the idea that a coach's job is to remove interference, not add instruction — he builds environments where players don't just follow commands. They think. They decide. They grow.</p>
          <p style={{ ...bodyFont, fontSize: 16, color: "#C8CCD8", lineHeight: 1.9, margin: 0 }}>The gym is one of the best classrooms in the world — if you design it right. Whether you're a player chasing the next level or a coach looking to think differently about your craft, this is a space built for people who want to earn everything they get.</p>
        </div>

        {/* Standards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 8, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: "#D4A843", letterSpacing: 2, marginBottom: 8 }}>EARNED NOT GIVEN</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#8A8FA3", fontStyle: "italic" }}>The standard</div>
          </div>
          <div style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 8, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: "#D4A843", letterSpacing: 2, marginBottom: 8 }}>HAVE FUN. GET BETTER.</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#8A8FA3", fontStyle: "italic" }}>The culture</div>
          </div>
        </div>

        {/* Five disciplines */}
        <div style={{ background: "rgba(212,168,67,0.06)", borderLeft: "3px solid #D4A843", padding: "24px 28px", borderRadius: "0 8px 8px 0" }}>
          <h3 style={{ ...headingFont(18), marginBottom: 16 }}>FIVE DISCIPLINES</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Motor Learning Science — Constraints-Led Approach and the Inner Game (Rob Gray, Timothy Gallwey)",
              "Analytics — Data-driven decision making and player evaluation",
              "Human Development — Emotional intelligence and whole-person growth (Jason Wilson)",
              "Philosophy — Stoic wisdom, inner mastery, and intentional living (Marcus Aurelius, Gallwey)",
              "Basketball Craft — Skill acquisition, scheme design, and game strategy",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <StarAccent />
                <p style={{ ...bodyFont, color: "#C8CCD8", margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors */}
        <div style={{ ...cardStyle, padding: 28 }}>
          <h3 style={{ ...headingFont(16), marginBottom: 20, letterSpacing: 3 }}>MENTORED BY</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: "20px" }}>
              <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, color: "#D4A843", letterSpacing: 1, margin: "0 0 8px" }}>PHIL BECKNER</h4>
              <p style={{ ...bodyFont, fontSize: 13, margin: 0 }}>Elite player development coach and high-performance consultant who has worked with several NBA organizations, NBA All-Stars, and first-round draft picks — most notably Damian Lillard, a Top 75 all-time player</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: "20px" }}>
              <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, color: "#D4A843", letterSpacing: 1, margin: "0 0 8px" }}>CHRIS OLIVER</h4>
              <p style={{ ...bodyFont, fontSize: 13, margin: 0 }}>Founder of Basketball Immersion and The Basketball Podcast, NBA consultant in youth and elite development, 300+ win university head coach, and a global authority on the Constraints-Led Approach and decision training</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: "20px" }}>
              <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, color: "#D4A843", letterSpacing: 1, margin: "0 0 8px" }}>ANDRE DAWKINS</h4>
              <p style={{ ...bodyFont, fontSize: 13, margin: 0 }}>2010 NCAA National Champion and 1,000-point scorer at Duke, 2x ACC Tournament champion, signed with the Miami Heat, G League veteran, and award-winning high school head coach</p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[{ num: "MBA", label: "Business" }, { num: "MS-MIT", label: "Information Technology" }, { num: "PRO", label: "NBA · Overseas · College" }, { num: "HS/AAU", label: "Varsity · JV · Freshman · AAU" }].map((s, i) => (
            <div key={i} style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 8, padding: "28px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 32, fontWeight: 700, color: "#D4A843" }}>{s.num}</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#8A8FA3", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 4, color: "#8A8FA3", textTransform: "uppercase", marginBottom: 8 }}>What They Say</h3>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 32, fontWeight: 700, color: "#FFFFFF", letterSpacing: 3, marginBottom: 32 }}>TESTIMONIALS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {[
              { quote: "I wouldn't be in the position I am in without his presence, help, guidance and supportive nature. Coach Chris showed up in my life when I was nearly a foot out the door to adversity — every time he was there for me. He has an open-minded approach to problems, a willingness to listen, and always remembers the contributions you've made. He's been a high-character father figure in my life.", name: "Jamarie Dubose, AAU Player", tag: "Character & Mentorship" },
              { quote: "What stood out most is how well he understands the game and how intentionally he teaches the fundamentals. He does a great job incorporating individualized instruction, helping each player develop specific skills while still building strong team dynamics. He takes the long view — focusing on building confidence and a true understanding of the game rather than just short-term results.", name: "Merrick Fitzgerald's Mom, 3rd Grade Team", tag: "Youth Development" },
              { quote: "Coach Starr is a very detail-oriented coach — good energy, a driver and motivator all in one. He holds his players to a high standard but continues to drive urgency while making the game fun, teaching new things daily with his learnings from working with NBA guys over the summer.", name: "Jerome Lyons, Mount St. Mary HS", tag: "High School Player" },
              { quote: "He loves to let his players work through problems and find solutions rather than force feeding them and turning them into robots. He has the perfect balance of being a coach and a friend — very encouraging but will also tell you when you're wrong. Understands basketball at a very high level and is even better at perfecting shot form. One of the most impactful coaches I have ever had.", name: "Orin Reuter, Stillwater HS", tag: "Coaching & Shot Development" },
              { quote: "Under Coach Starr's guidance, my son grew tremendously as a player. His confidence, work ethic, and understanding of the game improved more than we could have imagined. What stands out most is how much Coach Starr truly invests in my son's future — he taught him teamwork, accountability, and perseverance. Because of his mentorship, my son is more prepared for the next level and for life in general.", name: "Kate Young, HS Parent (Michael Easley)", tag: "Parent — Development & Character" },
              { quote: "Coach Starr has been a key factor in the development and growth of both my son and my nephew. The skills they learned were customized specially for them and their game. He not only develops the skill set but holds the young men accountable and has shaped many to being better men in life. He has been a blessing for my guys and I'm grateful to have met him.", name: "Jodie Shavers, Football Coach & Parent, Mount St. Mary HS", tag: "Coach & Parent" },
            ].map((t, i) => (
              <div key={i} style={cardStyle}>
                <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant Garamond', serif", fontSize: 64, color: "rgba(212,168,67,0.1)", lineHeight: 1 }}>"</div>
                <span style={tagStyle}>{t.tag}</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#C8CCD8", lineHeight: 1.8, fontStyle: "italic", margin: "16px 0" }}>"{t.quote}"</p>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#5A5F73", letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  </>
);

// ─── Services Page ───
const ServicesPage = ({ setPage }) => {
  const training = [
    {
      title: "1-ON-1 TRAINING",
      desc: "Personalized skill development sessions tailored to your game. Shooting mechanics, ball handling, footwork, and decision-making — built around analytics and film study.",
      features: ["Custom development plan", "Video analysis & feedback", "Progress tracking"],
      price: "$1.25 / minute",
      note: "2-hour max per session",
      examples: "30 min = $37.50 · 60 min = $75 · 90 min = $112.50",
    },
    {
      title: "SMALL GROUP TRAINING",
      desc: "High-intensity sessions with 2-7 players. Competitive drills, live-action reps, and game-speed development in a focused environment.",
      features: ["2-7 players per group", "Position-specific work", "Competitive game scenarios"],
      price: "$0.50 / minute per player",
      note: "2-hour max per session",
      examples: "60 min × 4 players = $30/player",
    },
    {
      title: "LARGE GROUP TRAINING",
      desc: "Team-style development sessions for 8-20 players. Skill work, competitive drills, and game-concept training in a high-energy group setting.",
      features: ["8-20 players per session", "Team-oriented skill development", "Game-speed competitive drills"],
      price: "$20 flat fee per player",
      note: "Per session",
      examples: "10 players = $200 · 15 players = $300 · 20 players = $400",
    },
  ];

  const consulting = []; // removed — consolidated into Courtside Analytics below

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="What We Offer" title="SERVICES & PRICING" sub="Transparent pricing. Elite development." />

        {/* Loyalty banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212,168,67,0.1), rgba(212,168,67,0.04))",
          border: "1px solid rgba(212,168,67,0.2)", borderRadius: 8,
          padding: "20px 28px", marginBottom: 48, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        }}>
          <StarrLogo size={32} />
          <div>
            <h4 style={{ ...headingFont(14), margin: "0 0 4px" }}>LOYALTY PROGRAM</h4>
            <p style={{ ...bodyFont, fontSize: 13, margin: 0 }}>
              Complete 10 paid sessions and earn a <span style={{ color: "#D4A843" }}>free session</span> — length equals the average of your 10 sessions. Earned Not Given.
            </p>
          </div>
        </div>

        {/* Training */}
        <h3 style={{ ...headingFont(16), marginBottom: 24, letterSpacing: 4, color: "#8A8FA3" }}>PLAYER TRAINING</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 60 }}>
          {training.map((s, i) => (
            <div key={i} style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
              <div style={goldTopBar} />
              <h3 style={{ ...headingFont(20), marginBottom: 16 }}>{s.title}</h3>
              <p style={{ ...bodyFont, margin: "0 0 20px", flex: 1 }}>{s.desc}</p>
              <div style={{ marginBottom: 16 }}>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <StarAccent />
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#C8CCD8", letterSpacing: 0.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(212,168,67,0.1)", paddingTop: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, color: "#D4A843", letterSpacing: 1, marginBottom: 4 }}>{s.price}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#5A5F73", letterSpacing: 1, marginBottom: 4 }}>{s.note}</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 12, color: "#5A5F73", fontStyle: "italic" }}>{s.examples}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Online coaching note */}
        <div style={{
          background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.1)",
          borderRadius: 8, padding: "24px 28px", marginBottom: 60, textAlign: "center",
        }}>
          <h4 style={{ ...headingFont(14), marginBottom: 8 }}>ONLINE COACHING & MEMBERSHIP</h4>
          <p style={{ ...bodyFont, fontSize: 14, margin: 0 }}>
            Membership tiers with discounted training rates, video library access, and online coaching features are <span style={{ color: "#D4A843" }}>coming soon</span>. In the meantime, book a session at standard rates.
          </p>
        </div>

        {/* Courtside Analytics — Unified */}
        <div style={{ marginBottom: 60 }}>
          <h3 style={{ ...headingFont(16), marginBottom: 8, letterSpacing: 4, color: "#8A8FA3" }}>COURTSIDE ANALYTICS</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#8A8FA3", fontStyle: "italic", marginBottom: 24 }}>by 5-Starr — Data-Driven Coaching Intelligence</p>

          <div style={{
            background: "rgba(212,168,67,0.06)", borderLeft: "3px solid #D4A843",
            padding: "20px 24px", borderRadius: "0 8px 8px 0", marginBottom: 32,
          }}>
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 14, color: "#C8CCD8", lineHeight: 1.8, margin: 0 }}>
              You send us your data — HUDL, Synergy, or Second Spectrum. We send back a complete game plan within 24 hours — opponent scouting, lineup optimization, rotation strategies, and keys to victory. Every insight comes with a specific coaching recommendation. No jargon. Just wins.
            </p>
          </div>

          {/* Sample Game Plan — Data-to-Insight Walkthrough */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: 3, color: "#D4A843" }}>FROM A REAL GAME PLAN</h4>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 2, color: "#5A5F73", background: "rgba(212,168,67,0.1)", padding: "4px 12px", borderRadius: 4 }}>NAMES CHANGED</span>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,168,67,0.1)", borderRadius: 8, overflow: "hidden" }}>
              
              {/* Context */}
              <div style={{ background: "rgba(212,168,67,0.08)", padding: "16px 24px", borderBottom: "1px solid rgba(212,168,67,0.1)" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 3, color: "#D4A843", marginBottom: 4 }}>THE SITUATION</div>
                <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: "#C8CCD8", lineHeight: 1.7, margin: 0 }}>
                  A coach lost by 21 to the #1 team in the state. He thought he got outplayed. We pulled his HUDL data and found something different.
                </p>
              </div>

              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Step 1: The Data */}
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 3, color: "#D4A843", marginBottom: 10 }}>STEP 1 — WE PULLED THE DATA</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {[
                      { label: "Q1", score: "26-23", pm: "+3", color: "#81C784" },
                      { label: "Q2", score: "9-16", pm: "-7", color: "#E57373" },
                      { label: "Q3", score: "13-22", pm: "-9", color: "#E57373" },
                      { label: "Q4", score: "12-20", pm: "-8", color: "#E57373" },
                    ].map((q, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${q.color}22`, borderRadius: 6, padding: "10px 8px", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#8A8FA3", letterSpacing: 1 }}>{q.label}</div>
                        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, color: q.color, fontWeight: 600, margin: "4px 0 2px" }}>{q.score}</div>
                        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: q.color }}>{q.pm}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 12, color: "#8A8FA3", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
                    They scored 26 in Q1 on 70.6% shooting. By Q4 they scored 12 on 21.7% shooting. Same team. Same opponent. What changed?
                  </p>
                </div>

                {/* Step 2: The Insight */}
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 3, color: "#D4A843", marginBottom: 10 }}>STEP 2 — WE FOUND THE CAUSE</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "rgba(229,115,115,0.08)", border: "1px solid rgba(229,115,115,0.15)", borderRadius: 6, padding: "12px 14px" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#E57373", letterSpacing: 1, marginBottom: 4 }}>STAR GUARD</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#C8CCD8" }}>33 minutes played</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#E57373" }}>0/9 from three</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#E57373" }}>-21 +/-</div>
                    </div>
                    <div style={{ background: "rgba(129,199,132,0.08)", border: "1px solid rgba(129,199,132,0.15)", borderRadius: 6, padding: "12px 14px" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#81C784", letterSpacing: 1, marginBottom: 4 }}>FEWEST MINUTES STARTER</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#C8CCD8" }}>24 minutes played</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#81C784" }}>17 pts, 8/17 FG</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#81C784" }}>-1 +/-</div>
                    </div>
                  </div>
                  <div style={{ background: "rgba(212,168,67,0.04)", borderLeft: "3px solid #D4A843", padding: "12px 16px", borderRadius: "0 6px 6px 0", marginTop: 10 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#FFF", fontStyle: "italic", margin: 0 }}>
                      The best player on the floor played the fewest minutes. The worst performance came from the player who never sat. That's not a talent problem — it's a fatigue problem.
                    </p>
                  </div>
                </div>

                {/* Step 3: The Proof */}
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 3, color: "#D4A843", marginBottom: 10 }}>STEP 3 — WE PROVED IT WITH LINEUP DATA</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "rgba(129,199,132,0.06)", border: "1px solid rgba(129,199,132,0.12)", borderRadius: 6, padding: "14px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, color: "#81C784", fontWeight: 700 }}>-1</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, color: "#8A8FA3", letterSpacing: 1, marginTop: 4 }}>ALL 5 STARTERS</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, color: "#8A8FA3" }}>21 MINUTES</div>
                    </div>
                    <div style={{ background: "rgba(229,115,115,0.06)", border: "1px solid rgba(229,115,115,0.12)", borderRadius: 6, padding: "14px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, color: "#E57373", fontWeight: 700 }}>-21</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, color: "#8A8FA3", letterSpacing: 1, marginTop: 4 }}>2+ BENCH PLAYERS</div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, color: "#8A8FA3" }}>7 MINUTES</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 12, color: "#8A8FA3", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
                    The starting 5 was even with the #1 team in the state. The 21-point loss came entirely from 7 minutes of multi-sub bench lineups.
                  </p>
                </div>

                {/* Step 4: The Fix */}
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 3, color: "#D4A843", marginBottom: 10 }}>STEP 4 — WE BUILT THE FIX</div>
                  <div style={{ background: "rgba(212,168,67,0.04)", borderLeft: "3px solid #D4A843", padding: "14px 18px", borderRadius: "0 6px 6px 0" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#FFF", fontStyle: "italic", margin: 0 }}>
                      Single-sub rotation: one starter out at a time on a 3-minute cycle. Every starter gets rest. 4 starters always on the floor. Specific minute targets for every player. Ready to execute from a clipboard.
                    </p>
                  </div>
                </div>
              </div>

              {/* Closing */}
              <div style={{ background: "rgba(212,168,67,0.06)", padding: "16px 24px", borderTop: "1px solid rgba(212,168,67,0.1)", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#D4A843", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
                  The game was tied at 42 before the rotation broke down. We found the problem. We built the solution. That's what a Courtside Analytics game plan does.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { title: "GAME PLAN", price: "$100", desc: "Opponent-specific rotation plan with minute targets, keys to victory, bench reference card, and Game 1 autopsy if rematch." },
              { title: "LINEUP OPTIMIZATION", price: "$100", desc: "Data-driven lineup evaluation — best/worst combinations, optimal pairings, and single-sub rotation sequences." },
              { title: "PRACTICE PLAN DESIGN", price: "$250", desc: "Custom practice plans built on Constraints-Led Approach methodology tailored to your team's needs." },
              { title: "SCHEME CONSULTING", price: "$500 per side", desc: "Offensive or defensive scheme design and implementation consulting. $500 offense, $500 defense." },
              { title: "PROGRAM BUILDING", price: "$2,000", desc: "Full program consulting: culture, systems, player development structure, analytics integration, and identity building." },
              { title: "SEASON PACKAGE", price: "$250–$500/mo", desc: "Weekly game plans, opponent scouting, in-form analysis, season trends, and player development profiles." },
              { title: "PROGRAM PACKAGE", price: "$500–$1,000/mo", desc: "Full analytics partnership year-round: everything in Season + offseason analytics, practice design, and recruiting profiles." },
            ].map((p, i) => (
              <div key={i} style={{ ...cardStyle, padding: 24 }}>
                <div style={goldTopBar} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <h4 style={{ ...headingFont(14), letterSpacing: 1.5 }}>{p.title}</h4>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#D4A843", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{p.price}</span>
                </div>
                <p style={{ ...bodyFont, fontSize: 13, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <GoldButton onClick={() => setPage("Book Now")}>Get Started</GoldButton>
        </div>
      </Section>
    </>
  );
};

// ─── Membership Page ───
const MembershipPage = ({ setPage }) => {
  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Join The Program" title="MEMBERSHIP" sub="Commit to your development. Unlock exclusive access." />

        <div style={{
          textAlign: "center", padding: "60px 40px",
          background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))",
          border: "1px solid rgba(212,168,67,0.15)", borderRadius: 12, marginBottom: 40,
        }}>
          <StarrLogo size={48} />
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, color: "#FFFFFF", letterSpacing: 3, margin: "20px 0 12px" }}>COMING SOON</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#8A8FA3", fontStyle: "italic", maxWidth: 500, margin: "0 auto 16px" }}>
            Three membership tiers are being finalized — Rising Starr, All-Starr, and 5-Starr Elite. Each with discounted training rates, exclusive access, and development resources.
          </p>
          <div style={{ width: 40, height: 2, background: "#D4A843", margin: "0 auto 24px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, maxWidth: 600, margin: "0 auto 32px" }}>
            {[
              { name: "RISING STARR", price: "$19.99/mo", detail: "10% off training" },
              { name: "ALL-STARR", price: "$49.99/mo", detail: "20% off + DM access" },
              { name: "5-STARR ELITE", price: "$99.99/mo", detail: "30% off + analytics" },
            ].map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,168,67,0.1)", borderRadius: 8, padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#D4A843", letterSpacing: 2, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, color: "#FFF", fontWeight: 600 }}>{t.price}</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 11, color: "#5A5F73", marginTop: 4 }}>{t.detail}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: "#5A5F73", margin: "0 0 24px" }}>In the meantime, book a session at standard rates and start your development journey today.</p>
          <GoldButton onClick={() => setPage("Book Now")}>Book a Session</GoldButton>
        </div>
      </Section>
    </>
  );
};
// ─── Camps Page ───
const CampsPage = ({ setPage }) => {
  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Level Up" title="CAMPS & CLINICS" sub="Intensive development experiences for players and coaches" />

        <div style={{
          textAlign: "center", padding: "60px 40px",
          background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))",
          border: "1px solid rgba(212,168,67,0.15)", borderRadius: 12, marginBottom: 40,
        }}>
          <StarrLogo size={48} />
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, color: "#FFFFFF", letterSpacing: 3, margin: "20px 0 12px" }}>COMING SUMMER 2026</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#8A8FA3", fontStyle: "italic", maxWidth: 500, margin: "0 auto 24px" }}>
            Camps and clinics are being planned for summer and fall 2026. Subscribe to the newsletter to be the first to know when registration opens.
          </p>
          <div style={{ width: 40, height: 2, background: "#D4A843", margin: "0 auto 24px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 700, margin: "0 auto 32px" }}>
            {[
              { name: "YOUTH DEVELOPMENT CAMP", detail: "Grades 3-7 • Full Day • $85" },
              { name: "SHOT DOCTOR CLINIC", detail: "Grades 6-12 • Full Day • $125" },
              { name: "ELITE SKILLS CAMP", detail: "Grades 8-12 • 3 Days • $400" },
              { name: "COACHES CLINIC", detail: "All Coaches • Full Day • $300" },
            ].map((c, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,168,67,0.1)", borderRadius: 8, padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#D4A843", letterSpacing: 1.5, marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 11, color: "#5A5F73" }}>{c.detail}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: "#5A5F73", margin: "0 0 24px" }}>5-Starr Elite members receive free camp registration. Sliding scale available for families who need financial assistance.</p>
          <GoldButton onClick={() => setPage("Book Now")}>Get Notified</GoldButton>
        </div>
      </Section>
    </>
  );
};

// ─── Free Resources Page ───
const FreeResourcesPage = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const resources = [
    {
      title: "THE 5-STARR SHOOTING BLUEPRINT",
      type: "FREE GUIDE",
      desc: "A complete breakdown of shooting mechanics from the ground up. Footwork, hand placement, release point, and the mental keys to becoming a consistent shooter. The same framework Coach Starr uses with every player.",
      cta: "Download Free",
    },
    {
      title: "5 DRILLS EVERY PLAYER SHOULD MASTER",
      type: "FREE DRILL PACK",
      desc: "Five foundational drills that develop ball handling, footwork, and decision-making — designed using Constraints-Led Approach principles so every rep transfers to the game.",
      cta: "Download Free",
    },
    {
      title: "PARENT'S GUIDE TO PLAYER DEVELOPMENT",
      type: "FREE GUIDE",
      desc: "What parents need to know about supporting their child's basketball journey without overstepping. Covers training frequency, the role of rest, how to evaluate coaches, and when to invest in private training.",
      cta: "Download Free",
    },
  ];

  const videos = [
    { title: "Fundamentals of the Set Shot", category: "Shooting" },
    { title: "Game-Speed Crossover Series", category: "Ball Handling" },
    { title: "Reading the Pick & Roll", category: "Film Breakdown" },
    { title: "Introduction to CLA for Coaches", category: "Coaches Corner" },
  ];

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Give First" title="FREE RESOURCES" sub="Level up your game or your coaching — no cost, no catch" />

        {/* Newsletter Signup */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212,168,67,0.1), rgba(212,168,67,0.04))",
          border: "1px solid rgba(212,168,67,0.2)", borderRadius: 8,
          padding: "32px", marginBottom: 48, textAlign: "center",
        }}>
          <h3 style={{ ...headingFont(20), marginBottom: 8 }}>THE 5-STARR NEWSLETTER</h3>
          <p style={{ ...bodyFont, fontSize: 14, margin: "0 0 20px", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            Weekly training tips, coaching insights, and development strategies delivered to your inbox. Written by Coach Starr — built for players and coaches who want to earn everything they get.
          </p>
          {subscribed ? (
            <div style={{ padding: "16px 24px", background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: 6 }}>
              <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: "#4CAF50", letterSpacing: 1, margin: 0 }}>You're in. Welcome to the 5-Starr family.</p>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 480, margin: "0 auto" }}>
              <input
                style={{
                  flex: 1, minWidth: 240, padding: "12px 16px", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,168,67,0.2)", borderRadius: 6, color: "#C8CCD8",
                  fontFamily: "'Libre Baskerville', serif", fontSize: 14, outline: "none", boxSizing: "border-box",
                }}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <GoldButton onClick={() => { if (email) setSubscribed(true); }}>Subscribe</GoldButton>
            </div>
          )}
        </div>

        {/* Downloadable Resources — Coming Soon */}
        <h3 style={{ ...headingFont(16), marginBottom: 24, letterSpacing: 4, color: "#8A8FA3" }}>DOWNLOADABLE GUIDES</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 60 }}>
          {resources.map((r, i) => (
            <div key={i} style={{ ...cardStyle, display: "flex", flexDirection: "column", opacity: 0.6 }}>
              <div style={goldTopBar} />
              <span style={tagStyle}>COMING SOON</span>
              <h4 style={{ ...headingFont(18), margin: "16px 0 12px" }}>{r.title}</h4>
              <p style={{ ...bodyFont, fontSize: 13, margin: "0 0 20px", flex: 1 }}>{r.desc}</p>
              <div style={{
                background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.15)",
                padding: "10px 24px", borderRadius: 4, textAlign: "center",
                fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: 1.5, color: "#8A8FA3", textTransform: "uppercase",
              }}>Coming Soon</div>
            </div>
          ))}
        </div>

        {/* Free Video Content — Coming Soon */}
        <h3 style={{ ...headingFont(16), marginBottom: 24, letterSpacing: 4, color: "#8A8FA3" }}>FREE VIDEO CONTENT</h3>
        <div style={{
          textAlign: "center", padding: 48, borderRadius: 8,
          background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.1)", marginBottom: 48,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🎬</div>
          <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, color: "#8A8FA3", letterSpacing: 3, margin: "0 0 8px", textTransform: "uppercase" }}>Video Library Coming Soon</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#F0D78C", fontStyle: "italic", margin: "0 0 16px" }}>Training breakdowns, shooting tutorials, and coaching education</p>
          <p style={{ ...bodyFont, fontSize: 13, margin: 0 }}>Subscribe to the newsletter above to get notified when content drops.</p>
        </div>

        {/* For Coaches */}
        <div style={{
          ...cardStyle, padding: 32,
          background: "rgba(212,168,67,0.04)", borderLeft: "3px solid #D4A843", borderRadius: "0 8px 8px 0",
        }}>
          <h3 style={{ ...headingFont(18), marginBottom: 12 }}>FOR COACHES</h3>
          <p style={{ ...bodyFont, fontSize: 14, margin: "0 0 16px" }}>
            Looking to bring a Constraints-Led Approach, analytics, and evidence-based player development into your program? Our consulting services and coaches clinic are built for coaches who want to think differently about the game.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setPage("Services")} style={{
              background: "transparent", border: "1px solid rgba(212,168,67,0.4)",
              padding: "10px 20px", color: "#D4A843", fontFamily: "'Oswald', sans-serif",
              fontSize: 12, letterSpacing: 1.5, cursor: "pointer", borderRadius: 4, textTransform: "uppercase",
            }}>View Consulting Services</button>
          </div>
        </div>
      </Section>
    </>
  );
};

// ─── Testimonials Page ───
const TestimonialsPage = () => {
  const testimonials = [
    { quote: "I wouldn't be in the position I am in without his presence, help, guidance and supportive nature. Coach Chris showed up in my life when I was nearly a foot out the door to adversity — every time he was there for me. He has an open-minded approach to problems, a willingness to listen, and always remembers the contributions you've made. He's been a high-character father figure in my life.", name: "Jamarie Dubose, AAU Player", tag: "Character & Mentorship", real: true },
    { quote: "What stood out most is how well he understands the game and how intentionally he teaches the fundamentals. He does a great job incorporating individualized instruction, helping each player develop specific skills while still building strong team dynamics. He takes the long view — focusing on building confidence and a true understanding of the game rather than just short-term results.", name: "Merrick Fitzgerald's Mom, 3rd Grade Team", tag: "Youth Development", real: true },
    { quote: "Coach Starr is a very detail-oriented coach — good energy, a driver and motivator all in one. He holds his players to a high standard but continues to drive urgency while making the game fun, teaching new things daily with his learnings from working with NBA guys over the summer.", name: "Jerome Lyons, Mount St. Mary HS", tag: "High School Player", real: true },
    { quote: "He loves to let his players work through problems and find solutions rather than force feeding them and turning them into robots. He has the perfect balance of being a coach and a friend — very encouraging but will also tell you when you're wrong. Understands basketball at a very high level and is even better at perfecting shot form. One of the most impactful coaches I have ever had.", name: "Orin Reuter, Stillwater HS", tag: "Coaching & Shot Development", real: true },
    { quote: "Under Coach Starr's guidance, my son grew tremendously as a player. His confidence, work ethic, and understanding of the game improved more than we could have imagined. What stands out most is how much Coach Starr truly invests in my son's future — he taught him teamwork, accountability, and perseverance. Because of his mentorship, my son is more prepared for the next level and for life in general.", name: "Kate Young, HS Parent (Michael Easley)", tag: "Parent — Development & Character", real: true },
    { quote: "Coach Starr has been a key factor in the development and growth of both my son and my nephew. The skills they learned were customized specially for them and their game. He not only develops the skill set but holds the young men accountable and has shaped many to being better men in life. He has been a blessing for my guys and I'm grateful to have met him.", name: "Jodie Shavers, Football Coach & Parent, Mount St. Mary HS", tag: "Coach & Parent", real: true },
  ];

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="What They Say" title="TESTIMONIALS" sub="The work speaks for itself" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant Garamond', serif", fontSize: 64, color: "rgba(212,168,67,0.1)", lineHeight: 1 }}>"</div>
              <span style={tagStyle}>{t.tag}</span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#C8CCD8", lineHeight: 1.8, fontStyle: "italic", margin: "16px 0" }}>"{t.quote}"</p>
              <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#5A5F73", letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>— {t.name}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

// ─── Accessibility Page ───
const AccessibilityPage = ({ setPage }) => {
  const programs = [
    {
      icon: "🌟",
      title: "5-STARR SCHOLARSHIP",
      desc: "Partial or full training assistance for players who demonstrate financial need, exceptional work ethic, and a genuine commitment to their development.",
      details: [
        "Flexible coverage  — from discounted rates to fully free sessions",
        "Based on financial need, work ethic, coach recommendation, and a written application from the player",
        "No cap on spots  — as the program grows, so does our capacity to give",
        "Reviewed quarterly to ensure the player is honoring the commitment",
      ],
      cta: "Apply for Scholarship",
    },
    {
      icon: "💪",
      title: "WORK-TO-TRAIN",
      desc: "Can't pay with dollars? Pay with sweat. Earn training time by contributing to the 5-Starr operation.",
      details: [
        "Rebound during other players' sessions",
        "Help set up and break down equipment",
        "Assist with younger player camps",
        "Film training clips for social media",
        "Gym maintenance and facility upkeep",
      ],
      sub: "2 hours of work = 1 hour of training. Credits don't expire.",
      cta: "Ask About Work-to-Train",
    },
    {
      icon: "🏀",
      title: "FREE COMMUNITY SESSION",
      desc: "At the start of every basketball season, we open the gym to anyone. No cost. No strings. Just development.",
      details: [
        "4 times per year  — fall, winter, spring, summer",
        "Open to players of all ages and skill levels",
        "Coaches welcome",
        "60-90 minutes of skill work, competitive games, and fun",
      ],
      cta: "Get Notified of Next Session",
    },
  ];

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Open Doors" title="ACCESSIBILITY" sub="The right heart matters more than the right price tag" />

        <div style={{
          background: "rgba(212,168,67,0.06)", borderLeft: "3px solid #D4A843",
          padding: "24px 28px", borderRadius: "0 8px 8px 0", marginBottom: 48,
        }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#C8CCD8", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            5-Starr Development believes elite player development should be accessible to any young person willing to earn it. A family's financial situation should never be the barrier that stops a driven kid from growing.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
          {programs.map((prog, i) => (
            <div key={i} style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
              <div style={goldTopBar} />
              <span style={{ fontSize: 32, marginBottom: 12 }}>{prog.icon}</span>
              <h3 style={{ ...headingFont(18), marginBottom: 8 }}>{prog.title}</h3>
              <p style={{ ...bodyFont, fontSize: 13, margin: "0 0 16px" }}>{prog.desc}</p>
              <div style={{ flex: 1, marginBottom: 16 }}>
                {prog.details.map((d, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <StarAccent />
                    <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 12, color: "#C8CCD8", lineHeight: 1.6 }}>{d}</span>
                  </div>
                ))}
              </div>
              {prog.sub && (
                <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#D4A843", letterSpacing: 1, margin: "0 0 16px" }}>{prog.sub}</p>
              )}
              <a href={prog.title === "5-STARR SCHOLARSHIP" ? "https://forms.gle/nLuSVgTBZT3cWp9Z9" : "https://forms.gle/jNJCrdBYnpt5jAvK9"} target="_blank" rel="noopener noreferrer" style={{
                background: "transparent", border: "1px solid rgba(212,168,67,0.4)",
                padding: "10px 20px", color: "#D4A843", fontFamily: "'Oswald', sans-serif",
                fontSize: 12, letterSpacing: 1.5, cursor: "pointer", borderRadius: 4,
                textTransform: "uppercase", width: "100%", display: "block", textAlign: "center",
                textDecoration: "none",
              }}>{prog.cta}</a>
            </div>
          ))}
        </div>

        {/* Earned Not Given closing */}
        <div style={{
          textAlign: "center", padding: "48px 32px",
          background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))",
          border: "1px solid rgba(212,168,67,0.15)", borderRadius: 12,
        }}>
          <StarrLogo size={48} />
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, color: "#FFFFFF", letterSpacing: 3, margin: "16px 0 8px" }}>EARNED NOT GIVEN</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#8A8FA3", fontStyle: "italic", maxWidth: 500, margin: "0 auto 24px" }}>
            Every program here exists for players who are willing to earn the opportunity. If that's you or someone you know, reach out. We'll find a way.
          </p>
          <GoldButton onClick={() => setPage("Book Now")}>Get in Touch</GoldButton>
        </div>
      </Section>
    </>
  );
};

// ─── Player Cards Page ───
const PlayerCardsPage = ({ setPage }) => {
  const sampleCards = [
    { name: "SAMPLE PLAYER", pos: "GUARD", grade: "10TH", school: "OKC HIGH SCHOOL", stats: { ppg: "14.2", apg: "5.1", spg: "2.3", fgPct: "47%" } },
    { name: "SAMPLE PLAYER", pos: "FORWARD", grade: "11TH", school: "OKC HIGH SCHOOL", stats: { ppg: "11.8", rpg: "8.4", bpg: "1.7", fgPct: "52%" } },
    { name: "SAMPLE PLAYER", pos: "GUARD", grade: "9TH", school: "OKC MIDDLE SCHOOL", stats: { ppg: "9.5", apg: "3.2", spg: "1.9", fgPct: "41%" } },
  ];

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Your Identity" title="PLAYER CARDS" sub="A professional identity card for every player who earns it" />

        {/* Offer callout */}
        <div style={{
          background: "rgba(212,168,67,0.06)", borderLeft: "3px solid #D4A843",
          padding: "24px 28px", borderRadius: "0 8px 8px 0", marginBottom: 40,
        }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#C8CCD8", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            Player Identity Cards are not for sale. They are earned by demonstrating the 5-Starr Values consistently.
          </p>
        </div>

        {/* Values + Earned Card */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
          
          {/* The 5-Starr Values */}
          <div style={{ ...cardStyle, padding: 32 }}>
            <div style={goldTopBar} />
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: 3, color: "#D4A843", marginBottom: 24 }}>THE 5-STARR VALUES</h3>
            {[
              { value: "GRATITUDE", desc: "Appreciate the opportunity. Honor the people who invest in you. Never take the gym for granted." },
              { value: "RESPECT", desc: "For the game, for your teammates, for the process. How you treat people when it's hard reveals who you are." },
              { value: "OWNERSHIP", desc: "Own your development. Own your mistakes. Own your effort. No excuses. No blame." },
              { value: "GRIT", desc: "Show up when it's not fun. Push through when it's uncomfortable. The work doesn't stop because it got hard." },
            ].map((v, i) => (
              <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < 3 ? "1px solid rgba(212,168,67,0.08)" : "none" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#D4A843", letterSpacing: 2, marginBottom: 6 }}>{v.value}</div>
                <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 12, color: "#8A8FA3", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* How You Earn It */}
          <div style={{ ...cardStyle, padding: 32, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={goldTopBar} />
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#D4A843", marginBottom: 4 }}>EARNED</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: 3, color: "#8A8FA3", marginBottom: 20 }}>NOT GIVEN</div>
            <div style={{ width: 40, height: 2, background: "#D4A843", margin: "0 auto 20px" }} />
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 14, color: "#C8CCD8", lineHeight: 1.8, margin: "0 0 24px" }}>
              When Coach Starr sees you live the values — not once, but consistently — your card gets made. There's no application. No timeline. You earn it and Coach Starr will know.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", maxWidth: 320, margin: "0 auto 24px" }}>
              {["Custom design with your action photo", "Season stats and key metrics", "\"What He Brings\" skill profile", "Personal scouting report from Coach Starr", "Digital and print-ready formats", "Updated annually as you develop"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StarAccent />
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#C8CCD8", letterSpacing: 0.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <GoldButton onClick={() => setPage("Book Now")}>Start Training</GoldButton>
          </div>
        </div>

        {/* Real Player Cards Gallery */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: 3, color: "#D4A843" }}>PLAYER CARD GALLERY</h4>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 2, color: "#5A5F73", background: "rgba(212,168,67,0.1)", padding: "4px 12px", borderRadius: 4 }}>13 CARDS • BASKETBALL & FOOTBALL</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { src: "/cards/jamarie_dubose.png", name: "Jamarie Dubose", school: "Mt. St. Mary" },
              { src: "/cards/jerome_lyons.png", name: "Jerome Lyons", school: "Mt. St. Mary" },
              { src: "/cards/orin_reuter.png", name: "Orin Reuter", school: "Stillwater" },
              { src: "/cards/micheal_easley.png", name: "Micheal Easley", school: "Kingfisher" },
              { src: "/cards/kuba_malecki_bball.jpg", name: "Kuba Malecki", school: "Casady" },
              { src: "/cards/fabian_harris.png", name: "Fabian Harris", school: "Tulsa Memorial" },
              { src: "/cards/julian_jenkins.png", name: "Julian Jenkins", school: "Chisholm" },
              { src: "/cards/kohen_warden.png", name: "Kohen Warden", school: "North Rock Creek" },
              { src: "/cards/hayes_white.png", name: "Hayes White", school: "Kingfisher" },
              { src: "/cards/aiden_hessman.png", name: "Aiden Hessman", school: "Meeker" },
              { src: "/cards/denton_suthers.png", name: "Denton Suthers", school: "Heritage Hall" },
              { src: "/cards/joseph_fokum.png", name: "Joseph Fokum", school: "Putnam City" },
              { src: "/cards/kuba_malecki_football.png", name: "Kuba Malecki", school: "Casady (Football)" },
            ].map((card, i) => (
              <div key={i} style={{
                borderRadius: 10, overflow: "hidden",
                border: "1px solid rgba(212,168,67,0.15)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,168,67,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <img src={card.src} alt={`${card.name} - ${card.school} Player Card`} style={{ width: "100%", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: "center", padding: "40px 32px",
          background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))",
          border: "1px solid rgba(212,168,67,0.15)", borderRadius: 12,
        }}>
          <StarrLogo size={40} />
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, color: "#FFFFFF", letterSpacing: 3, margin: "16px 0 8px" }}>YOUR IDENTITY. YOUR CARD. EARNED NOT GIVEN.</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#8A8FA3", fontStyle: "italic", maxWidth: 500, margin: "0 auto 24px" }}>
            When you upload your card to social media, coaches notice. When it says 5-Starr on it, they know you're serious.
          </p>
          <GoldButton onClick={() => setPage("Book Now")}>Get Started</GoldButton>
        </div>
      </Section>
    </>
  );
};

// ─── Book Now Page ───
const BookNowPage = () => {
  const [view, setView] = useState("main");
  const [calMonth, setCalMonth] = useState(() => { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() }; });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState("75");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", type: "1-on-1", location: "Bishop McGuinness", notes: "" });
  const [recurring, setRecurring] = useState("none");
  const [recurringEnd, setRecurringEnd] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});

  // FIX #6: availability with display hours
  const availMap = {
    1:{s:"15:00",e:"20:00",label:"3–8 PM"}, 2:{s:"15:00",e:"20:00",label:"3–8 PM"},
    3:{s:"15:00",e:"20:00",label:"3–8 PM"}, 4:{s:"15:00",e:"20:00",label:"3–8 PM"},
    5:{s:"15:00",e:"18:00",label:"3–6 PM"}, 6:{s:"08:00",e:"13:00",label:"8 AM–1 PM"}, 0:null
  };
  const getAvail = (ds) => availMap[new Date(ds + "T12:00:00").getDay()] || null;

  const genSlots = (ds, dur) => {
    const a = getAvail(ds); if (!a) return [];
    const slots = []; let [sh, sm] = a.s.split(":").map(Number);
    const endMin = (() => { const [eh, em] = a.e.split(":").map(Number); return eh * 60 + em; })();
    while (sh * 60 + sm + dur <= endMin) {
      slots.push(`${String(sh).padStart(2,"0")}:${String(sm).padStart(2,"0")}`);
      sm += 30; if (sm >= 60) { sh++; sm -= 60; }
    }
    return slots;
  };

  const fTime = (t) => { if (!t) return ""; const [h,m] = t.split(":"); const hr = parseInt(h); return `${hr%12||12}:${m} ${hr>=12?"PM":"AM"}`; };
  const fDate = (d) => { if (!d) return ""; return new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}); };
  const todayStr = () => new Date().toISOString().split("T")[0];

  // FIX #13: prevent past month nav
  const isCurrentMonth = () => { const n = new Date(); return calMonth.year === n.getFullYear() && calMonth.month === n.getMonth(); };

  // Fetch booked slots — FIX #19: proper CORS
  const fetchBookedSlots = async () => {
    const url = localStorage.getItem("5starr-sheet-url"); if (!url) return;
    setLoadingSlots(true);
    try {
      const resp = await fetch(url + "?action=bookings");
      const data = await resp.json();
      if (data.success && data.bookings) setBookedSlots(data.bookings);
    } catch (e) { console.error("Fetch error:", e); }
    setLoadingSlots(false);
  };

  useEffect(() => { if (view === "calendar") fetchBookedSlots(); }, [view]);

  const isSlotTaken = (ds, time, dur) => {
    const ss = parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
    const se = ss + dur;
    return bookedSlots.some(b => {
      if (b.date !== ds || !b.time) return false;
      const bs = parseInt(b.time.split(":")[0]) * 60 + parseInt(b.time.split(":")[1]);
      return ss < bs + (b.duration || 75) && se > bs;
    });
  };

  // FIX #8: count available slots
  const countOpen = (ds, dur) => genSlots(ds, dur).filter(s => !isSlotTaken(ds, s, dur)).length;

  // FIX #2: form validation
  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = true;
    if (!formData.contact.trim()) e.contact = true;
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  // FIX #14: recurring preview
  const getRecurringDates = () => {
    if (recurring === "none" || !selectedDate) return [];
    const start = new Date(selectedDate + "T12:00:00");
    const inc = recurring === "weekly" ? 7 : 30;
    const end = recurringEnd ? new Date(recurringEnd + "T12:00:00") : new Date(start.getTime() + 90*24*60*60*1000);
    const dates = []; let cur = new Date(start.getTime() + inc*24*60*60*1000);
    while (cur <= end && dates.length < 12) { dates.push(cur.toISOString().split("T")[0]); cur = new Date(cur.getTime() + inc*24*60*60*1000); }
    return dates;
  };

  // FIX #5 & #19: submit with loading + proper CORS
  const submitBooking = async () => {
    const url = localStorage.getItem("5starr-sheet-url");
    if (!url) { setSubmitState("error"); return; }
    setSubmitState("sending");
    try {
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "client_request",
          booking: { clientName: formData.name.trim(), clientContact: formData.contact.trim(), date: selectedDate, time: selectedTime, duration: parseInt(duration), sessionType: formData.type, location: formData.location, notes: formData.notes.trim() },
          recurring, recurringEnd: recurringEnd || null,
        }),
      });
      setSubmitState("sent");
    } catch (e) { setSubmitState("error"); }
  };

  // FIX #3: clickable step nav
  const goToStep = (t) => { if (t < step) { setStep(t); if (t <= 1) setSelectedTime(null); } };

  // FIX #11: pricing
  const sessionPricing = { "1-on-1": "$1.25/min", "Small Group (2-4)": "$0.50/min per player", "Large Group": "$20 flat per player" };

  // FIX #4: Reusable duration selector
  const DurationPicker = () => (
    <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
      {[{v:"60",l:"60 MIN"},{v:"75",l:"75 MIN ★"},{v:"90",l:"90 MIN"}].map(d => (
        <button key={d.v} onClick={() => { setDuration(d.v); setSelectedTime(null); }} style={{
          padding:"8px 18px", borderRadius:6, fontFamily:"'Oswald', sans-serif", fontSize:13, letterSpacing:1, cursor:"pointer",
          border: duration===d.v ? "2px solid #D4A843" : "1px solid rgba(212,168,67,0.12)",
          background: duration===d.v ? "rgba(212,168,67,0.1)" : "rgba(255,255,255,0.02)",
          color: duration===d.v ? "#F0D78C" : "#8A8FA3", fontWeight: duration===d.v ? 600 : 400,
        }}>{d.l}</button>
      ))}
    </div>
  );

  // Calendar — FIX #6, #7, #8, #13, #21
  const renderCalendar = (mini = false) => {
    const { year, month } = calMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = todayStr();
    const monthName = new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(<div key={`e${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      const avail = getAvail(ds); const isPast = ds < today; const isToday = ds === today;
      const isSel = ds === selectedDate; const isSun = new Date(ds+"T12:00:00").getDay()===0;
      const open = avail ? countOpen(ds, parseInt(duration)) : 0;
      const allTaken = avail && genSlots(ds, parseInt(duration)).length > 0 && open === 0;
      const disabled = isPast || !avail || allTaken;
      cells.push(
        <button key={d} onClick={() => { if (!disabled) { setSelectedDate(ds); setSelectedTime(null); if (step < 2) setStep(2); } }}
          aria-label={`${new Date(ds+"T12:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric"})}${avail ? `, ${open} slots open` : isSun ? ", by request" : ""}`}
          style={{
            width:"100%", aspectRatio:"1",
            border: isSel ? "2px solid #D4A843" : isToday ? "2px solid rgba(212,168,67,0.4)" : "1px solid rgba(212,168,67,0.08)",
            borderRadius: mini ? 6 : 8,
            background: isSel ? "rgba(212,168,67,0.12)" : isToday ? "rgba(212,168,67,0.05)" : disabled ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.025)",
            color: isSel ? "#F0D78C" : isToday ? "#D4A843" : disabled ? "#2A2F43" : "#C8CCD8",
            fontFamily:"'Oswald', sans-serif", fontSize: mini ? 11 : 16, fontWeight: isSel || isToday ? 700 : 500,
            cursor: disabled ? "default" : "pointer", transition:"all 0.15s",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: mini?0:2, padding: mini?2:4,
          }}>
          {d}
          {!mini && !disabled && avail && !isPast && (
            <div style={{ display:"flex", alignItems:"center", gap:3 }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background: open <= 2 ? "#fb923c" : "#34d399" }} />
              <span style={{ fontSize:8, color:"#5A5F73" }}>{open}</span>
            </div>
          )}
          {!mini && !disabled && avail && !isPast && <div style={{ fontSize:7, color:"#3A3F53" }}>{avail.label}</div>}
          {isSun && !mini && <div style={{ fontSize:7, color:"#3A3F53" }}>REQ</div>}
        </button>
      );
    }
    return { cells, monthName };
  };

  // FIX #13: Month nav with past-month block
  const MonthNav = ({ mini }) => {
    const { monthName } = renderCalendar(mini);
    return (
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: mini ? 12 : 20 }}>
        <button onClick={() => { if (!isCurrentMonth()) setCalMonth(p => { const m=p.month-1; return m<0?{year:p.year-1,month:11}:{year:p.year,month:m}; }); }}
          disabled={isCurrentMonth()}
          style={{ background:"none", border:"1px solid rgba(212,168,67,0.12)", color: isCurrentMonth()?"#1A1F33":"#8A8FA3", padding: mini?"4px 10px":"6px 14px", borderRadius:4, cursor: isCurrentMonth()?"default":"pointer", fontFamily:"'Oswald', sans-serif", fontSize: mini?11:13 }}>←</button>
        <h3 style={{ fontFamily:"'Oswald', sans-serif", fontSize: mini?13:18, color:"#F0D78C", letterSpacing:2, margin:0 }}>{monthName.toUpperCase()}</h3>
        <button onClick={() => setCalMonth(p => { const m=p.month+1; return m>11?{year:p.year+1,month:0}:{year:p.year,month:m}; })}
          style={{ background:"none", border:"1px solid rgba(212,168,67,0.12)", color:"#8A8FA3", padding: mini?"4px 10px":"6px 14px", borderRadius:4, cursor:"pointer", fontFamily:"'Oswald', sans-serif", fontSize: mini?11:13 }}>→</button>
      </div>
    );
  };

  // FIX #3: Clickable step dots
  const StepDot = ({ num, label, active, done }) => (
    <div style={{ display:"flex", alignItems:"center", gap:8, cursor: done?"pointer":"default" }} onClick={() => done && goToStep(num)}>
      <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
        background: done?"#D4A843":active?"rgba(212,168,67,0.2)":"rgba(255,255,255,0.03)",
        border: active?"2px solid #D4A843":"1px solid rgba(212,168,67,0.1)",
        color: done?"#0A0E1A":active?"#F0D78C":"#3A3F53",
        fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight:700, transition:"all 0.2s",
      }} aria-current={active?"step":undefined}>{done?"✓":num}</div>
      <span className="step-label" style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color: active||done?"#C8CCD8":"#3A3F53", letterSpacing:1, display:"none" }}>{label}</span>
    </div>
  );

  const forms = [
    { icon: "🌟", title: "SCHOLARSHIP APPLICATION", desc: "If financial circumstances are a barrier, this application is for you. All applications are reviewed by Coach Starr personally and kept confidential.", url: "https://forms.gle/nLuSVgTBZT3cWp9Z9", cta: "Apply for Scholarship" },
    { icon: "📋", title: "LIABILITY WAIVER", desc: "Required before your first session. Complete this waiver and photo/video consent form so we can get to work.", url: "https://forms.gle/P1Vjfx9YFzi94Avq7", cta: "Complete Waiver" },
  ];

  const inputBase = { width:"100%", boxSizing:"border-box", background:"rgba(255,255,255,0.03)", borderRadius:6, padding:"12px 14px", color:"#C8CCD8", fontSize:14, fontFamily:"'Libre Baskerville', serif", outline:"none" };

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Get Started" title="BOOK NOW" sub="Take the first step in your development journey" />

        {view === "main" ? (
          <>
            <div style={{ maxWidth:900, margin:"0 auto 48px" }}>
              <div style={{ ...cardStyle, padding:40, textAlign:"center" }}>
                <div style={goldTopBar} />
                <span style={{ fontSize:48, display:"block", marginBottom:16 }}>🏀</span>
                <h3 style={{ ...headingFont(24), marginBottom:12 }}>BOOK A SESSION</h3>
                <p style={{ ...bodyFont, fontSize:14, margin:"0 0 8px", maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>Browse Coach Starr's availability, pick your date and time, choose your session length, and request your spot — all in one step.</p>
                <p style={{ ...bodyFont, fontSize:12, color:"#5A5F73", margin:"0 0 28px" }}>Coach Starr reviews every request personally and will confirm within 24 hours.</p>
                <GoldButton onClick={() => setView("calendar")}>OPEN SCHEDULING CALENDAR</GoldButton>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:24, maxWidth:620, margin:"0 auto 48px" }}>
              {forms.map((f, i) => (
                <div key={i} style={{ ...cardStyle, padding:32, textAlign:"center", display:"flex", flexDirection:"column" }}>
                  <div style={goldTopBar} />
                  <span style={{ fontSize:36, marginBottom:16 }}>{f.icon}</span>
                  <h3 style={{ ...headingFont(18), marginBottom:12 }}>{f.title}</h3>
                  <p style={{ ...bodyFont, fontSize:13, margin:"0 0 24px", flex:1 }}>{f.desc}</p>
                  <a href={f.url} target="_blank" rel="noopener noreferrer" style={{ display:"block", background:"linear-gradient(135deg, #D4A843, #B8902F)", border:"none", padding:"14px 24px", color:"#0A0E1A", fontFamily:"'Oswald', sans-serif", fontSize:13, fontWeight:600, letterSpacing:2, cursor:"pointer", borderRadius:4, textTransform:"uppercase", textDecoration:"none", textAlign:"center" }}>{f.cta}</a>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", maxWidth:500, margin:"0 auto" }}>
              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, color:"#8A8FA3", fontStyle:"italic", marginBottom:8 }}>Prefer to reach out directly?</p>
              <a href="mailto:chris@5starrdevelopment.com" style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#D4A843", letterSpacing:2, textDecoration:"none" }}>CHRIS@5STARRDEVELOPMENT.COM</a>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => { setView("main"); setStep(1); setSelectedDate(null); setSelectedTime(null); setSubmitState("idle"); setFormErrors({}); }}
              style={{ background:"none", border:"none", color:"#D4A843", fontFamily:"'Oswald', sans-serif", fontSize:13, letterSpacing:1.5, cursor:"pointer", marginBottom:24, display:"flex", alignItems:"center", gap:6 }}>← BACK TO BOOK NOW</button>

            {/* FIX #3: Clickable step indicator with gold connector for completed */}
            <div style={{ display:"flex", gap:16, marginBottom:32, alignItems:"center", flexWrap:"wrap" }}>
              <StepDot num={1} label="DATE" active={step===1} done={step>1} />
              <div style={{ flex:"0 0 24px", height:1, background: step>1?"#D4A843":"rgba(212,168,67,0.15)", transition:"background 0.3s" }} />
              <StepDot num={2} label="TIME" active={step===2} done={step>2} />
              <div style={{ flex:"0 0 24px", height:1, background: step>2?"#D4A843":"rgba(212,168,67,0.15)", transition:"background 0.3s" }} />
              <StepDot num={3} label="DETAILS" active={step===3} done={step>3} />
              <div style={{ flex:"0 0 24px", height:1, background: step>3?"#D4A843":"rgba(212,168,67,0.15)", transition:"background 0.3s" }} />
              <StepDot num={4} label="CONFIRM" active={step===4} done={submitState==="sent"} />
            </div>

            {submitState === "sent" ? (
              <div className="step-content" style={{ ...cardStyle, padding:48, textAlign:"center", maxWidth:600, margin:"0 auto" }}>
                <div style={goldTopBar} />
                <div style={{ fontSize:48, marginBottom:16 }}>✓</div>
                <h3 style={{ ...headingFont(24), marginBottom:12 }}>REQUEST SUBMITTED</h3>
                <p style={{ ...bodyFont, fontSize:14, margin:"0 0 8px" }}>Your session request for <span style={{ color:"#F0D78C" }}>{fDate(selectedDate)}</span> at <span style={{ color:"#F0D78C" }}>{fTime(selectedTime)}</span> has been sent.</p>
                {recurring !== "none" && <p style={{ ...bodyFont, fontSize:13, color:"#D4A843" }}>Recurring {recurring} sessions have also been requested.</p>}
                <p style={{ ...bodyFont, fontSize:13, margin:"16px 0 20px" }}>Coach Starr will review and confirm within 24 hours.</p>
                {/* FIX #9: Waiver reminder */}
                <div style={{ padding:16, background:"rgba(212,168,67,0.05)", border:"1px solid rgba(212,168,67,0.15)", borderRadius:8, marginBottom:28, textAlign:"left" }}>
                  <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#D4A843", letterSpacing:2, margin:"0 0 6px" }}>📋 BEFORE YOUR FIRST SESSION</p>
                  <p style={{ ...bodyFont, fontSize:12, margin:"0 0 8px" }}>Please complete the liability waiver if you haven't already:</p>
                  <a href="https://forms.gle/P1Vjfx9YFzi94Avq7" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#D4A843", letterSpacing:1.5, textDecoration:"underline" }}>COMPLETE WAIVER →</a>
                </div>
                <GoldButton onClick={() => { setView("main"); setStep(1); setSelectedDate(null); setSelectedTime(null); setSubmitState("idle"); setFormData({name:"",contact:"",type:"1-on-1",location:"Bishop McGuinness",notes:""}); setRecurring("none"); setRecurringEnd(""); setFormErrors({}); }}>DONE</GoldButton>
              </div>
            ) : (
              /* FIX #1: responsive grid class */
              <div className={step === 2 ? "booking-grid-2col" : "booking-grid-1col"} style={{ maxWidth:800, margin:"0 auto" }}>

                {/* STEP 1 */}
                {step === 1 && (() => { const { cells } = renderCalendar(); return (
                  <div className="step-content" style={{ ...cardStyle, padding:28 }}>
                    <div style={goldTopBar} />
                    <MonthNav />
                    <DurationPicker />
                    <div style={{ height:20 }} />
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4, marginBottom:8 }}>
                      {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
                        <div key={d} style={{ textAlign:"center", fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#5A5F73", letterSpacing:1.5, padding:4 }}>{d}</div>
                      ))}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4 }}>{cells}</div>
                    <div style={{ display:"flex", gap:16, justifyContent:"center", marginTop:16, flexWrap:"wrap" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:6, height:6, borderRadius:"50%", background:"#34d399" }} /><span style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#5A5F73", letterSpacing:1 }}>OPEN</span></div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:6, height:6, borderRadius:"50%", background:"#fb923c" }} /><span style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#5A5F73", letterSpacing:1 }}>FEW LEFT</span></div>
                    </div>
                    {loadingSlots && <div style={{ textAlign:"center", marginTop:12, fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#D4A843", letterSpacing:1 }}>LOADING AVAILABILITY...</div>}
                  </div>
                ); })()}

                {/* STEP 2 — FIX #1 responsive, FIX #4 duration on step 2 */}
                {step === 2 && (<>
                  {(() => { const { cells } = renderCalendar(true); return (
                    <div className="step-content" style={{ ...cardStyle, padding:20 }}>
                      <div style={goldTopBar} />
                      <MonthNav mini />
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:3, marginBottom:6 }}>
                        {["S","M","T","W","T","F","S"].map((d,i) => <div key={i} style={{ textAlign:"center", fontFamily:"'Oswald', sans-serif", fontSize:9, color:"#3A3F53", letterSpacing:1 }}>{d}</div>)}
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:3 }}>{cells}</div>
                    </div>
                  ); })()}
                  <div className="step-content" style={{ ...cardStyle, padding:24 }}>
                    <div style={goldTopBar} />
                    <h4 style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#D4A843", letterSpacing:2, margin:"0 0 4px" }}>SELECT TIME</h4>
                    <p style={{ ...bodyFont, fontSize:13, margin:"0 0 12px" }}>{fDate(selectedDate)}</p>
                    <div style={{ marginBottom:16 }}><DurationPicker /></div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                      {genSlots(selectedDate, parseInt(duration)).map(time => {
                        const taken = isSlotTaken(selectedDate, time, parseInt(duration)); const sel = selectedTime === time;
                        return (
                          <button key={time} onClick={() => { if (!taken) { setSelectedTime(time); setStep(3); } }} disabled={taken}
                            aria-label={`${fTime(time)}${taken?", unavailable":""}`}
                            style={{ padding:"12px 20px", borderRadius:6, fontFamily:"'Oswald', sans-serif", fontSize:15, letterSpacing:1,
                              cursor: taken?"default":"pointer", transition:"all 0.15s",
                              border: sel?"2px solid #D4A843":"1px solid rgba(212,168,67,0.12)",
                              background: taken?"rgba(255,255,255,0.01)":sel?"rgba(212,168,67,0.12)":"rgba(255,255,255,0.025)",
                              color: taken?"#2A2F43":sel?"#F0D78C":"#C8CCD8",
                              textDecoration: taken?"line-through":"none", fontWeight: sel?700:400,
                            }}>{fTime(time)}</button>
                        );
                      })}
                    </div>
                    {genSlots(selectedDate, parseInt(duration)).length === 0 && <p style={{ ...bodyFont, fontSize:13, color:"#5A5F73", textAlign:"center", padding:20 }}>No available slots for this date and duration.</p>}
                  </div>
                </>)}

                {/* STEP 3 — FIX #2, #11, #14, #21 */}
                {step === 3 && (
                  <div className="step-content" style={{ ...cardStyle, padding:28, maxWidth:560, margin:"0 auto", width:"100%" }}>
                    <div style={goldTopBar} />
                    <h4 style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#D4A843", letterSpacing:2, margin:"0 0 4px" }}>YOUR DETAILS</h4>
                    <p style={{ ...bodyFont, fontSize:13, margin:"0 0 24px" }}>{fDate(selectedDate)} at {fTime(selectedTime)} · {duration} min</p>
                    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                      <div>
                        <label htmlFor="bk-name" style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color: formErrors.name?"#f87171":"#D4A843", letterSpacing:2, display:"block", marginBottom:4 }}>NAME *</label>
                        <input id="bk-name" value={formData.name} onChange={e => { setFormData(p=>({...p,name:e.target.value})); setFormErrors(p=>({...p,name:false})); }} placeholder="Your name"
                          className={formErrors.name?"input-error":""} style={{ ...inputBase, border:`1px solid ${formErrors.name?"#f87171":"rgba(212,168,67,0.15)"}` }} />
                        {formErrors.name && <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#f87171", marginTop:4, display:"block" }}>Please enter your name</span>}
                      </div>
                      <div>
                        <label htmlFor="bk-contact" style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color: formErrors.contact?"#f87171":"#D4A843", letterSpacing:2, display:"block", marginBottom:4 }}>PHONE OR EMAIL *</label>
                        <input id="bk-contact" value={formData.contact} onChange={e => { setFormData(p=>({...p,contact:e.target.value})); setFormErrors(p=>({...p,contact:false})); }} placeholder="How Coach Starr should reach you"
                          className={formErrors.contact?"input-error":""} style={{ ...inputBase, border:`1px solid ${formErrors.contact?"#f87171":"rgba(212,168,67,0.15)"}` }} />
                        {formErrors.contact && <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#f87171", marginTop:4, display:"block" }}>Please enter your phone or email</span>}
                      </div>
                      <div className="form-grid-2col">
                        <div>
                          <label htmlFor="bk-type" style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#D4A843", letterSpacing:2, display:"block", marginBottom:4 }}>SESSION TYPE</label>
                          <select id="bk-type" value={formData.type} onChange={e => setFormData(p=>({...p,type:e.target.value}))} style={{ ...inputBase, border:"1px solid rgba(212,168,67,0.15)" }}>
                            <option value="1-on-1">1-on-1 Private</option><option value="Small Group (2-4)">Small Group (2-4)</option><option value="Large Group">Large Group</option>
                          </select>
                          <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#5A5F73", marginTop:4, display:"block" }}>{sessionPricing[formData.type]}</span>
                        </div>
                        <div>
                          <label htmlFor="bk-loc" style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#D4A843", letterSpacing:2, display:"block", marginBottom:4 }}>LOCATION</label>
                          <select id="bk-loc" value={formData.location} onChange={e => setFormData(p=>({...p,location:e.target.value}))} style={{ ...inputBase, border:"1px solid rgba(212,168,67,0.15)" }}>
                            <option value="Bishop McGuinness">Bishop McGuinness HS</option><option value="OU Health Club">OU Health Club</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ borderTop:"1px solid rgba(212,168,67,0.1)", paddingTop:16 }}>
                        <label style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#D4A843", letterSpacing:2, display:"block", marginBottom:8 }}>MAKE THIS RECURRING?</label>
                        <div style={{ display:"flex", gap:8, marginBottom: recurring!=="none"?12:0 }}>
                          {[{v:"none",l:"ONE TIME"},{v:"weekly",l:"WEEKLY"},{v:"monthly",l:"MONTHLY"}].map(o => (
                            <button key={o.v} onClick={() => setRecurring(o.v)} style={{ padding:"8px 16px", borderRadius:6, fontFamily:"'Oswald', sans-serif", fontSize:12, letterSpacing:1, cursor:"pointer",
                              border: recurring===o.v?"2px solid #D4A843":"1px solid rgba(212,168,67,0.12)",
                              background: recurring===o.v?"rgba(212,168,67,0.1)":"rgba(255,255,255,0.02)",
                              color: recurring===o.v?"#F0D78C":"#8A8FA3", fontWeight: recurring===o.v?600:400 }}>{o.l}</button>
                          ))}
                        </div>
                        {recurring !== "none" && (<div>
                          <label style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#5A5F73", letterSpacing:1, display:"block", marginBottom:4 }}>UNTIL (OPTIONAL)</label>
                          <input type="date" value={recurringEnd} onChange={e => setRecurringEnd(e.target.value)} style={{ ...inputBase, border:"1px solid rgba(212,168,67,0.15)", colorScheme:"dark", width:"auto" }} />
                          {(() => { const dates = getRecurringDates(); if (!dates.length) return null; return (
                            <div style={{ marginTop:10, padding:10, background:"rgba(255,255,255,0.02)", borderRadius:6, border:"1px solid rgba(212,168,67,0.06)" }}>
                              <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#D4A843", letterSpacing:1, margin:"0 0 6px" }}>WILL ALSO REQUEST ({dates.length} SESSIONS):</p>
                              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                                {dates.map(d => <span key={d} style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#8A8FA3", background:"rgba(255,255,255,0.03)", padding:"2px 8px", borderRadius:4, border:"1px solid rgba(212,168,67,0.06)" }}>{new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>)}
                                {dates.length >= 12 && <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#5A5F73" }}>...</span>}
                              </div>
                            </div>
                          ); })()}
                        </div>)}
                      </div>
                      <div>
                        <label htmlFor="bk-notes" style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#D4A843", letterSpacing:2, display:"block", marginBottom:4 }}>NOTES (OPTIONAL)</label>
                        <textarea id="bk-notes" value={formData.notes} onChange={e => setFormData(p=>({...p,notes:e.target.value}))} placeholder="Skills to focus on, number of players, etc." rows={3}
                          style={{ ...inputBase, border:"1px solid rgba(212,168,67,0.15)", resize:"vertical" }} />
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:12, marginTop:24, flexWrap:"wrap" }}>
                      <button onClick={() => setStep(2)} style={{ background:"none", border:"1px solid rgba(212,168,67,0.15)", padding:"14px 24px", color:"#8A8FA3", fontFamily:"'Oswald', sans-serif", fontSize:13, fontWeight:600, letterSpacing:2, cursor:"pointer", borderRadius:4 }}>← BACK</button>
                      <GoldButton onClick={() => { if (validateForm()) setStep(4); }}>REVIEW & CONFIRM →</GoldButton>
                    </div>
                  </div>
                )}

                {/* STEP 4 — FIX #5 */}
                {step === 4 && (
                  <div className="step-content" style={{ ...cardStyle, padding:28, maxWidth:560, margin:"0 auto", width:"100%" }}>
                    <div style={goldTopBar} />
                    <h4 style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#D4A843", letterSpacing:2, margin:"0 0 20px" }}>REVIEW YOUR REQUEST</h4>
                    <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
                      {[
                        ["DATE", fDate(selectedDate)], ["TIME", fTime(selectedTime)], ["DURATION", `${duration} minutes`],
                        ["NAME", formData.name], ["CONTACT", formData.contact],
                        ["TYPE", `${formData.type} — ${sessionPricing[formData.type]}`], ["LOCATION", formData.location],
                        ...(recurring!=="none" ? [["RECURRING", `${recurring}${recurringEnd?` until ${new Date(recurringEnd+"T12:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}`:" (3 months)"} — ${getRecurringDates().length} additional`]] : []),
                        ...(formData.notes ? [["NOTES", formData.notes]] : []),
                      ].map(([l, v]) => (
                        <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"8px 0", borderBottom:"1px solid rgba(212,168,67,0.06)", gap:12 }}>
                          <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#5A5F73", letterSpacing:1.5, minWidth:70, flexShrink:0 }}>{l}</span>
                          <span style={{ fontFamily:"'Libre Baskerville', serif", fontSize:14, color:"#F0D78C", textAlign:"right" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ ...bodyFont, fontSize:12, color:"#5A5F73", margin:"0 0 20px" }}>Coach Starr will confirm within 24 hours via your contact info.</p>
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                      <button onClick={() => setStep(3)} disabled={submitState==="sending"} style={{ background:"none", border:"1px solid rgba(212,168,67,0.15)", padding:"14px 24px", color:"#8A8FA3", fontFamily:"'Oswald', sans-serif", fontSize:13, fontWeight:600, letterSpacing:2, cursor:submitState==="sending"?"not-allowed":"pointer", borderRadius:4, opacity:submitState==="sending"?0.4:1 }}>← EDIT</button>
                      <button onClick={submitBooking} disabled={submitState==="sending"} style={{
                        background: submitState==="sending"?"rgba(212,168,67,0.5)":"linear-gradient(135deg, #D4A843, #B8902F)", border:"none",
                        padding:"14px 40px", color:"#0A0E1A", fontFamily:"'Oswald', sans-serif", fontSize:15, fontWeight:600, letterSpacing:2,
                        cursor: submitState==="sending"?"not-allowed":"pointer", borderRadius:4, textTransform:"uppercase", display:"flex", alignItems:"center", gap:8,
                      }}>
                        {submitState==="sending" && <span style={{ display:"inline-block", width:14, height:14, border:"2px solid #0A0E1A", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.6s linear infinite" }} />}
                        {submitState==="sending" ? "SENDING..." : "SUBMIT REQUEST"}
                      </button>
                    </div>
                    {submitState === "error" && <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#f87171", letterSpacing:1, marginTop:12 }}>SOMETHING WENT WRONG — TRY AGAIN OR EMAIL CHRIS@5STARRDEVELOPMENT.COM</p>}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};

// ─── Schedule Page (Coach Dashboard — Hidden) ───
const SCHED_TABS = [
  { key: "today", label: "TODAY", icon: "📋" },
  { key: "pending", label: "PENDING", icon: "⏳" },
  { key: "new", label: "NEW BOOKING", icon: "+" },
  { key: "calendar", label: "WEEK", icon: "📅" },
  { key: "clients", label: "CLIENTS", icon: "👤" },
  { key: "prospects", label: "PROSPECTS", icon: "🎯" },
  { key: "reminder", label: "REMINDER", icon: "🔔" },
  { key: "settings", label: "SETTINGS", icon: "⚙️" },
];

function schedUid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function schedFmt(d) { return new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); }
function schedFmtTime(t) { const [h, m] = t.split(":"); const hr = parseInt(h); return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`; }
function schedToday() { return new Date().toISOString().split("T")[0]; }
function schedDayOfWeek(ds) { return new Date(ds + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" }); }

function schedAvail(ds) {
  const d = schedDayOfWeek(ds);
  const m = { Monday:{s:"15:00",e:"20:00"}, Tuesday:{s:"15:00",e:"20:00"}, Wednesday:{s:"15:00",e:"20:00"}, Thursday:{s:"15:00",e:"20:00"}, Friday:{s:"15:00",e:"18:00"}, Saturday:{s:"08:00",e:"13:00"} };
  return m[d] || null;
}

function schedSlots(ds, dur = 75) {
  const a = schedAvail(ds);
  if (!a) return [];
  const slots = [];
  let [sh, sm] = a.s.split(":").map(Number);
  const [eh, em] = a.e.split(":").map(Number);
  const endMin = eh * 60 + em;
  while (sh * 60 + sm + dur <= endMin) {
    const start = `${String(sh).padStart(2,"0")}:${String(sm).padStart(2,"0")}`;
    const t = sh * 60 + sm + dur;
    slots.push({ start, end: `${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}` });
    sm += 30; if (sm >= 60) { sh++; sm -= 60; }
  }
  return slots;
}

const schedInput = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 6, padding: "10px 14px", color: "#C8CCD8", fontSize: 14, fontFamily: "'Libre Baskerville', serif", outline: "none", width: "100%", boxSizing: "border-box" };
const schedLabel = { fontFamily: "'Oswald', sans-serif", fontSize: 10, color: "#D4A843", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, display: "block" };
const schedCard = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,168,67,0.12)", borderRadius: 8, padding: 20, position: "relative" };

const SchedBadge = ({ type, children }) => {
  const c = { pending: ["rgba(251,146,60,0.12)","#fb923c"], approved: ["rgba(52,211,153,0.12)","#34d399"], declined: ["rgba(248,113,113,0.12)","#f87171"] };
  const [bg, fg] = c[type] || c.pending;
  return <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:20, fontSize:10, fontWeight:600, letterSpacing:1, textTransform:"uppercase", fontFamily:"'Oswald', sans-serif", background:bg, color:fg }}>{children}</span>;
};

const SchedulePage = () => {
  const [tab, setTab] = useState("today");
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("");
  const [syncStatus, setSyncStatus] = useState("");
  const [prospects, setProspects] = useState([]);

  // FIX #15: Fetch bookings from Sheet on load (merges with local)
  const fetchFromSheet = async (url) => {
    if (!url) return;
    try {
      const resp = await fetch(url + "?action=bookings");
      const data = await resp.json();
      if (data.success && data.bookings) {
        // Merge sheet bookings into local state (sheet is source of truth for client requests)
        setBookings(prev => {
          const localIds = new Set(prev.map(b => b.id));
          const sheetPending = data.bookings
            .filter(b => b.status === "pending" && !localIds.has(b.id))
            .map(b => ({ ...b, id: b.id || schedUid(), fromSheet: true }));
          return [...prev, ...sheetPending];
        });
      }
    } catch (e) { console.error("Sheet fetch error:", e); }
  };

  useEffect(() => {
    const stored = localStorage.getItem("5starr-schedule");
    if (stored) { try { setBookings(JSON.parse(stored)); } catch {} }
    else {
      // Seed confirmed weekly clients — generate 12 weeks of recurring bookings
      const seed = [];
      const now = new Date();
      // Find next Monday from today
      const startDate = new Date(now);
      startDate.setDate(now.getDate() + ((1 - now.getDay() + 7) % 7 || 7));
      if (startDate <= now) startDate.setDate(startDate.getDate() + 7);

      for (let week = 0; week < 12; week++) {
        const mon = new Date(startDate); mon.setDate(startDate.getDate() + week * 7);
        const tue = new Date(mon); tue.setDate(mon.getDate() + 1);
        const wed = new Date(mon); wed.setDate(mon.getDate() + 2);
        const thu = new Date(mon); thu.setDate(mon.getDate() + 3);

        const ds = (d) => d.toISOString().split("T")[0];

        // Ola — Mon 4:15 PM & Thu 4:15 PM
        seed.push({ id: schedUid(), clientName: "Ola Ladele", clientContact: "", date: ds(mon), time: "16:15", duration: 75, sessionType: "1-on-1", location: "Bishop McGuinness", source: "Recurring", notes: "", status: "approved", createdAt: new Date().toISOString() });
        seed.push({ id: schedUid(), clientName: "Ola Ladele", clientContact: "", date: ds(thu), time: "16:15", duration: 75, sessionType: "1-on-1", location: "Bishop McGuinness", source: "Recurring", notes: "", status: "approved", createdAt: new Date().toISOString() });

        // DJ Miller — Tue 3:00 PM & Wed 3:00 PM
        seed.push({ id: schedUid(), clientName: "DJ Miller", clientContact: "", date: ds(tue), time: "15:00", duration: 75, sessionType: "1-on-1", location: "Bishop McGuinness", source: "Recurring", notes: "", status: "approved", createdAt: new Date().toISOString() });
        seed.push({ id: schedUid(), clientName: "DJ Miller", clientContact: "", date: ds(wed), time: "15:00", duration: 75, sessionType: "1-on-1", location: "Bishop McGuinness", source: "Recurring", notes: "", status: "approved", createdAt: new Date().toISOString() });

        // Denton Jaggers — Wed evening (pending, time TBD — using 18:00 placeholder)
        seed.push({ id: schedUid(), clientName: "Denton Jaggers", clientContact: "", date: ds(wed), time: "18:00", duration: 75, sessionType: "1-on-1", location: "Bishop McGuinness", source: "Recurring", notes: "Wednesday evening — exact time TBD", status: "pending", createdAt: new Date().toISOString() });
      }
      setBookings(seed);
    }
    const url = localStorage.getItem("5starr-sheet-url");
    if (url) { setSheetUrl(url); fetchFromSheet(url); }
    const storedProspects = localStorage.getItem("5starr-prospects");
    if (storedProspects) { try { setProspects(JSON.parse(storedProspects)); } catch {} }
    else {
      // Pre-load initial prospects from Chris's list
      setProspects([
        { id: schedUid(), name: "Ben", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Reed", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Barron", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Hudson", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Frank", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Boogie", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Jojo", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Mike", status: "not_contacted", notes: "", lastContact: "" },
        { id: schedUid(), name: "Gavin", status: "not_contacted", notes: "", lastContact: "" },
      ]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("5starr-schedule", JSON.stringify(bookings));
  }, [bookings, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("5starr-prospects", JSON.stringify(prospects));
  }, [prospects, loaded]);

  // FIX #19: Remove no-cors for proper error handling
  const syncToSheet = async (updatedBookings) => {
    const url = sheetUrl || localStorage.getItem("5starr-sheet-url");
    if (!url) return;
    const approved = (updatedBookings || bookings).filter(b => b.status === "approved");
    try {
      setSyncStatus("syncing");
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync", bookings: approved }),
      });
      setSyncStatus("synced");
      setTimeout(() => setSyncStatus(""), 3000);
    } catch (e) {
      setSyncStatus("error");
      setTimeout(() => setSyncStatus(""), 4000);
    }
  };

  const saveSheetUrl = (url) => {
    setSheetUrl(url);
    localStorage.setItem("5starr-sheet-url", url);
  };

  const addBooking = (form) => {
    const newBookings = [...bookings, { ...form, id: schedUid(), status: "pending", createdAt: new Date().toISOString() }];
    setBookings(newBookings);
    setTab("pending");
  };
  const approve = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: "approved" } : b);
    setBookings(updated);
    syncToSheet(updated);
  };
  const decline = (id) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "declined" } : b));
  const pendingCount = bookings.filter(b => b.status === "pending").length;

  // ── Today Tab ──
  const TodayTab = () => {
    const today = schedToday();
    const todayB = bookings.filter(b => b.date === today && b.status === "approved").sort((a,b) => a.time.localeCompare(b.time));
    const upcoming = bookings.filter(b => b.date > today && b.status === "approved").sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)).slice(0, 5);
    return (
      <div>
        <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:20 }}>
          <h3 style={{ ...headingFont(24), margin:0 }}>TODAY</h3>
          <span style={{ ...bodyFont, fontSize:13 }}>{schedFmt(today)}</span>
        </div>
        {todayB.length === 0 ? (
          <div style={{ ...schedCard, textAlign:"center", padding:48 }}>
            <div style={{ fontSize:32, marginBottom:8 }}>🏀</div>
            <p style={{ ...bodyFont, margin:0 }}>No sessions today. Rest up, Coach.</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {todayB.map(b => (
              <div key={b.id} style={{ ...schedCard, display:"flex", justifyContent:"space-between", alignItems:"center", borderLeft:"3px solid #D4A843" }}>
                <div>
                  <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:16, color:"#F0D78C", letterSpacing:1 }}>{b.clientName}</div>
                  <div style={{ ...bodyFont, fontSize:12, marginTop:2 }}>{b.sessionType} · {b.location}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:18, color:"#D4A843", letterSpacing:1 }}>{schedFmtTime(b.time)}</div>
                  <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#5A5F73" }}>{b.duration} min</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {upcoming.length > 0 && (
          <div style={{ marginTop:40 }}>
            <h4 style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#5A5F73", letterSpacing:3, marginBottom:12 }}>COMING UP</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {upcoming.map(b => (
                <div key={b.id} style={{ ...schedCard, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#C8CCD8", letterSpacing:0.5 }}>{b.clientName}</span>
                    <span style={{ ...bodyFont, fontSize:12, marginLeft:10 }}>{b.sessionType}</span>
                  </div>
                  <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#5A5F73", letterSpacing:1 }}>{schedFmt(b.date)} · {schedFmtTime(b.time)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Pending Tab ──
  const PendingTab = () => {
    const pending = bookings.filter(b => b.status === "pending").sort((a,b) => a.date.localeCompare(b.date));
    return (
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <h3 style={{ ...headingFont(24), margin:0 }}>PENDING REQUESTS</h3>
          {pending.length > 0 && <SchedBadge type="pending">{pending.length}</SchedBadge>}
        </div>
        {pending.length === 0 ? (
          <div style={{ ...schedCard, textAlign:"center", padding:48 }}>
            <p style={{ ...bodyFont, margin:0 }}>All clear — no pending requests.</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {pending.map(b => (
              <div key={b.id} style={{ ...schedCard, borderLeft:"3px solid #fb923c" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div>
                    <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:18, color:"#F0D78C", letterSpacing:1 }}>{b.clientName}</div>
                    <div style={{ ...bodyFont, fontSize:12, marginTop:2 }}>{b.clientContact}</div>
                  </div>
                  <SchedBadge type="pending">Pending</SchedBadge>
                </div>
                <div style={{ display:"flex", gap:20, flexWrap:"wrap", marginBottom:14, fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#5A5F73", letterSpacing:1 }}>
                  <span>📅 {schedFmt(b.date)}</span>
                  <span>🕐 {schedFmtTime(b.time)}</span>
                  <span>⏱ {b.duration} min</span>
                  <span>📍 {b.location}</span>
                  <span>🏀 {b.sessionType}</span>
                </div>
                {b.source && <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#3A3F53", letterSpacing:1, marginBottom:10 }}>VIA {b.source.toUpperCase()}</div>}
                {b.notes && <div style={{ ...bodyFont, fontSize:12, fontStyle:"italic", padding:"8px 12px", background:"rgba(255,255,255,0.02)", borderRadius:6, marginBottom:14 }}>"{b.notes}"</div>}
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => approve(b.id)} style={{ background:"linear-gradient(135deg, #D4A843, #B8902F)", border:"none", padding:"8px 20px", color:"#0A0E1A", fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight:600, letterSpacing:1.5, cursor:"pointer", borderRadius:4 }}>✓ APPROVE</button>
                  <button onClick={() => decline(b.id)} style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.2)", padding:"8px 20px", color:"#f87171", fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight:600, letterSpacing:1.5, cursor:"pointer", borderRadius:4 }}>✕ DECLINE</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── New Booking Tab ──
  const NewTab = () => {
    const [form, setForm] = useState({ clientName:"", clientContact:"", date:schedToday(), time:"", duration:"75", sessionType:"1-on-1", location:"Bishop McGuinness", source:"Text", notes:"" });
    const slots = schedSlots(form.date, parseInt(form.duration));
    const avail = schedAvail(form.date);
    const isSunday = schedDayOfWeek(form.date) === "Sunday";
    const bookedTimes = bookings.filter(b => b.date === form.date && b.status === "approved").map(b => b.time);
    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const handleSubmit = () => {
      if (!form.clientName || !form.time) return;
      addBooking({ ...form, duration: parseInt(form.duration) });
      setForm(p => ({ ...p, clientName:"", clientContact:"", time:"", notes:"" }));
    };

    const selectStyle = { ...schedInput, appearance:"none", WebkitAppearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%23D4A843'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:32 };

    return (
      <div>
        <h3 style={{ ...headingFont(24), margin:"0 0 24px" }}>NEW BOOKING</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div><label style={schedLabel}>Client Name</label><input style={schedInput} value={form.clientName} onChange={e => set("clientName", e.target.value)} placeholder="Player name" /></div>
          <div><label style={schedLabel}>Contact</label><input style={schedInput} value={form.clientContact} onChange={e => set("clientContact", e.target.value)} placeholder="Phone or email" /></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:16 }}>
          <div><label style={schedLabel}>Date</label><input type="date" style={{ ...schedInput, colorScheme:"dark" }} value={form.date} onChange={e => set("date", e.target.value)} /></div>
          <div><label style={schedLabel}>Duration</label>
            <select style={selectStyle} value={form.duration} onChange={e => set("duration", e.target.value)}>
              <option value="60">60 min</option><option value="75">75 min (default)</option><option value="90">90 min</option>
            </select>
          </div>
          <div><label style={schedLabel}>Source</label>
            <select style={selectStyle} value={form.source} onChange={e => set("source", e.target.value)}>
              <option value="Text">Text</option><option value="Email">Email</option><option value="Form">Website Form</option><option value="DM">DM</option><option value="Walk-in">Walk-in</option>
            </select>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div><label style={schedLabel}>Session Type</label>
            <select style={selectStyle} value={form.sessionType} onChange={e => set("sessionType", e.target.value)}>
              <option value="1-on-1">1-on-1 Private</option><option value="Small Group (2-4)">Small Group (2-4)</option><option value="Large Group">Large Group</option>
            </select>
          </div>
          <div><label style={schedLabel}>Location</label>
            <select style={selectStyle} value={form.location} onChange={e => set("location", e.target.value)}>
              <option value="Bishop McGuinness">Bishop McGuinness HS</option><option value="OU Health Club">OU Health Club</option>
            </select>
          </div>
        </div>

        {isSunday && (
          <div style={{ padding:14, background:"rgba(251,146,60,0.06)", border:"1px solid rgba(251,146,60,0.15)", borderRadius:6, marginBottom:16, fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#fb923c", letterSpacing:1 }}>
            ⚠️ SUNDAY — AVAILABLE BY REQUEST ONLY
          </div>
        )}

        <div style={{ marginBottom:16 }}>
          <label style={schedLabel}>Time Slot {avail ? `(${schedFmtTime(avail.s)} – ${schedFmtTime(avail.e)})` : ""}</label>
          {isSunday ? (
            <input style={schedInput} placeholder="e.g. 10:00" value={form.time} onChange={e => set("time", e.target.value)} />
          ) : (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4 }}>
              {slots.map(slot => {
                const booked = bookedTimes.includes(slot.start);
                const sel = form.time === slot.start;
                return (
                  <button key={slot.start} onClick={() => !booked && set("time", slot.start)} disabled={booked} style={{
                    padding:"8px 14px", borderRadius:6, fontFamily:"'Oswald', sans-serif", fontSize:13, letterSpacing:0.5, cursor: booked ? "not-allowed" : "pointer", transition:"all 0.15s",
                    border: sel ? "2px solid #D4A843" : "1px solid rgba(212,168,67,0.12)",
                    background: booked ? "rgba(255,255,255,0.01)" : sel ? "rgba(212,168,67,0.1)" : "rgba(255,255,255,0.02)",
                    color: booked ? "#3A3F53" : sel ? "#F0D78C" : "#8A8FA3",
                    textDecoration: booked ? "line-through" : "none", fontWeight: sel ? 600 : 400,
                  }}>{schedFmtTime(slot.start)}</button>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ marginBottom:20 }}><label style={schedLabel}>Notes (optional)</label><input style={schedInput} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Skills to focus on, number of players, etc." /></div>
        <GoldButton onClick={handleSubmit}>ADD BOOKING REQUEST</GoldButton>
      </div>
    );
  };

  // ── Calendar Tab ──
  const CalendarTab = () => {
    const [weekOff, setWeekOff] = useState(0);
    const start = new Date();
    start.setDate(start.getDate() - start.getDay() + 1 + weekOff * 7);
    const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d.toISOString().split("T")[0]; });
    return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ ...headingFont(24), margin:0 }}>WEEKLY VIEW</h3>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => setWeekOff(w => w-1)} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,168,67,0.12)", color:"#8A8FA3", padding:"6px 14px", borderRadius:4, cursor:"pointer", fontFamily:"'Oswald', sans-serif", fontSize:11, letterSpacing:1 }}>← PREV</button>
            <button onClick={() => setWeekOff(0)} style={{ background:"none", border:"none", color:"#D4A843", padding:"6px 10px", cursor:"pointer", fontFamily:"'Oswald', sans-serif", fontSize:11, letterSpacing:1 }}>TODAY</button>
            <button onClick={() => setWeekOff(w => w+1)} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,168,67,0.12)", color:"#8A8FA3", padding:"6px 14px", borderRadius:4, cursor:"pointer", fontFamily:"'Oswald', sans-serif", fontSize:11, letterSpacing:1 }}>NEXT →</button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:6 }}>
          {days.map(ds => {
            const dayB = bookings.filter(b => b.date === ds && (b.status === "approved" || b.status === "pending")).sort((a,b) => a.time.localeCompare(b.time));
            const isToday = ds === schedToday();
            const avail = schedAvail(ds);
            return (
              <div key={ds} style={{ background: isToday ? "rgba(212,168,67,0.04)" : "rgba(255,255,255,0.01)", border:`1px solid ${isToday ? "rgba(212,168,67,0.3)" : "rgba(212,168,67,0.08)"}`, borderRadius:8, padding:10, minHeight:120 }}>
                <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, fontWeight:600, color: isToday ? "#D4A843" : "#5A5F73", letterSpacing:2, marginBottom:2 }}>{schedDayOfWeek(ds).slice(0,3).toUpperCase()}</div>
                <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:20, fontWeight:700, color: isToday ? "#F0D78C" : "#C8CCD8", marginBottom:8 }}>{new Date(ds+"T12:00:00").getDate()}</div>
                {!avail && <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:9, color:"#3A3F53", letterSpacing:1 }}>BY REQUEST</div>}
                {dayB.map(b => {
                  const isPending = b.status === "pending";
                  return (
                    <div key={b.id} style={{ padding:"3px 6px", marginBottom:3, borderRadius:4, background: isPending ? "rgba(251,146,60,0.06)" : "rgba(212,168,67,0.08)", borderLeft: `2px solid ${isPending ? "#fb923c" : "#D4A843"}`, fontSize:10, lineHeight:1.3 }}>
                      <div style={{ fontFamily:"'Oswald', sans-serif", fontWeight:600, color: isPending ? "#fb923c" : "#F0D78C", letterSpacing:0.5 }}>{schedFmtTime(b.time)}{isPending ? " ?" : ""}</div>
                      <div style={{ fontFamily:"'Libre Baskerville', serif", color:"#8A8FA3" }}>{b.clientName}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Clients Tab ──
  const ClientsTab = () => {
    const map = {};
    bookings.forEach(b => {
      if (!map[b.clientName]) map[b.clientName] = { name:b.clientName, contact:b.clientContact, sessions:0, lastDate:"" };
      if (b.status === "approved") map[b.clientName].sessions++;
      if (b.date > map[b.clientName].lastDate) { map[b.clientName].lastDate = b.date; map[b.clientName].contact = b.clientContact || map[b.clientName].contact; }
    });
    const clients = Object.values(map).sort((a,b) => b.sessions - a.sessions);
    return (
      <div>
        <h3 style={{ ...headingFont(24), margin:"0 0 20px" }}>CLIENTS</h3>
        {clients.length === 0 ? (
          <div style={{ ...schedCard, textAlign:"center", padding:48 }}><p style={{ ...bodyFont, margin:0 }}>No clients yet. Add your first booking to get started.</p></div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {clients.map(c => (
              <div key={c.name} style={{ ...schedCard, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:15, color:"#F0D78C", letterSpacing:0.5 }}>{c.name}</div>
                  <div style={{ ...bodyFont, fontSize:12 }}>{c.contact || "No contact info"}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:24, color:"#D4A843" }}>{c.sessions}</div>
                  <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#5A5F73", letterSpacing:1 }}>SESSIONS</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── Prospects Tab ──
  const PROSPECT_STATUSES = [
    { key: "not_contacted", label: "NOT CONTACTED", color: "#5A5F73", bg: "rgba(90,95,115,0.1)" },
    { key: "reached_out", label: "REACHED OUT", color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
    { key: "interested", label: "INTERESTED", color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
    { key: "booked", label: "BOOKED", color: "#34d399", bg: "rgba(52,211,153,0.1)" },
    { key: "not_interested", label: "NOT INTERESTED", color: "#3A3F53", bg: "rgba(58,63,83,0.1)" },
  ];

  const ProspectsTab = () => {
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editNotes, setEditNotes] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const addProspect = () => {
      if (!newName.trim()) return;
      setProspects(prev => [...prev, { id: schedUid(), name: newName.trim(), status: "not_contacted", notes: "", lastContact: "" }]);
      setNewName("");
    };

    const updateStatus = (id, status) => {
      setProspects(prev => prev.map(p => p.id === id ? { ...p, status, lastContact: new Date().toISOString().split("T")[0] } : p));
    };

    const saveNotes = (id) => {
      setProspects(prev => prev.map(p => p.id === id ? { ...p, notes: editNotes } : p));
      setEditingId(null);
    };

    const removeProspect = (id) => {
      setProspects(prev => prev.filter(p => p.id !== id));
    };

    const filtered = filterStatus === "all" ? prospects : prospects.filter(p => p.status === filterStatus);
    const statusCounts = {};
    prospects.forEach(p => { statusCounts[p.status] = (statusCounts[p.status] || 0) + 1; });

    return (
      <div>
        <h3 style={{ ...headingFont(24), margin:"0 0 8px" }}>PROSPECTS</h3>
        <p style={{ ...bodyFont, fontSize:13, marginBottom:20 }}>Track your pipeline from first contact to booked session.</p>

        {/* Stats row */}
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {PROSPECT_STATUSES.filter(s => s.key !== "not_interested").map(s => (
            <div key={s.key} style={{ padding:"8px 14px", borderRadius:6, background: s.bg, border:`1px solid ${s.color}22`, minWidth:80, textAlign:"center" }}>
              <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:22, color: s.color, fontWeight:700 }}>{statusCounts[s.key] || 0}</div>
              <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:9, color: s.color, letterSpacing:1, opacity:0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add new prospect */}
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Add prospect name"
            onKeyDown={e => e.key === "Enter" && addProspect()}
            style={{ ...schedInput, flex:1 }} />
          <button onClick={addProspect} style={{ background:"linear-gradient(135deg, #D4A843, #B8902F)", border:"none", padding:"10px 20px", color:"#0A0E1A", fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight:600, letterSpacing:1.5, cursor:"pointer", borderRadius:4, whiteSpace:"nowrap" }}>+ ADD</button>
        </div>

        {/* Filter */}
        <div style={{ display:"flex", gap:4, marginBottom:16, flexWrap:"wrap" }}>
          <button onClick={() => setFilterStatus("all")} style={{
            padding:"5px 12px", borderRadius:4, fontFamily:"'Oswald', sans-serif", fontSize:11, letterSpacing:1, cursor:"pointer",
            border: filterStatus==="all"?"1px solid #D4A843":"1px solid rgba(212,168,67,0.1)",
            background: filterStatus==="all"?"rgba(212,168,67,0.08)":"transparent",
            color: filterStatus==="all"?"#F0D78C":"#5A5F73",
          }}>ALL ({prospects.length})</button>
          {PROSPECT_STATUSES.map(s => (
            <button key={s.key} onClick={() => setFilterStatus(s.key)} style={{
              padding:"5px 12px", borderRadius:4, fontFamily:"'Oswald', sans-serif", fontSize:11, letterSpacing:1, cursor:"pointer",
              border: filterStatus===s.key?`1px solid ${s.color}`:"1px solid rgba(212,168,67,0.1)",
              background: filterStatus===s.key?s.bg:"transparent",
              color: filterStatus===s.key?s.color:"#5A5F73",
            }}>{s.label.split(" ").map(w => w[0]).join("")} ({statusCounts[s.key]||0})</button>
          ))}
        </div>

        {/* Prospect cards */}
        {filtered.length === 0 ? (
          <div style={{ ...schedCard, textAlign:"center", padding:48 }}><p style={{ ...bodyFont, margin:0 }}>No prospects in this category.</p></div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {filtered.map(p => {
              const statusInfo = PROSPECT_STATUSES.find(s => s.key === p.status) || PROSPECT_STATUSES[0];
              const isEditing = editingId === p.id;
              return (
                <div key={p.id} style={{ ...schedCard, borderLeft:`3px solid ${statusInfo.color}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <div>
                      <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:18, color:"#F0D78C", letterSpacing:1 }}>{p.name}</div>
                      {p.lastContact && <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#3A3F53", letterSpacing:0.5, marginTop:2 }}>Last contact: {p.lastContact}</div>}
                    </div>
                    <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:20, fontSize:10, fontWeight:600, letterSpacing:1, fontFamily:"'Oswald', sans-serif", background: statusInfo.bg, color: statusInfo.color }}>{statusInfo.label}</span>
                  </div>

                  {/* Status buttons */}
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom: p.notes || isEditing ? 10 : 0 }}>
                    {PROSPECT_STATUSES.map(s => (
                      <button key={s.key} onClick={() => updateStatus(p.id, s.key)} style={{
                        padding:"4px 10px", borderRadius:4, fontFamily:"'Oswald', sans-serif", fontSize:10, letterSpacing:0.5, cursor:"pointer",
                        border: p.status===s.key?`1px solid ${s.color}`:"1px solid rgba(212,168,67,0.08)",
                        background: p.status===s.key?s.bg:"rgba(255,255,255,0.01)",
                        color: p.status===s.key?s.color:"#3A3F53",
                      }}>{s.label}</button>
                    ))}
                  </div>

                  {/* Notes */}
                  {isEditing ? (
                    <div style={{ marginTop:8 }}>
                      <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={2} placeholder="Add notes (preferred time, contact info, etc.)"
                        style={{ ...schedInput, resize:"vertical", fontSize:12 }} />
                      <div style={{ display:"flex", gap:6, marginTop:6 }}>
                        <button onClick={() => saveNotes(p.id)} style={{ background:"linear-gradient(135deg, #D4A843, #B8902F)", border:"none", padding:"5px 14px", color:"#0A0E1A", fontFamily:"'Oswald', sans-serif", fontSize:10, fontWeight:600, letterSpacing:1, cursor:"pointer", borderRadius:4 }}>SAVE</button>
                        <button onClick={() => setEditingId(null)} style={{ background:"none", border:"1px solid rgba(212,168,67,0.1)", padding:"5px 14px", color:"#5A5F73", fontFamily:"'Oswald', sans-serif", fontSize:10, letterSpacing:1, cursor:"pointer", borderRadius:4 }}>CANCEL</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop: p.notes ? 4 : 0 }}>
                      {p.notes && <div style={{ ...bodyFont, fontSize:12, fontStyle:"italic", color:"#5A5F73", flex:1 }}>"{p.notes}"</div>}
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => { setEditingId(p.id); setEditNotes(p.notes); }} style={{ background:"none", border:"none", color:"#5A5F73", fontFamily:"'Oswald', sans-serif", fontSize:10, letterSpacing:1, cursor:"pointer", padding:"4px 8px" }}>✎ NOTES</button>
                        <button onClick={() => removeProspect(p.id)} style={{ background:"none", border:"none", color:"#3A3F53", fontFamily:"'Oswald', sans-serif", fontSize:10, letterSpacing:1, cursor:"pointer", padding:"4px 8px" }}>✕</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ── Reminder Tab ──
  const ReminderTab = () => {
    const today = schedToday();
    const todayB = bookings.filter(b => b.date === today && b.status === "approved").sort((a,b) => a.time.localeCompare(b.time));
    const txt = todayB.length === 0
      ? `🏀 5-Starr Schedule — ${schedFmt(today)}\n\nNo sessions today. Rest day.`
      : `🏀 5-Starr Schedule — ${schedFmt(today)}\n\n${todayB.map((b,i) => `${i+1}. ${schedFmtTime(b.time)} — ${b.clientName} (${b.sessionType}) @ ${b.location}`).join("\n")}\n\n${todayB.length} session${todayB.length>1?"s":""} today. Let's work. 💪`;
    const copy = () => { navigator.clipboard.writeText(txt).catch(() => {}); };

    return (
      <div>
        <h3 style={{ ...headingFont(24), margin:"0 0 8px" }}>MORNING REMINDER</h3>
        <p style={{ ...bodyFont, fontSize:13, marginBottom:24 }}>Preview of your daily schedule summary. Copy to send via email or text.</p>
        <div style={{ ...schedCard, fontFamily:"'Libre Baskerville', serif", fontSize:13, color:"#C8CCD8", lineHeight:1.9, whiteSpace:"pre-wrap", marginBottom:16 }}>{txt}</div>
        <button onClick={copy} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,168,67,0.15)", padding:"8px 20px", color:"#D4A843", fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight:600, letterSpacing:1.5, cursor:"pointer", borderRadius:4 }}>📋 COPY TO CLIPBOARD</button>
        <div style={{ marginTop:32, padding:20, background:"rgba(96,165,250,0.04)", border:"1px solid rgba(96,165,250,0.1)", borderRadius:8, ...bodyFont, fontSize:12, lineHeight:1.7 }}>
          <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#60a5fa", letterSpacing:2, marginBottom:8 }}>💡 AUTOMATED REMINDERS</div>
          This gets sent to chris@5starrdevelopment.com every day at 7:00 AM automatically. Configure the connection in the <span style={{ color:"#F0D78C", cursor:"pointer" }} onClick={() => setTab("settings")}>Settings</span> tab.
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8 }}>
          <div>
            <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, letterSpacing:4, color:"#D4A843", textTransform:"uppercase", margin:"0 0 8px" }}>Coach Dashboard</p>
            <h2 style={{ fontFamily:"'Oswald', sans-serif", fontWeight:700, fontSize:"clamp(28px, 4vw, 40px)", color:"#FFFFFF", letterSpacing:3, margin:"0 0 8px" }}>SCHEDULE</h2>
            <div style={{ width:40, height:2, background:"#D4A843", marginBottom:8 }} />
          </div>
          <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:13, color:"#5A5F73", letterSpacing:1 }}>{schedFmt(schedToday())}</span>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:2, marginBottom:32, overflowX:"auto", borderBottom:"1px solid rgba(212,168,67,0.1)", paddingBottom:12 }}>
          {SCHED_TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding:"8px 16px", borderRadius:4, border:"none",
              background: tab === t.key ? "rgba(212,168,67,0.08)" : "transparent",
              color: tab === t.key ? "#F0D78C" : "#5A5F73",
              fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight: tab === t.key ? 600 : 400,
              letterSpacing:1.5, cursor:"pointer", display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap", transition:"all 0.15s",
            }}>
              <span>{t.icon}</span> {t.label}
              {t.key === "pending" && pendingCount > 0 && (
                <span style={{ background:"#fb923c", color:"#fff", fontSize:9, fontWeight:700, borderRadius:10, padding:"1px 6px" }}>{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "today" && <TodayTab />}
        {tab === "pending" && <PendingTab />}
        {tab === "new" && <NewTab />}
        {tab === "calendar" && <CalendarTab />}
        {tab === "clients" && <ClientsTab />}
        {tab === "prospects" && <ProspectsTab />}
        {tab === "reminder" && <ReminderTab />}
        {tab === "settings" && (
          <div>
            <h3 style={{ ...headingFont(24), margin:"0 0 8px" }}>SETTINGS</h3>
            <p style={{ ...bodyFont, fontSize:13, marginBottom:32 }}>Connect your Google Sheet to enable automatic morning reminders.</p>

            <div style={{ ...schedCard, marginBottom:24 }}>
              <h4 style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#F0D78C", letterSpacing:2, margin:"0 0 16px" }}>GOOGLE SHEET CONNECTION</h4>
              <label style={schedLabel}>Apps Script Web App URL</label>
              <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                <input style={{ ...schedInput, flex:1 }} value={sheetUrl} onChange={e => setSheetUrl(e.target.value)} placeholder="https://script.google.com/macros/s/xxxxx/exec" />
                <button onClick={() => saveSheetUrl(sheetUrl)} style={{ background:"linear-gradient(135deg, #D4A843, #B8902F)", border:"none", padding:"10px 20px", color:"#0A0E1A", fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight:600, letterSpacing:1.5, cursor:"pointer", borderRadius:4, whiteSpace:"nowrap" }}>SAVE</button>
              </div>
              {sheetUrl && (
                <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:12 }}>
                  <button onClick={() => syncToSheet()} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,168,67,0.15)", padding:"8px 20px", color:"#D4A843", fontFamily:"'Oswald', sans-serif", fontSize:12, fontWeight:600, letterSpacing:1.5, cursor:"pointer", borderRadius:4 }}>🔄 SYNC NOW</button>
                  {syncStatus === "syncing" && <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#fb923c", letterSpacing:1 }}>SYNCING...</span>}
                  {syncStatus === "synced" && <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#34d399", letterSpacing:1 }}>✓ SYNCED</span>}
                  {syncStatus === "error" && <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:11, color:"#f87171", letterSpacing:1 }}>SYNC FAILED — CHECK URL</span>}
                </div>
              )}
            </div>

            <div style={{ ...schedCard, background:"rgba(96,165,250,0.03)", border:"1px solid rgba(96,165,250,0.1)" }}>
              <h4 style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#60a5fa", letterSpacing:2, margin:"0 0 12px" }}>📘 SETUP GUIDE</h4>
              <div style={{ ...bodyFont, fontSize:12, lineHeight:1.8 }}>
                <p style={{ margin:"0 0 8px" }}>1. Open the Google Apps Script file (provided separately)</p>
                <p style={{ margin:"0 0 8px" }}>2. Click <span style={{ color:"#F0D78C" }}>Deploy → New Deployment</span></p>
                <p style={{ margin:"0 0 8px" }}>3. Select <span style={{ color:"#F0D78C" }}>Web App</span>, set access to "Anyone"</p>
                <p style={{ margin:"0 0 8px" }}>4. Copy the Web App URL and paste it above</p>
                <p style={{ margin:"0 0 8px" }}>5. Click <span style={{ color:"#F0D78C" }}>SAVE</span>, then <span style={{ color:"#F0D78C" }}>SYNC NOW</span> to test</p>
                <p style={{ margin:0 }}>6. The script will auto-email you every day at 7:00 AM CT</p>
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  );
};

// ─── Footer ───
const Footer = ({ setPage }) => (
  <footer style={{ background: "#060912", borderTop: "1px solid rgba(212,168,67,0.1)", padding: "48px 24px 32px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <StarrLogo size={28} />
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 16, color: "#F0D78C", letterSpacing: 2 }}>5-STARR DEVELOPMENT</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#5A5F73", fontStyle: "italic", margin: 0 }}>Earned Not Given</p>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["About", "Services", "Player Cards", "Accessibility", "Book Now"].map(item => (
            <button key={item} onClick={() => setPage(item)} style={{ background: "none", border: "none", color: "#5A5F73", cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" }}>{item}</button>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#3A3F53", letterSpacing: 1, margin: 0 }}>© 2026 5-Starr Development. Oklahoma City, OK.</p>
        <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#3A3F53", letterSpacing: 1, margin: 0 }}>Have Fun. Get Better.</p>
        <button onClick={() => setPage("Schedule")} style={{ background:"none", border:"none", color:"#1A1F33", cursor:"pointer", fontSize:14, padding:4, transition:"color 0.3s" }} onMouseEnter={e => e.target.style.color="#3A3F53"} onMouseLeave={e => e.target.style.color="#1A1F33"} title="">⚙</button>
      </div>
    </div>
  </footer>
);

// ─── Home Page ───
const HomePage = ({ setPage }) => {
  const highlights = [
    { title: "SKILL TRAINING", desc: "1-on-1 and small group sessions at $1.25/min and $0.50/min — built on analytics and film study", icon: "🎯" },
    { title: "MEMBERSHIP", desc: "Three tiers of commitment: Rising Starr, All-Starr, and 5-Starr Elite — starting at $19.99/mo", icon: "⭐" },
    { title: "CAMPS & CLINICS", desc: "Intensive development events from youth through elite levels — free for 5-Starr Elite members", icon: "🏀" },
    { title: "COACH CONSULTING", desc: "Scouting reports, analytics dashboards, scheme design, and full program building", icon: "📊" },
  ];

  return (
    <>
      <HeroSection setPage={setPage} />

      {/* Mission Statement */}
      <Section bg="linear-gradient(180deg, #0D1225 0%, #111833 100%)">
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: 4, color: "#D4A843", margin: "0 0 16px", textTransform: "uppercase" }}>The Mission</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 30px)", color: "#C8CCD8", lineHeight: 1.8, fontStyle: "italic", margin: "0 0 24px" }}>
            5-Starr Development exists to build complete players and comprehensive young people through basketball. We operate at the intersection of motor learning science, analytics, human development, philosophy, and basketball craft — creating environments where players think, decide, and grow.
          </p>
          <div style={{ width: 40, height: 2, background: "#D4A843", margin: "0 auto 24px" }} />
          <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: "#5A5F73", letterSpacing: 3, textTransform: "uppercase" }}>
            The gym is one of the best classrooms in the world — if you design it right.
          </p>
        </div>
      </Section>

      {/* Highlights */}
      <Section bg="linear-gradient(180deg, #111833 0%, #0A0E1A 100%)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 16px" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{h.icon}</div>
              <h3 style={{ ...headingFont(16), marginBottom: 8 }}>{h.title}</h3>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: "#5A5F73", lineHeight: 1.7, margin: 0 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Analytics Edge Preview */}
      <Section bg="#0A0E1A">
        <SectionTitle pre="The 5-Starr Difference" title="DATA-DRIVEN DEVELOPMENT" sub="See exactly where you are, where you're going, and what it takes to get there" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
          {/* Sample Progress Card */}
          <div style={{ ...cardStyle, padding: 28 }}>
            <div style={goldTopBar} />
            <h4 style={{ ...headingFont(14), letterSpacing: 3, marginBottom: 20, color: "#8A8FA3" }}>MONTHLY PROGRESS REPORT</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Shooting Accuracy", value: "68%", change: "+12%", bar: 68 },
                { label: "Free Throw %", value: "74%", change: "+8%", bar: 74 },
                { label: "Ball Handling Index", value: "7.2", change: "+1.4", bar: 72 },
                { label: "Decision Making Score", value: "8.1", change: "+2.3", bar: 81 },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#8A8FA3", letterSpacing: 1 }}>{stat.label}</span>
                    <div>
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: "#FFFFFF", marginRight: 8 }}>{stat.value}</span>
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#4CAF50" }}>{stat.change}</span>
                    </div>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${stat.bar}%`, background: "linear-gradient(90deg, #D4A843, #F0D78C)", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(212,168,67,0.06)", borderRadius: 6 }}>
              <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 11, color: "#5A5F73", fontStyle: "italic", margin: 0 }}>Sample report — 5-Starr Elite members receive personalized analytics monthly</p>
            </div>
          </div>

          {/* What You Get */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { title: "PLAYER PROGRESS TRACKING", desc: "Every session logged. Every skill measured. Watch your development unfold over weeks and months with real data." },
              { title: "FILM BREAKDOWNS", desc: "Monthly video analysis of your game film — identifying strengths, habits, and the specific adjustments that will elevate your play." },
              { title: "CUSTOM DEVELOPMENT PLANS", desc: "No cookie-cutter workouts. Your training plan is built from your data, your goals, and the areas where analytics show the biggest opportunity." },
              { title: "COACH SCOUTING & ANALYTICS", desc: "For coaches: opponent scouting reports, lineup analysis, and team analytics dashboards that give you a strategic edge." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(212,168,67,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <StarAccent />
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: "#F0D78C", letterSpacing: 1.5, margin: "0 0 4px" }}>{item.title}</h4>
                  <p style={{ ...bodyFont, fontSize: 13, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="#0A0E1A">
        <div style={{ textAlign: "center", padding: "60px 40px", background: "linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: 4, color: "#D4A843", margin: "0 0 12px", textTransform: "uppercase" }}>Ready to Level Up?</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#FFFFFF", letterSpacing: 2, margin: "0 0 12px" }}>YOUR DEVELOPMENT STARTS HERE</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#8A8FA3", fontStyle: "italic", margin: "0 0 32px" }}>Have Fun. Get Better.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <GoldButton onClick={() => setPage("Book Now")}>Book A Session</GoldButton>
            <button onClick={() => setPage("Services")} style={{ background: "transparent", border: "1px solid rgba(212,168,67,0.4)", padding: "14px 36px", color: "#D4A843", fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 400, letterSpacing: 2, cursor: "pointer", borderRadius: 4, textTransform: "uppercase" }}>View Services</button>
          </div>
        </div>
      </Section>
    </>
  );
};

// ─── Main App ───
export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const setPage = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const renderPage = () => {
    switch (currentPage) {
      case "About": return <AboutPage />;
      case "Services": return <ServicesPage setPage={setPage} />;
      case "Membership": return <MembershipPage setPage={setPage} />;
      case "Camps": return <CampsPage setPage={setPage} />;
      case "Player Cards": return <PlayerCardsPage setPage={setPage} />;
      case "Free Resources": return <FreeResourcesPage setPage={setPage} />;
      case "Accessibility": return <AccessibilityPage setPage={setPage} />;
      case "Testimonials": return <TestimonialsPage />;
      case "Book Now": return <BookNowPage />;
      case "Schedule": return <SchedulePage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ background: "#0A0E1A", minHeight: "100vh", color: "#FFFFFF" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes stepFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-4px); } 40%,80% { transform: translateX(4px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        select option { background: #0A0E1A; color: #C8CCD8; }
        input::placeholder, textarea::placeholder { color: #3A3F53; }
        input:focus, textarea:focus, select:focus { border-color: rgba(212,168,67,0.5); }
        .step-content { animation: stepFadeIn 0.25s ease-out; }
        .input-error { border-color: #f87171 !important; animation: shake 0.3s ease; }
        .booking-grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .booking-grid-1col { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .form-grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-grid-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .booking-grid-2col { grid-template-columns: 1fr !important; }
          .form-grid-2col { grid-template-columns: 1fr !important; }
          .form-grid-3col { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
          .step-label { display: inline !important; }
        }
      `}</style>
      <Navigation currentPage={currentPage} setPage={setPage} />
      {renderPage()}
      <Footer setPage={setPage} />
    </div>
  );
}
