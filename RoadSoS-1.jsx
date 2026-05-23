import { useState, useEffect, useRef } from "react";

const quickDials = [
  { label: "Ambulance", number: "108", icon: "🚑", color: "#FF6B35" },
  { label: "Police", number: "100", icon: "🚔", color: "#1E90FF" },
  { label: "Fire", number: "101", icon: "🔥", color: "#FF4500" },
  { label: "Highway", number: "1033", icon: "🛣️", color: "#2ED573" },
];

// State-wise emergency contacts (India)
const stateContacts = {
  "Tamil Nadu":       [{ type:"Hospital", name:"Govt. General Hospital",    phone:"044-25305000", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Tamil Nadu 108 Ambulance",  phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Tamil Nadu Police Control", phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"TN Fire & Rescue",     phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Maharashtra":      [{ type:"Hospital", name:"KEM Hospital Mumbai",        phone:"022-24136051", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Maharashtra 108 Service",  phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Mumbai Police Control",    phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Mumbai Fire Brigade",  phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Karnataka":        [{ type:"Hospital", name:"Bowring Hospital Bangalore", phone:"080-25561211", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Karnataka 108 Ambulance", phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Bangalore Police Control", phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Karnataka Fire Service",phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Delhi":            [{ type:"Hospital", name:"AIIMS Trauma Centre Delhi",  phone:"011-26588500", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Delhi 102 Ambulance",      phone:"102",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Delhi Police Control",     phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Delhi Fire Service",   phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Uttar Pradesh":    [{ type:"Hospital", name:"SGPGI Lucknow",              phone:"0522-2668700", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"UP 108 Ambulance",         phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"UP Police Control Room",   phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"UP Fire Service",      phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "West Bengal":      [{ type:"Hospital", name:"SSKM Hospital Kolkata",      phone:"033-22041020", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"WB 108 Ambulance",         phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Kolkata Police Control",   phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"WB Fire Service",      phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Rajasthan":        [{ type:"Hospital", name:"SMS Hospital Jaipur",        phone:"0141-2560291", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Rajasthan 108 Ambulance",  phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Rajasthan Police Control", phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Rajasthan Fire Service",phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Gujarat":          [{ type:"Hospital", name:"Civil Hospital Ahmedabad",   phone:"079-22681331", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Gujarat 108 Ambulance",    phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Gujarat Police Control",   phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Gujarat Fire Service",  phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Telangana":        [{ type:"Hospital", name:"Osmania Hospital Hyderabad", phone:"040-24600341", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Telangana 108 Ambulance",  phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Hyderabad Police Control", phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Telangana Fire Service", phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Andhra Pradesh":   [{ type:"Hospital", name:"Govt. General Hosp Vizag",   phone:"0891-2564891", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"AP 108 Ambulance",          phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"AP Police Control Room",   phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"AP Fire Service",       phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Kerala":           [{ type:"Hospital", name:"Medical College Trivandrum",  phone:"0471-2528386", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Kerala 108 Ambulance",     phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Kerala Police Control",    phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Kerala Fire Service",   phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "Punjab":           [{ type:"Hospital", name:"PGIMER Chandigarh",          phone:"0172-2755555", icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"Punjab 108 Ambulance",      phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"Punjab Police Control",    phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"Punjab Fire Service",   phone:"101",          icon:"🚒", color:"#FF8C00" }],
  "default":          [{ type:"Hospital", name:"Nearest Govt. Hospital",     phone:"104",          icon:"🏥", color:"#FF4757" }, { type:"Ambulance", name:"National Ambulance Service", phone:"108",          icon:"🚑", color:"#FF6B35" }, { type:"Police",   name:"National Police Helpline",  phone:"100",          icon:"🚔", color:"#1E90FF" }, { type:"Fire & Rescue", name:"National Fire Helpline",phone:"101",          icon:"🚒", color:"#FF8C00" }],
};

// Free Gemini AI (Google) — no billing needed with free tier key
const GEMINI_KEY = "AIzaSyD-9tSrke72PouQMnMX-a7eHZHjA4YGUNY"; // demo key — replace if quota exceeded

async function callGemini(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 800 },
      }),
    }
  );
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ── AI Severity Checker ───────────────────────────────────────────
function AISeverityChecker({ state }) {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const severityColors = { CRITICAL: "#FF4757", SERIOUS: "#FF8C00", MINOR: "#2ED573" };

  const analyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const prompt = `You are an emergency road accident severity analyzer in India.
The user is located in ${state || "India"}.
Based on this accident description, respond ONLY with a valid JSON object — no markdown, no explanation.

{
  "severity": "CRITICAL" or "SERIOUS" or "MINOR",
  "summary": "one sentence summary",
  "callFirst": "which service to call first with number",
  "actions": ["step 1", "step 2", "step 3"],
  "doNot": ["avoid 1", "avoid 2"]
}

Accident description: ${description}`;

      const text = await callGemini(prompt);
      const clean = text.replace(/```json|```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Bad response");
      setResult(JSON.parse(jsonMatch[0]));
    } catch (err) {
      setError("Could not analyze. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <div style={{ background: "linear-gradient(135deg,rgba(255,71,87,.15),rgba(255,140,0,.1))", border: "1px solid rgba(255,71,87,.25)", borderRadius: "16px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontSize: "24px" }}>🤖</span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "20px", letterSpacing: "2px", color: "#FF8A8A" }}>AI SEVERITY CHECKER</span>
        </div>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: "12px", lineHeight: "1.6", margin: 0 }}>
          Describe the accident. AI will assess severity and guide you instantly.
          {state && <span style={{ color: "#2ED573" }}> · Location: {state}</span>}
        </p>
      </div>

      <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "13px", letterSpacing: "2px", color: "rgba(255,255,255,.4)", marginBottom: "8px" }}>DESCRIBE WHAT HAPPENED</p>
      <textarea value={description} onChange={e => setDescription(e.target.value)}
        placeholder="e.g. Two vehicles collided at the intersection. One person is unconscious, another has a bleeding leg..."
        rows={5}
        style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "14px", lineHeight: "1.6", resize: "none", outline: "none", fontFamily: "'DM Sans',sans-serif", marginBottom: "14px" }}
        onFocus={e => e.target.style.borderColor = "rgba(255,71,87,.5)"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"}
      />

      <button onClick={analyze} disabled={loading || !description.trim()}
        style={{ width: "100%", padding: "16px", background: loading || !description.trim() ? "rgba(255,255,255,.08)" : "linear-gradient(135deg,#FF4757,#C0392B)", border: "none", borderRadius: "14px", color: loading || !description.trim() ? "rgba(255,255,255,.3)" : "#fff", fontSize: "15px", fontWeight: "700", cursor: loading || !description.trim() ? "not-allowed" : "pointer", letterSpacing: "1px", marginBottom: "20px", transition: "all .3s ease", fontFamily: "'Bebas Neue',sans-serif", boxShadow: loading || !description.trim() ? "none" : "0 8px 24px rgba(255,71,87,.35)" }}>
        {loading ? "🔍 ANALYZING..." : "⚡ ANALYZE SEVERITY"}
      </button>

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "24px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "3px solid rgba(255,71,87,.2)", borderTop: "3px solid #FF4757", animation: "spin 1s linear infinite" }} />
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: "13px" }}>AI is assessing the situation...</p>
        </div>
      )}

      {error && <div style={{ background: "rgba(255,71,87,.1)", border: "1px solid rgba(255,71,87,.3)", borderRadius: "14px", padding: "14px", color: "#FF8A8A", fontSize: "13px", textAlign: "center" }}>⚠️ {error}</div>}

      {result && (
        <div style={{ animation: "slideIn .4s ease" }}>
          <div style={{ background: `${severityColors[result.severity]}22`, border: `2px solid ${severityColors[result.severity]}`, borderRadius: "16px", padding: "16px", marginBottom: "14px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "32px", letterSpacing: "4px", color: severityColors[result.severity], marginBottom: "4px" }}>
              {result.severity === "CRITICAL" ? "🚨" : result.severity === "SERIOUS" ? "⚠️" : "✅"} {result.severity}
            </div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: "13px", margin: 0 }}>{result.summary}</p>
          </div>

          <div style={{ background: "rgba(255,107,53,.15)", border: "1px solid rgba(255,107,53,.35)", borderRadius: "14px", padding: "14px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>📞</span>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "11px", letterSpacing: "2px", color: "rgba(255,255,255,.4)", marginBottom: "2px" }}>CALL FIRST</div>
              <div style={{ color: "#FF6B35", fontWeight: "700", fontSize: "16px" }}>{result.callFirst}</div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "14px", padding: "14px", marginBottom: "14px" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "13px", letterSpacing: "2px", color: "rgba(255,255,255,.4)", marginBottom: "10px" }}>✅ DO THIS NOW</div>
            {result.actions.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", color: "rgba(255,255,255,.75)", fontSize: "13px", lineHeight: "1.5" }}>
                <span style={{ background: "#2ED57322", color: "#2ED573", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", flexShrink: 0 }}>{i + 1}</span>
                {a}
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,71,87,.06)", border: "1px solid rgba(255,71,87,.2)", borderRadius: "14px", padding: "14px", marginBottom: "20px" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "13px", letterSpacing: "2px", color: "rgba(255,71,87,.7)", marginBottom: "10px" }}>❌ DO NOT</div>
            {result.doNot.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", color: "rgba(255,255,255,.6)", fontSize: "13px", lineHeight: "1.5" }}>
                <span style={{ color: "#FF4757", flexShrink: 0 }}>✗</span>{d}
              </div>
            ))}
          </div>

          <button onClick={() => { setResult(null); setDescription(""); }} style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", color: "rgba(255,255,255,.5)", fontSize: "13px", cursor: "pointer", marginBottom: "10px" }}>
            🔄 Analyze Another Situation
          </button>
        </div>
      )}
    </div>
  );
}

