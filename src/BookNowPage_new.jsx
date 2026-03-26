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

