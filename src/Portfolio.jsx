import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { label: "Sobre mí", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experiencia", href: "#experience" },
  { label: "Certs", href: "#certifications" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

const SKILLS = {
  Frontend: ["HTML / CSS","JavaScript","TypeScript","React","Next.js","Tailwind CSS","Bootstrap","SASS / SCSS","JavaFX"],
  Backend: ["Node.js","Python","PHP","Laravel","Java","C","XSL / XML","XPATH / XQuery","WordPress"],
  "Bases de datos": ["PostgreSQL","MySQL","MongoDB","SQLite","SQL","XML / DTD","XPATH / XQuery"],
  Otros: ["Figma (UI/UX)","Godot (Game Dev)","Cisco Networking","Microsoft Azure","3CX VOIP","Active Directory","SEO / SEM","Mantenimiento IT"],
};

const EXPERIENCE = [
  { period: "Jul 2025 — Actualidad", company: "Merlos Soluciones Tecnológicas", role: "Técnico IT — Remoto & Campo", desc: "Soporte técnico presencial y remoto. Instalación y mantenimiento de centralitas 3CX, gestión de redes y resolución de incidencias IT en entornos corporativos." },
  { period: "Jun 2024 — Abr 2025", company: "Posicionamiento Web Barcelona", role: "SEO / SEM — FCT + Contrato", desc: "Optimización y planificación de contenidos basada en análisis de palabras clave. Trabajo en agencia especializada en posicionamiento web y marketing digital." },
  { period: "5 meses", company: "Col·legi Singuerlin", role: "Técnico de redes y equipos — FCT", desc: "Mantenimiento, instalación y reparación de equipos informáticos y red en entorno educativo." },
  { period: "10 meses", company: "Mercadona", role: "Cajero / Reponedor", desc: "Atención al cliente, gestión de caja y reposición. Trabajo en equipo en entorno de alta demanda." },
];

const PROJECTS = [
  {
    title: "Finanzas Personales",
    tags: ["React","Next.js","TypeScript","Tailwind CSS"],
    desc: "Aplicación web de gestión de finanzas personales: seguimiento de gastos e ingresos, visualización de estadísticas y control de presupuesto personal con interfaz moderna.",
    highlights: ["Dashboard interactivo","Gestión de transacciones","Gráficos de análisis"],
    url: "https://finanzas-opal-rho.vercel.app/",
    badge: "Nuevo",
  },
  {
    title: "Perruquería Dreams",
    tags: ["JavaFX","MySQL","Java"],
    desc: "Aplicación de escritorio para gestión integral de una peluquería: agenda de citas, control de stock con alertas, estadísticas de facturación y gestión de trabajadores con roles diferenciados.",
    highlights: ["Diseño de interfaces","Gráficos de facturación","Documentación técnica"],
  },
  {
    title: "Mars Studio",
    tags: ["WordPress","HTML","CSS","JavaScript","PHP","SEO"],
    desc: "Diseño e implantación de sitio web corporativo con estrategia de contenidos orientada a SEO. Desarrollo sobre WordPress con personalización avanzada.",
    highlights: ["Diseño web","Desarrollo","Estrategia SEO"],
  },
  {
    title: "HexPuzzle Adventure",
    tags: ["Godot","GDScript","Game Dev"],
    desc: "Juego de puzzles con piezas hexagonales. Las piezas del mismo color se fusionan al contactar; al alcanzar el nivel máximo desaparecen sumando puntos.",
    highlights: ["Diseño de mecánicas","Desarrollo en Godot"],
  },
  {
    title: "Apeles Fenosa",
    tags: ["PHP","JavaScript","HTML","SASS"],
    desc: "Sistema de gestión de obras de arte para museo. Permite catalogar, buscar y administrar el catálogo artístico completo con interfaz limpia.",
    highlights: ["Desarrollo full stack","UI con SASS"],
  },
];

const CERTS = [
  { issuer:"MS", title:"Administrar reuniones y llamadas en Microsoft Teams", tag:"Microsoft Teams · Ene 2026" },
  { issuer:"MS", title:"AZ-104: Administración de identidades y gobernanza en Azure", tag:"Microsoft Azure · Ene 2026" },
  { issuer:"MS", title:"MS-721: Planeamiento y diseño de sistemas de comunicaciones de Teams", tag:"Microsoft Teams · Ene 2026" },
  { issuer:"MS", title:"Azure: Introducción a la nube de Microsoft", tag:"Microsoft Azure" },
  { issuer:"MS", title:"Seguridad de Microsoft Esencial: Conceptos y Protección con IA", tag:"Ciberseguridad · Seguridad Microsoft" },
  { issuer:"MS", title:"Windows Server 2016: Active Directory", tag:"Windows Server" },
  { issuer:"LI", title:"Microsoft 365 para administradores: Monitorización y solución de problemas", tag:"Microsoft 365 · Dic 2025" },
  { issuer:"LI", title:"Microsoft SharePoint Online: Administración", tag:"SharePoint · Dic 2025" },
  { issuer:"LI", title:"Windows 11 para profesionales IT: Administración local", tag:"Windows 11 · Ene 2026" },
  { issuer:"LI", title:"Windows Server: DNS", tag:"DNS · Windows Server · Dic 2025" },
  { issuer:"3CX", title:"3CX Basic Certified Engineer", tag:"Instalación y mantenimiento de centralitas 3CX" },
  { issuer:"CC", title:"Acceso a Redes — Cisco CCNA", tag:"Gestión de redes · NAC" },
  { issuer:"CC", title:"Conectividad IP — Cisco CCNA", tag:"Conectividad de red · Protocolo IP" },
  { issuer:"CC", title:"Fundamentos de Redes — Cisco CCNA", tag:"Cisco Networking · Interconexión de red" },
  { issuer:"LI", title:"Servicios IP (Cisco CCNA)", tag:"Servicios de redes · Dic 2025" },
  { issuer:"LI", title:"Fundamentos de protocolos de red: HTTP y HTTPs", tag:"HTTP · HTTPS · Ene 2026" },
  { issuer:"LI", title:"Fundamentos de ciberseguridad", tag:"Ciberseguridad · Dic 2025" },
  { issuer:"LI", title:"Concienciación en ciberseguridad: Terminología", tag:"Ciberseguridad · Ene 2026" },
  { issuer:"LI", title:"Panorámica de amenazas a la ciberseguridad", tag:"Ciberseguridad · Dic 2025" },
  { issuer:"OW", title:"Fundamentos de JavaScript", tag:"JavaScript · OpenWebinars · Jun 2025 · 8h" },
  { issuer:"LI", title:"Conviértete en especialista en soporte IT", tag:"ITIL · Gestión TI · Ene 2026" },
  { issuer:"LI", title:"Soporte IT: Trucos", tag:"Soporte técnico · Ene 2026" },
  { issuer:"LI", title:"Fundamentos de la atención al cliente para profesionales IT", tag:"Gestión de servicios TI · Ene 2026" },
  { issuer:"LI", title:"Fundamentos de la gestión de proyectos: Requisitos", tag:"Gestión de proyectos · Dic 2025" },
  { issuer:"LI", title:"Plesk para administradores de sistemas", tag:"Plesk · Administración de servidores · Ene 2026" },
];

const CERT_FILTERS = ["Todas","Microsoft","Cisco / Redes","Ciberseguridad","Desarrollo","Soporte IT"];

const certFilter = (cert, f) => {
  if (f === "Todas") return true;
  if (f === "Microsoft") return cert.issuer === "MS";
  if (f === "Cisco / Redes") return cert.issuer === "CC" || cert.tag.toLowerCase().includes("cisco") || cert.tag.toLowerCase().includes("redes") || cert.tag.toLowerCase().includes("ip") || cert.tag.toLowerCase().includes("http");
  if (f === "Ciberseguridad") return cert.tag.toLowerCase().includes("ciberseguridad");
  if (f === "Desarrollo") return cert.tag.toLowerCase().includes("javascript") || cert.tag.toLowerCase().includes("plesk");
  if (f === "Soporte IT") return cert.tag.toLowerCase().includes("soporte") || cert.tag.toLowerCase().includes("itil") || cert.tag.toLowerCase().includes("gesti");
  return true;
};

const ISSUER_COLORS = {
  MS: { bg:"#E8F0FE", text:"#1A56DB" },
  LI: { bg:"#E8F5E9", text:"#1B5E20" },
  CC: { bg:"#FFF3E0", text:"#E65100" },
  "3CX": { bg:"#F3E5F5", text:"#6A1B9A" },
  OW: { bg:"#FCE4EC", text:"#880E4F" },
};

function Tag({ label }) {
  return (
    <span style={{
      display:"inline-block", padding:"2px 10px", borderRadius:20,
      background:"rgba(79,70,229,0.08)", color:"#4F46E5",
      fontSize:12, fontWeight:500, margin:"2px 3px 2px 0"
    }}>{label}</span>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const isNew = !!project.badge;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fafafa" : "#fff",
        border: isNew ? "2px solid #4F46E5" : "1.5px solid #e5e7eb",
        borderRadius: 16,
        padding: "28px 28px 22px",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 32px rgba(79,70,229,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        position:"relative", cursor: project.url ? "pointer" : "default",
        display:"flex", flexDirection:"column", gap:12,
      }}
      onClick={() => project.url && window.open(project.url, "_blank")}
    >
      {isNew && (
        <span style={{
          position:"absolute", top:-12, right:20,
          background:"#4F46E5", color:"#fff",
          fontSize:11, fontWeight:700, letterSpacing:1.2,
          padding:"3px 12px", borderRadius:20,
          textTransform:"uppercase",
        }}>✦ Nuevo proyecto</span>
      )}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <h3 style={{ margin:0, fontSize:19, fontWeight:700, color:"#111", lineHeight:1.2 }}>
          {project.title}
        </h3>
        {project.url && (
          <span style={{
            fontSize:12, color:"#4F46E5", fontWeight:600,
            display:"flex", alignItems:"center", gap:4, whiteSpace:"nowrap",
            marginTop:2,
          }}>
            Ver proyecto →
          </span>
        )}
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:0 }}>
        {project.tags.map(t => <Tag key={t} label={t} />)}
      </div>

      <p style={{ margin:0, color:"#555", fontSize:14, lineHeight:1.65 }}>{project.desc}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {project.highlights.map(h => (
          <span key={h} style={{
            fontSize:12, color:"#6B7280",
            background:"#F3F4F6", padding:"3px 10px", borderRadius:8,
          }}>{h}</span>
        ))}
      </div>
    </div>
  );
}