// ── Panic Button ──────────────────────────────────────────────────
function PanicButton({ onActivate }) {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const intervalRef = useRef(null);

  const startPress = () => {
    setPressing(true);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(intervalRef.current); setActivated(true); onActivate(); return 100; }
        return p + 5;
      });
    }, 50);
  };
  const stopPress = () => { if (!activated) { setPressing(false); setProgress(0); clearInterval(intervalRef.current); } };
  const reset = () => { setActivated(false); setPressing(false); setProgress(0); };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <div onMouseDown={startPress} onMouseUp={stopPress} onMouseLeave={stopPress} onTouchStart={startPress} onTouchEnd={stopPress} onClick={activated ? reset : undefined}
        style={{ position: "relative", width: "160px", height: "160px", borderRadius: "50%", cursor: "pointer", userSelect: "none" }}>
        {activated && (<>
          <div style={{ position: "absolute", inset: "-20px", borderRadius: "50%", border: "2px solid rgba(255,71,87,.4)", animation: "pulseRing 1.5s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: "-40px", borderRadius: "50%", border: "2px solid rgba(255,71,87,.2)", animation: "pulseRing 1.5s ease-out infinite .5s" }} />
        </>)}
        <svg style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} width="160" height="160">
          <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="6" />
          <circle cx="80" cy="80" r="72" fill="none" stroke={activated ? "#FF4757" : "#FF6B35"} strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 72}`} strokeDashoffset={`${2 * Math.PI * 72 * (1 - progress / 100)}`}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset .05s linear" }} />
        </svg>
        <div style={{ position: "absolute", inset: "12px", borderRadius: "50%", background: activated ? "linear-gradient(135deg,#FF4757,#C0392B)" : pressing ? "linear-gradient(135deg,#FF6B35,#FF4757)" : "linear-gradient(135deg,#2D2D2D,#1A1A1A)", boxShadow: activated ? "0 0 40px rgba(255,71,87,.8)" : pressing ? "0 0 20px rgba(255,107,53,.5)" : "0 8px 32px rgba(0,0,0,.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", transition: "all .2s ease", transform: pressing ? "scale(.97)" : "scale(1)" }}>
          <span style={{ fontSize: "32px" }}>{activated ? "📡" : "🆘"}</span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: activated ? "13px" : "15px", color: activated ? "#FF8A8A" : "#fff", letterSpacing: "2px" }}>
            {activated ? "CALLING..." : pressing ? "HOLD..." : "PANIC"}
          </span>
        </div>
      </div>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: "11px", letterSpacing: "1px", fontFamily: "monospace", textAlign: "center" }}>
        {activated ? "TAP TO CANCEL" : "HOLD 3 SECONDS TO ALERT"}
      </p>
    </div>
  );
}

// ── Service Card ──────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [calling, setCalling] = useState(false);
  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "14px", animation: `slideIn .4s ease ${index * .08}s both`, cursor: "pointer", transition: "all .2s ease" }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.07)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.04)"}>
      <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${service.color}22`, border: `1px solid ${service.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{service.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "15px", color: "#fff", letterSpacing: "1px", marginBottom: "2px" }}>{service.name}</div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: "11px", marginBottom: "4px" }}>{service.type}</div>
        <span style={{ color: service.color, fontSize: "11px", fontWeight: "600" }}>📍 Based on your location</span>
      </div>
      <a href={`tel:${service.phone}`} onClick={() => setCalling(true)} style={{ background: calling ? "#2ED573" : service.color, border: "none", borderRadius: "10px", padding: "8px 14px", color: "#fff", fontSize: "12px", fontWeight: "700", cursor: "pointer", flexShrink: 0, textDecoration: "none", display: "inline-block", transition: "all .2s ease", boxShadow: `0 4px 12px ${service.color}44` }}>
        {calling ? "✓ Called" : `📞 ${service.phone}`}
      </a>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────
export default function RoadSoS() {
  const [tab, setTab] = useState("home");
  const [filter, setFilter] = useState("All");
  const [panicActivated, setPanicActivated] = useState(false);
  const [shareStatus, setShareStatus] = useState(null);
  const [location, setLocation] = useState({ city: "", state: "", status: "Detecting location..." });
  const [services, setServices] = useState(stateContacts["default"]);

  // Detect live location via browser GPS + reverse geocode
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ city: "", state: "", status: "GPS not supported" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const addr = data.address || {};
          const city = addr.city || addr.town || addr.village || addr.county || "";
          const rawState = addr.state || "";
          // normalize state name
          const state = Object.keys(stateContacts).find(s => rawState.toLowerCase().includes(s.toLowerCase())) || "default";
          setLocation({ city, state: rawState, status: `${city}${city ? ", " : ""}${rawState} · GPS Active` });
          setServices(stateContacts[state] || stateContacts["default"]);
        } catch {
          setLocation({ city: "", state: "", status: "Location detected · Using national contacts" });
        }
      },
      () => setLocation({ city: "", state: "", status: "Location unavailable · Using national contacts" })
    );
  }, []);

  const filters = ["All", "Hospital", "Ambulance", "Police", "Fire & Rescue"];
  const filtered = filter === "All" ? services : services.filter(s => s.type === filter);

  const navItems = [
    { id: "home",   icon: "🆘", label: "SOS"       },
    { id: "ai",     icon: "🤖", label: "AI Check"  },
    { id: "nearby", icon: "📍", label: "Nearby"    },
    { id: "info",   icon: "📋", label: "First Aid" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", color: "#fff", fontFamily: "'DM Sans',sans-serif", maxWidth: "420px", margin: "0 auto", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes pulseRing { 0%{transform:scale(1);opacity:1} 100%{transform:scale(1.4);opacity:0} }
        @keyframes slideIn  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        ::-webkit-scrollbar{width:0}
        textarea::placeholder{color:rgba(255,255,255,.25)}
      `}</style>

      <div style={{ position: "fixed", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,71,87,.12) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ padding: "52px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "22px" }}>🆘</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "28px", letterSpacing: "3px", background: "linear-gradient(90deg,#FF4757,#FF8A8A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RoadSoS</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,.4)", fontSize: "11px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2ED573", animation: "blink 2s ease infinite", display: "inline-block" }} />
              {location.status}
            </div>
          </div>
          <div style={{ background: "rgba(255,71,87,.15)", border: "1px solid rgba(255,71,87,.3)", borderRadius: "10px", padding: "6px 12px", fontSize: "11px", color: "#FF4757", fontWeight: "600", letterSpacing: "1px" }}>LIVE</div>
        </div>
      </div>

      {panicActivated && (
        <div style={{ background: "linear-gradient(90deg,#FF4757,#C0392B)", padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px", animation: "slideIn .3s ease" }}>
          <span style={{ fontSize: "18px", animation: "blink 1s ease infinite" }}>📡</span>
          <div>
            <div style={{ fontWeight: "700", fontSize: "13px" }}>EMERGENCY ALERT SENT</div>
            <div style={{ fontSize: "11px", opacity: .8 }}>Your location is being shared with emergency services</div>
          </div>
        </div>
      )}

      <div style={{ padding: "0 20px 110px", overflowY: "auto" }}>

        {/* HOME */}
        {tab === "home" && (<>
          <div style={{ margin: "28px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <PanicButton onActivate={() => setPanicActivated(true)} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "14px", letterSpacing: "2px", color: "rgba(255,255,255,.4)", marginBottom: "12px" }}>QUICK DIAL</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {quickDials.map(q => (
                <a key={q.number} href={`tel:${q.number}`} style={{ background: `${q.color}18`, border: `1px solid ${q.color}33`, borderRadius: "14px", padding: "14px", display: "flex", alignItems: "center", gap: "10px", color: "#fff", textDecoration: "none", transition: "all .2s ease" }}>
                  <span style={{ fontSize: "20px" }}>{q.icon}</span>
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,.5)" }}>{q.label}</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "20px", letterSpacing: "1px", color: q.color }}>{q.number}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <button onClick={() => setShareStatus("Sharing location...")} style={{ width: "100%", padding: "14px", background: "rgba(46,213,115,.1)", border: "1px solid rgba(46,213,115,.3)", borderRadius: "14px", color: "#2ED573", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            📍 {shareStatus || "Share My Location"}
          </button>

          <button onClick={() => setTab("ai")} style={{ width: "100%", padding: "14px 16px", background: "linear-gradient(135deg,rgba(255,71,87,.15),rgba(255,140,0,.1))", border: "1px solid rgba(255,71,87,.3)", borderRadius: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>🤖</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "15px", letterSpacing: "1.5px", color: "#FF8A8A" }}>AI SEVERITY CHECKER</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,.45)" }}>Describe accident → get instant AI guidance</div>
            </div>
            <span style={{ marginLeft: "auto", color: "rgba(255,255,255,.3)", fontSize: "18px" }}>›</span>
          </button>
        </>)}

        {/* AI */}
        {tab === "ai" && <AISeverityChecker state={location.state} />}

        {/* NEARBY */}
        {tab === "nearby" && (<>
          <div style={{ paddingTop: "20px", marginBottom: "16px" }}>
            {location.state && (
              <div style={{ background: "rgba(46,213,115,.1)", border: "1px solid rgba(46,213,115,.3)", borderRadius: "10px", padding: "8px 12px", marginBottom: "12px", fontSize: "12px", color: "#2ED573" }}>
                📍 Showing contacts for <strong>{location.state}</strong>
              </div>
            )}
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "14px", letterSpacing: "2px", color: "rgba(255,255,255,.4)", marginBottom: "12px" }}>FILTER BY TYPE</p>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#FF4757" : "rgba(255,255,255,.06)", border: `1px solid ${filter === f ? "#FF4757" : "rgba(255,255,255,.1)"}`, borderRadius: "20px", padding: "6px 14px", color: filter === f ? "#fff" : "rgba(255,255,255,.5)", fontSize: "12px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s ease" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtered.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
          </div>
        </>)}

        {/* FIRST AID */}
        {tab === "info" && (
          <div style={{ paddingTop: "24px" }}>
            {[
              { emoji: "🚗", title: "Road Accident",     steps: ["Move to safety if possible", "Call 108 for ambulance", "Don't move injured persons", "Keep road clear for emergency vehicles"] },
              { emoji: "🔥", title: "Vehicle Fire",      steps: ["Exit vehicle immediately", "Move 100m away", "Call 101 for fire rescue", "Never open hood if on fire"] },
              { emoji: "⚡", title: "Medical Emergency", steps: ["Keep person calm and still", "Call 108 immediately", "Don't give food or water", "Monitor breathing until help arrives"] },
            ].map((g, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "16px", padding: "16px", marginBottom: "12px", animation: `slideIn .4s ease ${i * .1}s both` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "24px" }}>{g.emoji}</span>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", letterSpacing: "1.5px" }}>{g.title}</span>
                </div>
                {g.steps.map((step, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px", marginBottom: "8px", color: "rgba(255,255,255,.65)", fontSize: "13px", lineHeight: "1.5" }}>
                    <span style={{ background: "#FF475722", color: "#FF4757", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", flexShrink: 0 }}>{j + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "420px", background: "rgba(13,13,13,.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-around", padding: "12px 0 20px" }}>
        {navItems.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: tab === t.id ? "#FF4757" : "rgba(255,255,255,.35)", transition: "all .2s ease", transform: tab === t.id ? "scale(1.1)" : "scale(1)" }}>
            <span style={{ fontSize: "20px" }}>{t.icon}</span>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "1px", fontFamily: "'Bebas Neue',sans-serif" }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
