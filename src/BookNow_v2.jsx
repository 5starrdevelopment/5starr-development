// ─── Book Now Page ───
const BookNowPage = () => {
  const [phase, setPhase] = useState("landing"); // landing | picking | details | sent
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(75);
  const [showDuration, setShowDuration] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", type: "1-on-1", location: "Bishop McGuinness", notes: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Helpers
  const today = () => new Date().toISOString().split("T")[0];
  const availMap = { 1:"3:00–8:00 PM", 2:"3:00–8:00 PM", 3:"3:00–8:00 PM", 4:"3:00–8:00 PM", 5:"3:00–6:00 PM", 6:"8:00 AM–1:00 PM" };
  const availRaw = { 1:{s:15,e:20}, 2:{s:15,e:20}, 3:{s:15,e:20}, 4:{s:15,e:20}, 5:{s:15,e:18}, 6:{s:8,e:13} };
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const shortDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const getDow = (ds) => new Date(ds + "T12:00:00").getDay();
  const isAvail = (ds) => !!availRaw[getDow(ds)];

  const fmtTime = (t) => { const [h,m] = t.split(":"); const hr = parseInt(h); return `${hr%12||12}:${m} ${hr>=12?"PM":"AM"}`; };
  const fmtDateShort = (ds) => { const d = new Date(ds+"T12:00:00"); return `${shortDays[d.getDay()]}, ${d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`; };
  const fmtDateLong = (ds) => new Date(ds+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});

  // Generate time slots
  const genSlots = (ds) => {
    const raw = availRaw[getDow(ds)]; if (!raw) return [];
    const slots = []; let h = raw.s, m = 0;
    while (h * 60 + m + duration <= raw.e * 60) {
      slots.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
      m += 30; if (m >= 60) { h++; m = 0; }
    }
    return slots;
  };

  // Fetch booked slots from localStorage + Sheet
  useEffect(() => {
    if (phase !== "picking") return;
    setLoading(true);
    let all = [];
    try {
      const local = localStorage.getItem("5starr-schedule");
      if (local) { const b = JSON.parse(local); all = b.filter(x => x.status==="approved"||x.status==="pending").map(x => ({date:x.date,time:x.time,duration:x.duration||75})); }
    } catch {}
    const url = localStorage.getItem("5starr-sheet-url");
    if (url) {
      fetch(url + "?action=bookings").then(r => r.json()).then(data => {
        if (data.success && data.bookings) {
          const keys = new Set(all.map(s => s.date+s.time));
          all = [...all, ...data.bookings.filter(b => !keys.has(b.date+b.time))];
        }
        setBookedSlots(all); setLoading(false);
      }).catch(() => { setBookedSlots(all); setLoading(false); });
    } else { setBookedSlots(all); setLoading(false); }
  }, [phase]);

  const isSlotTaken = (ds, time) => {
    const ss = parseInt(time.split(":")[0])*60 + parseInt(time.split(":")[1]);
    return bookedSlots.some(b => {
      if (b.date !== ds || !b.time) return false;
      const bs = parseInt(b.time.split(":")[0])*60 + parseInt(b.time.split(":")[1]);
      return ss < bs + (b.duration||75) && ss + duration > bs;
    });
  };

  const countOpen = (ds) => genSlots(ds).filter(t => !isSlotTaken(ds,t)).length;

  // Generate next 21 days
  const getNextDays = () => {
    const days = []; const d = new Date();
    for (let i = 0; i < 21; i++) {
      const nd = new Date(d); nd.setDate(d.getDate() + i);
      const ds = nd.toISOString().split("T")[0];
      if (isAvail(ds)) days.push(ds);
    }
    return days;
  };

  // Submit
  const submit = async () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.contact.trim()) e.contact = true;
    setErrors(e); if (Object.keys(e).length) return;

    setSubmitting(true);
    const url = localStorage.getItem("5starr-sheet-url");
    if (url) {
      try {
        await fetch(url, { method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ action:"client_request", booking:{ clientName:form.name.trim(), clientContact:form.contact.trim(), date:selectedDate, time:selectedTime, duration, sessionType:form.type, location:form.location, notes:form.notes.trim() }, recurring:"none" })
        });
      } catch {}
    }
    setSubmitting(false); setPhase("sent");
  };

  // Reset
  const reset = () => { setPhase("landing"); setSelectedDate(null); setSelectedTime(null); setForm({name:"",contact:"",type:"1-on-1",location:"Bishop McGuinness",notes:""}); setErrors({}); setShowDuration(false); };

  // ─── Shared mobile styles ───
  const bigBtn = (active, color = "#D4A843") => ({
    width:"100%", padding:"18px 20px", borderRadius:12, border: active ? `3px solid ${color}` : "2px solid rgba(212,168,67,0.15)",
    background: active ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.025)", cursor:"pointer",
    textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center", transition:"all 0.15s",
  });
  const bigBtnDisabled = { width:"100%", padding:"18px 20px", borderRadius:12, border:"2px solid rgba(255,255,255,0.04)", background:"rgba(255,255,255,0.01)", textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center" };

  const fieldLabel = { fontFamily:"'Oswald', sans-serif", fontSize:13, color:"#D4A843", letterSpacing:2, display:"block", marginBottom:6 };
  const fieldInput = (err) => ({ width:"100%", boxSizing:"border-box", background:"rgba(255,255,255,0.03)", border:`2px solid ${err?"#f87171":"rgba(212,168,67,0.15)"}`, borderRadius:10, padding:"16px 18px", color:"#C8CCD8", fontSize:18, fontFamily:"'Libre Baskerville', serif", outline:"none" });
  const fieldSelect = { width:"100%", boxSizing:"border-box", background:"rgba(255,255,255,0.03)", border:"2px solid rgba(212,168,67,0.15)", borderRadius:10, padding:"16px 18px", color:"#C8CCD8", fontSize:16, fontFamily:"'Libre Baskerville', serif", outline:"none" };

  return (
    <>
      <div style={{ paddingTop: 80 }} />
      <Section bg="#0A0E1A">
        <SectionTitle pre="Get Started" title="BOOK NOW" sub={phase === "landing" ? "Pick a day and time that works for you" : undefined} />

        {/* ─── LANDING ─── */}
        {phase === "landing" && (
          <div style={{ maxWidth:560, margin:"0 auto" }}>
            {/* Main CTA */}
            <button onClick={() => setPhase("picking")} style={{
              width:"100%", padding:"28px 24px", borderRadius:16, cursor:"pointer",
              background:"linear-gradient(135deg, rgba(212,168,67,0.12), rgba(212,168,67,0.04))",
              border:"2px solid rgba(212,168,67,0.3)", textAlign:"center", marginBottom:32,
            }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📅</div>
              <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:22, color:"#F0D78C", letterSpacing:2, marginBottom:8 }}>PICK A DAY & TIME</div>
              <div style={{ fontFamily:"'Libre Baskerville', serif", fontSize:15, color:"#8A8FA3", lineHeight:1.6 }}>See available sessions and book your spot in under a minute</div>
            </button>

            {/* Direct contact — prominent */}
            <div style={{ ...cardStyle, padding:24, textAlign:"center", marginBottom:24 }}>
              <div style={goldTopBar} />
              <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#F0D78C", letterSpacing:2, margin:"0 0 12px" }}>PREFER TO TEXT OR CALL?</p>
              <a href="sms:+14055551234" style={{ display:"block", fontFamily:"'Oswald', sans-serif", fontSize:20, color:"#D4A843", letterSpacing:1, textDecoration:"none", marginBottom:8 }}>TEXT COACH STARR →</a>
              <a href="mailto:chris@5starrdevelopment.com" style={{ fontFamily:"'Oswald', sans-serif", fontSize:13, color:"#5A5F73", letterSpacing:1.5, textDecoration:"none" }}>CHRIS@5STARRDEVELOPMENT.COM</a>
            </div>

            {/* Waiver + Scholarship */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <a href="https://forms.gle/P1Vjfx9YFzi94Avq7" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 20px", borderRadius:10, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(212,168,67,0.1)", textDecoration:"none" }}>
                <span style={{ fontSize:24 }}>📋</span>
                <div><div style={{ fontFamily:"'Oswald', sans-serif", fontSize:13, color:"#F0D78C", letterSpacing:1.5 }}>LIABILITY WAIVER</div><div style={{ fontFamily:"'Libre Baskerville', serif", fontSize:12, color:"#5A5F73" }}>Required before your first session</div></div>
              </a>
              <a href="https://forms.gle/nLuSVgTBZT3cWp9Z9" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 20px", borderRadius:10, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(212,168,67,0.1)", textDecoration:"none" }}>
                <span style={{ fontSize:24 }}>🌟</span>
                <div><div style={{ fontFamily:"'Oswald', sans-serif", fontSize:13, color:"#F0D78C", letterSpacing:1.5 }}>SCHOLARSHIP APPLICATION</div><div style={{ fontFamily:"'Libre Baskerville', serif", fontSize:12, color:"#5A5F73" }}>Financial assistance available</div></div>
              </a>
            </div>
          </div>
        )}

        {/* ─── PICKING (date + time on ONE screen) ─── */}
        {phase === "picking" && (
          <div style={{ maxWidth:560, margin:"0 auto" }}>
            <button onClick={() => setPhase("landing")} style={{ background:"none", border:"none", color:"#D4A843", fontFamily:"'Oswald', sans-serif", fontSize:14, letterSpacing:1.5, cursor:"pointer", marginBottom:20, padding:0 }}>← BACK</button>

            {/* Duration toggle — hidden by default */}
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:13, color:"#5A5F73", letterSpacing:1 }}>{duration} MINUTE SESSION</span>
              <button onClick={() => setShowDuration(!showDuration)} style={{ background:"none", border:"none", color:"#D4A843", fontFamily:"'Oswald', sans-serif", fontSize:12, cursor:"pointer", marginLeft:8, letterSpacing:1 }}>{showDuration ? "HIDE" : "CHANGE"}</button>
              {showDuration && (
                <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:12 }}>
                  {[60,75,90].map(d => (
                    <button key={d} onClick={() => { setDuration(d); setSelectedTime(null); }} style={{
                      padding:"14px 24px", borderRadius:10, fontFamily:"'Oswald', sans-serif", fontSize:18, cursor:"pointer",
                      border: duration===d ? "3px solid #D4A843" : "2px solid rgba(212,168,67,0.12)",
                      background: duration===d ? "rgba(212,168,67,0.1)" : "rgba(255,255,255,0.02)",
                      color: duration===d ? "#F0D78C" : "#8A8FA3", fontWeight: duration===d ? 700 : 400,
                    }}>{d}</button>
                  ))}
                </div>
              )}
            </div>

            {loading && <div style={{ textAlign:"center", padding:20, fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#D4A843", letterSpacing:1 }}>Loading availability...</div>}

            {/* Day list — big scrollable cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {getNextDays().map(ds => {
                const dow = getDow(ds);
                const open = countOpen(ds);
                const isSelected = selectedDate === ds;
                const dayLabel = ds === today() ? "Today" : ds === (() => { const t = new Date(); t.setDate(t.getDate()+1); return t.toISOString().split("T")[0]; })() ? "Tomorrow" : dayNames[dow];
                const dateLabel = new Date(ds+"T12:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric"});

                return (
                  <div key={ds}>
                    {/* Day header button */}
                    <button onClick={() => { setSelectedDate(isSelected ? null : ds); setSelectedTime(null); }}
                      style={open === 0 ? bigBtnDisabled : bigBtn(isSelected)}>
                      <div>
                        <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:20, color: open===0 ? "#2A2F43" : isSelected ? "#F0D78C" : "#C8CCD8", letterSpacing:1 }}>
                          {dayLabel}
                        </div>
                        <div style={{ fontFamily:"'Libre Baskerville', serif", fontSize:14, color: open===0 ? "#2A2F43" : "#8A8FA3", marginTop:2 }}>
                          {dateLabel} · {availMap[dow]}
                        </div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        {open === 0 ? (
                          <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#3A3F53", letterSpacing:1 }}>FULL</span>
                        ) : (
                          <>
                            <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:22, color: open <= 2 ? "#fb923c" : "#34d399", fontWeight:700 }}>{open}</div>
                            <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:10, color:"#5A5F73", letterSpacing:0.5 }}>{open === 1 ? "SLOT" : "SLOTS"}</div>
                          </>
                        )}
                      </div>
                    </button>

                    {/* Time slots — expand when day is selected */}
                    {isSelected && open > 0 && (
                      <div style={{ padding:"16px 8px 8px", display:"flex", flexDirection:"column", gap:8, animation:"stepFadeIn 0.2s ease-out" }}>
                        <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#D4A843", letterSpacing:2, paddingLeft:4, marginBottom:4 }}>TAP A TIME</div>
                        {genSlots(ds).map(time => {
                          const taken = isSlotTaken(ds, time);
                          const sel = selectedTime === time && selectedDate === ds;
                          if (taken) return null; // Hide taken slots entirely for simplicity
                          return (
                            <button key={time} onClick={() => { setSelectedTime(time); setPhase("details"); }}
                              style={{
                                width:"100%", padding:"18px 24px", borderRadius:12, cursor:"pointer",
                                border: sel ? "3px solid #D4A843" : "2px solid rgba(212,168,67,0.12)",
                                background: sel ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.025)",
                                textAlign:"center", transition:"all 0.15s",
                              }}>
                              <span style={{ fontFamily:"'Oswald', sans-serif", fontSize:22, color: sel ? "#F0D78C" : "#C8CCD8", letterSpacing:1, fontWeight:600 }}>
                                {fmtTime(time)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── DETAILS (name + contact + submit — one screen) ─── */}
        {phase === "details" && (
          <div style={{ maxWidth:560, margin:"0 auto" }}>
            <button onClick={() => { setPhase("picking"); setErrors({}); }} style={{ background:"none", border:"none", color:"#D4A843", fontFamily:"'Oswald', sans-serif", fontSize:14, letterSpacing:1.5, cursor:"pointer", marginBottom:20, padding:0 }}>← CHANGE TIME</button>

            {/* Summary bar */}
            <div style={{ padding:"20px 24px", borderRadius:12, background:"rgba(212,168,67,0.06)", border:"2px solid rgba(212,168,67,0.2)", marginBottom:28, textAlign:"center" }}>
              <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:22, color:"#F0D78C", letterSpacing:1 }}>{fmtDateLong(selectedDate)}</div>
              <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:28, color:"#D4A843", letterSpacing:1, marginTop:4 }}>{fmtTime(selectedTime)}</div>
              <div style={{ fontFamily:"'Libre Baskerville', serif", fontSize:14, color:"#8A8FA3", marginTop:4 }}>{duration} min · Bishop McGuinness</div>
            </div>

            {/* Form — big inputs */}
            <div style={{ display:"flex", flexDirection:"column", gap:20, marginBottom:28 }}>
              <div>
                <label style={fieldLabel}>YOUR NAME</label>
                <input value={form.name} onChange={e => { setForm(p=>({...p,name:e.target.value})); setErrors(p=>({...p,name:false})); }}
                  placeholder="First and last name" style={fieldInput(errors.name)} />
                {errors.name && <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#f87171", marginTop:6 }}>Please enter your name</div>}
              </div>
              <div>
                <label style={fieldLabel}>PHONE NUMBER OR EMAIL</label>
                <input value={form.contact} onChange={e => { setForm(p=>({...p,contact:e.target.value})); setErrors(p=>({...p,contact:false})); }}
                  placeholder="So Coach Starr can confirm" style={fieldInput(errors.contact)} />
                {errors.contact && <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:12, color:"#f87171", marginTop:6 }}>Please enter your phone or email</div>}
              </div>
              <div>
                <label style={fieldLabel}>SESSION TYPE</label>
                <select value={form.type} onChange={e => setForm(p=>({...p,type:e.target.value}))} style={fieldSelect}>
                  <option value="1-on-1">1-on-1 Private ($1.25/min)</option>
                  <option value="Small Group (2-4)">Small Group 2-4 ($0.50/min per player)</option>
                  <option value="Large Group">Large Group ($20 per player)</option>
                </select>
              </div>
              <div>
                <label style={fieldLabel}>ANYTHING ELSE? (OPTIONAL)</label>
                <input value={form.notes} onChange={e => setForm(p=>({...p,notes:e.target.value}))}
                  placeholder="Skills to work on, number of players, etc." style={fieldInput(false)} />
              </div>
            </div>

            {/* Submit */}
            <button onClick={submit} disabled={submitting} style={{
              width:"100%", padding:"20px", borderRadius:12, cursor: submitting ? "not-allowed" : "pointer",
              background: submitting ? "rgba(212,168,67,0.4)" : "linear-gradient(135deg, #D4A843, #B8902F)",
              border:"none", fontFamily:"'Oswald', sans-serif", fontSize:20, fontWeight:700, letterSpacing:2,
              color:"#0A0E1A", textTransform:"uppercase", display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            }}>
              {submitting && <span style={{ display:"inline-block", width:16, height:16, border:"2px solid #0A0E1A", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.6s linear infinite" }} />}
              {submitting ? "SENDING..." : "REQUEST THIS SESSION"}
            </button>

            <p style={{ fontFamily:"'Libre Baskerville', serif", fontSize:13, color:"#5A5F73", textAlign:"center", marginTop:16, lineHeight:1.6 }}>
              Coach Starr will confirm within 24 hours
            </p>
          </div>
        )}

        {/* ─── CONFIRMATION ─── */}
        {phase === "sent" && (
          <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>✓</div>
            <h3 style={{ fontFamily:"'Oswald', sans-serif", fontSize:28, color:"#F0D78C", letterSpacing:2, margin:"0 0 12px" }}>YOU'RE ALL SET</h3>
            <p style={{ fontFamily:"'Libre Baskerville', serif", fontSize:16, color:"#C8CCD8", lineHeight:1.7, margin:"0 0 8px" }}>
              Session requested for<br />
              <span style={{ color:"#F0D78C", fontWeight:700 }}>{fmtDateLong(selectedDate)} at {fmtTime(selectedTime)}</span>
            </p>
            <p style={{ fontFamily:"'Libre Baskerville', serif", fontSize:15, color:"#8A8FA3", margin:"0 0 32px", lineHeight:1.6 }}>
              Coach Starr will reach out to confirm.
            </p>

            {/* Waiver reminder */}
            <a href="https://forms.gle/P1Vjfx9YFzi94Avq7" target="_blank" rel="noopener noreferrer" style={{
              display:"block", padding:"20px 24px", borderRadius:12, background:"rgba(212,168,67,0.06)", border:"2px solid rgba(212,168,67,0.15)", textDecoration:"none", marginBottom:24,
            }}>
              <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:14, color:"#D4A843", letterSpacing:2, marginBottom:4 }}>📋 COMPLETE YOUR WAIVER</div>
              <div style={{ fontFamily:"'Libre Baskerville', serif", fontSize:13, color:"#8A8FA3" }}>Required before your first session</div>
            </a>

            <button onClick={reset} style={{
              padding:"16px 40px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:"2px solid rgba(212,168,67,0.15)",
              fontFamily:"'Oswald', sans-serif", fontSize:16, color:"#C8CCD8", letterSpacing:2, cursor:"pointer",
            }}>DONE</button>
          </div>
        )}
      </Section>
    </>
  );
};