function SkillPill({ name }) {
  return (
    <span style={{
      display:"inline-block", background:"#F9FAFB", border:"1px solid #E5E7EB",
      borderRadius:8, padding:"5px 12px", fontSize:13, color:"#374151",
      margin:"3px 4px 3px 0",
    }}>{name}</span>
  );
}

function SectionLabel({ number, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
      <span style={{ fontSize:12, color:"#9CA3AF", fontWeight:600, fontFamily:"monospace" }}>{number}</span>
      <span style={{ width:32, height:1, background:"#E5E7EB" }} />
      <span style={{ fontSize:12, color:"#9CA3AF", fontWeight:500, letterSpacing:1 }}>{label}</span>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("");
  const [certFilter_, setCertFilter] = useState("Todas");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  const filteredCerts = CERTS.filter(c => certFilter(c, certFilter_));

  return (
    <div style={{ fontFamily:"'Inter', 'Segoe UI', sans-serif", color:"#111", background:"#fff", minHeight:"100vh" }}>
      {/* NAV */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #f3f4f6" : "none",
        transition:"all 0.3s",
        padding:"0 32px",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontWeight:800, fontSize:16, letterSpacing:-0.5, color:"#111" }}>IN/</span>
          <div style={{ display:"flex", gap:28 }}>
            {NAV_ITEMS.map(n => (
              <button key={n.label}
                onClick={() => scrollTo(n.href)}
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  fontSize:13, color:"#6B7280", fontWeight:500, padding:0,
                  transition:"color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color="#111"}
                onMouseLeave={e => e.target.style.color="#6B7280"}
              >{n.label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        padding:"120px 32px 80px",
        background:"linear-gradient(160deg, #fff 0%, #F5F3FF 60%, #EEF2FF 100%)",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:60, flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:300 }}>
            <p style={{ fontSize:13, color:"#4F46E5", fontWeight:600, letterSpacing:2, marginBottom:16, textTransform:"uppercase" }}>
              Full Stack Developer
            </p>
            <h1 style={{
              fontSize:"clamp(2.5rem, 6vw, 4rem)", fontWeight:800,
              color:"#111", lineHeight:1.1, margin:"0 0 24px",
              letterSpacing:-2,
            }}>
              Iker Navas<br />García.
            </h1>
            <p style={{ fontSize:16, color:"#6B7280", lineHeight:1.7, marginBottom:32, maxWidth:480 }}>
              Desarrollador web full stack y técnico informático apasionado por construir interfaces y sistemas que funcionan de verdad. Badalona, España.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button
                onClick={() => scrollTo("#contact")}
                style={{
                  background:"#4F46E5", color:"#fff", border:"none",
                  padding:"12px 24px", borderRadius:10, fontSize:14,
                  fontWeight:600, cursor:"pointer", transition:"all 0.2s",
                }}
                onMouseEnter={e => e.target.style.background="#4338CA"}
                onMouseLeave={e => e.target.style.background="#4F46E5"}
              >Contactar →</button>
              <button
                onClick={() => scrollTo("#skills")}
                style={{
                  background:"transparent", color:"#4F46E5",
                  border:"1.5px solid #4F46E5",
                  padding:"12px 24px", borderRadius:10, fontSize:14,
                  fontWeight:600, cursor:"pointer", transition:"all 0.2s",
                }}
                onMouseEnter={e => { e.target.style.background="#4F46E5"; e.target.style.color="#fff"; }}
                onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#4F46E5"; }}
              >Ver skills</button>
            </div>
          </div>
          <div style={{
            background:"#fff", border:"1.5px solid #E5E7EB",
            borderRadius:20, padding:"28px 32px",
            boxShadow:"0 8px 32px rgba(79,70,229,0.08)",
            minWidth:260,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#10B981" }} />
              <span style={{ fontSize:13, color:"#6B7280", fontWeight:500 }}>Disponible para proyectos</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["React","Next.js","Node.js","TypeScript","PHP/Laravel","PostgreSQL","MongoDB","Cisco CCNA","Azure","3CX"].map(t =>
                <Tag key={t} label={t} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="01" label="SOBRE MÍ" />
          <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:800, margin:"0 0 32px", letterSpacing:-1 }}>
            Código + Redes. Todo en uno.
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, flexWrap:"wrap" }}>
            <p style={{ color:"#555", lineHeight:1.75, fontSize:15, margin:0 }}>
              Soy un desarrollador full stack con formación en CFGS de Desarrollo de Aplicaciones Web,
              complementada con un sólido background en sistemas y redes. Esto me permite entender los
              proyectos desde la interfaz hasta la infraestructura.<br /><br />
              Cuento con experiencia real en agencia SEO/SEM, mantenimiento de redes corporativas y
              soporte técnico presencial y remoto. Actualmente trabajo como técnico IT en Merlos
              Soluciones Tecnológicas.<br /><br />
              Me definen mi actitud proactiva, atención al detalle y capacidad para resolver
              problemas con creatividad técnica.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[
                { n:"5+", label:"Años formándome" },
                { n:"20+", label:"Tecnologías" },
                { n:"7", label:"Certificaciones" },
                { n:"B1/B2", label:"Inglés" },
              ].map(s => (
                <div key={s.label} style={{
                  background:"#F9FAFB", borderRadius:14, padding:"24px 20px",
                  border:"1px solid #E5E7EB",
                }}>
                  <div style={{ fontSize:32, fontWeight:800, color:"#4F46E5", letterSpacing:-1 }}>{s.n}</div>
                  <div style={{ fontSize:13, color:"#6B7280", marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding:"96px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="02" label="SKILLS" />
          <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:800, margin:"0 0 40px", letterSpacing:-1 }}>
            Stack técnico
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:24 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} style={{ background:"#fff", borderRadius:14, padding:"22px 22px", border:"1px solid #E5E7EB" }}>
                <h3 style={{ margin:"0 0 14px", fontSize:14, fontWeight:700, color:"#4F46E5", textTransform:"uppercase", letterSpacing:1 }}>{cat}</h3>
                <div>{items.map(s => <SkillPill key={s} name={s} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="03" label="EXPERIENCIA" />
          <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:800, margin:"0 0 40px", letterSpacing:-1 }}>
            Trabajo real
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} style={{
                display:"grid", gridTemplateColumns:"180px 1fr",
                gap:24, padding:"28px 0",
                borderBottom: i < EXPERIENCE.length-1 ? "1px solid #F3F4F6" : "none",
              }}>
                <div style={{ color:"#9CA3AF", fontSize:13, fontWeight:500, paddingTop:3 }}>{e.period}</div>
                <div>
                  <div style={{ fontSize:17, fontWeight:700, color:"#111", marginBottom:4 }}>{e.company}</div>
                  <div style={{ fontSize:13, color:"#4F46E5", fontWeight:600, marginBottom:10 }}>{e.role}</div>
                  <p style={{ margin:0, color:"#6B7280", fontSize:14, lineHeight:1.65 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTS */}
      <section id="certifications" style={{ padding:"96px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="04" label="CERTIFICACIONES" />
          <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:800, margin:"0 0 28px", letterSpacing:-1 }}>
            Formación certificada <span style={{ color:"#4F46E5" }}>{CERTS.length}</span>
          </h2>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32 }}>
            {CERT_FILTERS.map(f => (
              <button key={f}
                onClick={() => setCertFilter(f)}
                style={{
                  background: certFilter_ === f ? "#4F46E5" : "#fff",
                  color: certFilter_ === f ? "#fff" : "#6B7280",
                  border: certFilter_ === f ? "1.5px solid #4F46E5" : "1.5px solid #E5E7EB",
                  borderRadius:20, padding:"6px 16px", fontSize:13,
                  fontWeight:500, cursor:"pointer", transition:"all 0.2s",
                }}
              >{f}</button>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:14 }}>
            {filteredCerts.map((c, i) => {
              const col = ISSUER_COLORS[c.issuer] || { bg:"#F3F4F6", text:"#374151" };
              return (
                <div key={i} style={{
                  background:"#fff", border:"1px solid #E5E7EB", borderRadius:12, padding:"16px 18px",
                  display:"flex", gap:12, alignItems:"flex-start",
                }}>
                  <span style={{
                    background:col.bg, color:col.text,
                    fontWeight:700, fontSize:11, padding:"3px 8px",
                    borderRadius:6, minWidth:28, textAlign:"center", marginTop:1,
                  }}>{c.issuer}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#111", lineHeight:1.4, marginBottom:4 }}>{c.title}</div>
                    <div style={{ fontSize:11, color:"#9CA3AF" }}>{c.tag}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="05" label="PROYECTOS" />
          <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:800, margin:"0 0 40px", letterSpacing:-1 }}>
            Lo que he construido
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:24 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={{ padding:"80px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="06" label="EDUCACIÓN" />
          <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:800, margin:"0 0 36px", letterSpacing:-1 }}>
            Formación académica
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[
              { n:"01", title:"CFGS Desarrollo de Aplicaciones Web", center:"INS La Pineda", years:"2023 — 2025" },
              { n:"02", title:"CFGM Sistemas Microinformáticos y Redes", center:"Col·legi Cultural Badalona", years:"2020 — 2022" },
              { n:"03", title:"Educación Secundaria Obligatoria", center:"Escola Cultural Badalona", years:"2016 — 2020" },
            ].map(e => (
              <div key={e.n} style={{
                background:"#fff", border:"1px solid #E5E7EB", borderRadius:14,
                padding:"22px 28px", display:"flex", alignItems:"center", gap:24,
              }}>
                <span style={{ fontSize:28, fontWeight:800, color:"#E5E7EB", fontFamily:"monospace" }}>{e.n}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:16, color:"#111" }}>{e.title}</div>
                  <div style={{ fontSize:13, color:"#6B7280", marginTop:2 }}>{e.center}</div>
                </div>
                <span style={{ fontSize:13, color:"#9CA3AF", whiteSpace:"nowrap" }}>{e.years}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
          <SectionLabel number="07" label="CONTACTO" />
          <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:800, margin:"0 0 16px", letterSpacing:-1 }}>
            ¿Hablamos?
          </h2>
          <p style={{ color:"#6B7280", fontSize:16, marginBottom:40, maxWidth:480, margin:"0 auto 40px" }}>
            Disponible para proyectos freelance, nuevas oportunidades laborales o simplemente una buena conversación técnica.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap", marginBottom:32 }}>
            <a href="mailto:ikernavas608@gmail.com" style={{
              background:"#4F46E5", color:"#fff", textDecoration:"none",
              padding:"13px 28px", borderRadius:10, fontWeight:600, fontSize:14,
            }}>ikernavas608@gmail.com</a>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:20 }}>
            {[
              { label:"LinkedIn", url:"https://www.linkedin.com/in/ikernavas/" },
              { label:"GitHub", url:"https://github.com/ikernvs-17" },
              { label:"Instagram", url:"https://www.instagram.com/ikernvs/" },
            ].map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                color:"#6B7280", textDecoration:"none", fontSize:14, fontWeight:500,
                padding:"8px 16px", borderRadius:8, border:"1px solid #E5E7EB",
              }}>{l.label}</a>
            ))}
          </div>
          <p style={{ marginTop:24, fontSize:13, color:"#9CA3AF" }}>+34 697 707 494</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid #F3F4F6", padding:"24px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:13, color:"#9CA3AF" }}>© 2025 Iker Navas García · Badalona, Cataluña</span>
          <span style={{ fontSize:13, color:"#9CA3AF" }}>ikernavas608@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}
