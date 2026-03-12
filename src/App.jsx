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

          {/* Sample Game Plan — Coaching Insights Only */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: 3, color: "#D4A843" }}>FROM A REAL GAME PLAN</h4>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: 2, color: "#5A5F73", background: "rgba(212,168,67,0.1)", padding: "4px 12px", borderRadius: 4 }}>NAMES CHANGED</span>
            </div>

            <div style={{ background: "rgba(212,168,67,0.04)", borderLeft: "3px solid #D4A843", padding: "24px 28px", borderRadius: "0 8px 8px 0", marginBottom: 16 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#FFF", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                "You didn't lose to a better team. You lost to fatigue."
              </p>
            </div>

            <div style={{ background: "rgba(212,168,67,0.04)", borderLeft: "3px solid #D4A843", padding: "24px 28px", borderRadius: "0 8px 8px 0", marginBottom: 16 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#FFF", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                "Your best player played the fewest minutes. That's not a coincidence."
              </p>
            </div>

            <div style={{ background: "rgba(212,168,67,0.04)", borderLeft: "3px solid #D4A843", padding: "24px 28px", borderRadius: "0 8px 8px 0", marginBottom: 16 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#FFF", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                "4 starters + 1 bench = competitive. 2+ bench = catastrophic. The rotation fix is ready."
              </p>
            </div>

            <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: "#5A5F73", textAlign: "center", marginTop: 20, marginBottom: 0 }}>
              This coach lost by 21. The data showed the game was tied at 42 before a rotation mistake. We built the fix.
            </p>
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
    {
      icon: "🎟️",
      title: "SLIDING SCALE FOR CAMPS",
      desc: "Limited reduced-price spots available at every camp and clinic for families who need financial help.",
      details: [
        "Youth Camp: as low as $25 (full price $85)",
        "Shot Doctor Clinic: as low as $40 (full price $125)",
        "Elite Skills Camp: as low as $100 (full price $400)",
        "Confidential  — no one knows what anyone else paid",
      ],
      cta: "Ask About Reduced Pricing",
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
              <button onClick={() => setPage("Book Now")} style={{
                background: "transparent", border: "1px solid rgba(212,168,67,0.4)",
                padding: "10px 20px", color: "#D4A843", fontFamily: "'Oswald', sans-serif",
                fontSize: 12, letterSpacing: 1.5, cursor: "pointer", borderRadius: 4,
                textTransform: "uppercase", width: "100%",
              }}>{prog.cta}</button>
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
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#C8CCD8", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            Train with 5-Starr Development for one year and your custom Player Identity Card is on us — free. It's our way of honoring your commitment to the process.
          </p>
        </div>

        {/* Two options */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 48 }}>
          <div style={{ ...cardStyle, padding: 32, textAlign: "center" }}>
            <div style={goldTopBar} />
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#D4A843", marginBottom: 4 }}>FREE</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: 2, color: "#8A8FA3", marginBottom: 16 }}>WITH 1 YEAR OF TRAINING</div>
            <div style={{ width: 40, height: 2, background: "#D4A843", margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: "#C8CCD8", lineHeight: 1.7, margin: "0 0 20px" }}>
              Complete one year of consistent training with 5-Starr Development and we'll design a professional Player Identity Card showcasing your stats, position, measurables, and achievements. Earned Not Given.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left", marginBottom: 20 }}>
              {["Custom design with your photo", "Season stats and key metrics", "Position, measurables, and school info", "Digital and print-ready formats", "Updated annually as you develop"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StarAccent />
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#C8CCD8", letterSpacing: 0.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <GoldButton onClick={() => setPage("Book Now")}>Start Training</GoldButton>
          </div>

          <div style={{ ...cardStyle, padding: 32, textAlign: "center" }}>
            <div style={goldTopBar} />
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#D4A843", marginBottom: 4 }}>$100</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: 2, color: "#8A8FA3", marginBottom: 16 }}>À LA CARTE</div>
            <div style={{ width: 40, height: 2, background: "#D4A843", margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, color: "#C8CCD8", lineHeight: 1.7, margin: "0 0 20px" }}>
              Don't train with us yet? No problem. Any player can order a custom Player Identity Card for $100. Send us your stats, a photo, and your info — we'll design it and deliver within 48 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left", marginBottom: 20 }}>
              {["Same professional design quality", "Your stats, photo, and school info", "Digital delivery within 48 hours", "Print-ready high-resolution file", "Perfect for social media and recruiting"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StarAccent />
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, color: "#C8CCD8", letterSpacing: 0.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <GoldButton onClick={() => setPage("Book Now")}>Order a Card</GoldButton>
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "1-on-1", player: "", age: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const inputStyle = { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 6, color: "#C8CCD8", fontFamily: "'Libre Baskerville', serif", fontSize: 14, outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontFamily: "'Oswald', sans-serif", fontSize: 11, color: "#8A8FA3", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 };

  if (submitted) {
    return (
      <>
        <div style={{ paddingTop: 80 }} />
        <Section bg="#0A0E1A">
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <StarrLogo size={64} />
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, color: "#F0D78C", letterSpacing: 3, margin: "24px 0 16px" }}>REQUEST RECEIVED</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#8A8FA3", fontStyle: "italic" }}>Coach Starr will be in touch within 24 hours. Earned Not Given.</p>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Get Started" title="BOOK A SESSION" sub="Take the first step in your development journey" />
        <div style={{ maxWidth: 600, margin: "0 auto", ...cardStyle, padding: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div><label style={labelStyle}>Your Name</label><input style={inputStyle} value={form.name} onChange={e => handleChange("name", e.target.value)} placeholder="Full name" /></div>
            <div><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} placeholder="you@email.com" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="(000) 000-0000" /></div>
            <div>
              <label style={labelStyle}>I'm Interested In</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.type} onChange={e => handleChange("type", e.target.value)}>
                <option value="1-on-1">1-on-1 Training</option>
                <option value="small-group">Small Group (2-7)</option>
                <option value="large-group">Large Group (8-20)</option>
                <option value="shoot-around">Open Gym Shoot-Around</option>
                <option value="membership">Membership</option>
                <option value="camp">Camp Registration</option>
                <option value="consulting">Coaching Consulting</option>
                <option value="scouting">Scouting Report</option>
                <option value="analytics">Analytics Dashboard</option>
                <option value="scholarship">Scholarship / Financial Assistance</option>
                <option value="work-to-train">Work-to-Train Program</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div><label style={labelStyle}>Player Name</label><input style={inputStyle} value={form.player} onChange={e => handleChange("player", e.target.value)} placeholder="Player's name" /></div>
            <div><label style={labelStyle}>Player Age / Grade</label><input style={inputStyle} value={form.age} onChange={e => handleChange("age", e.target.value)} placeholder="e.g. 10th Grade" /></div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Message</label>
            <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} value={form.message} onChange={e => handleChange("message", e.target.value)} placeholder="Tell us about your goals..." />
          </div>
          <GoldButton onClick={() => setSubmitted(true)} full>Submit Request</GoldButton>
        </div>
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
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ background: "#0A0E1A", minHeight: "100vh", color: "#FFFFFF" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        select option { background: #0A0E1A; color: #C8CCD8; }
        input::placeholder, textarea::placeholder { color: #3A3F53; }
        input:focus, textarea:focus, select:focus { border-color: rgba(212,168,67,0.5); }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
      <Navigation currentPage={currentPage} setPage={setPage} />
      {renderPage()}
      <Footer setPage={setPage} />
    </div>
  );
}
