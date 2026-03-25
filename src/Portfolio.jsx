import { useState, useEffect } from "react";

// ── Translations ─────────────────────────────────────────────────────────────
const T = {
  es: {
    nav: ["Sobre mí", "Skills", "Experiencia", "Certs", "Proyectos", "Contacto"],
    langBtn: "EN",
    available: "Disponible para proyectos",
    heroRole: "Full Stack Developer",
    heroDesc: "Desarrollador web full stack y técnico informático apasionado por construir interfaces y sistemas que funcionan de verdad. Badalona, España.",
    contactBtn: "Contactar →",
    skillsBtn: "Ver skills",
    s01label: "SOBRE MÍ",
    s01title: "Código + Redes. Todo en uno.",
    s01body: <>Soy un desarrollador full stack con formación en CFGS de Desarrollo de Aplicaciones Web, complementada con un sólido background en sistemas y redes. Esto me permite entender los proyectos desde la interfaz hasta la infraestructura.<br /><br />Cuento con experiencia real en agencia SEO/SEM, mantenimiento de redes corporativas y soporte técnico presencial y remoto. Actualmente trabajo como técnico IT en Merlos Soluciones Tecnológicas.<br /><br />Me definen mi actitud proactiva, atención al detalle y capacidad para resolver problemas con creatividad técnica.</>,
    stats: [{ n:"5+", label:"Años formándome" },{ n:"20+", label:"Tecnologías" },{ n:"25+", label:"Certificaciones" },{ n:"B1/B2", label:"Inglés" }],
    s02label: "SKILLS", s02title: "Stack técnico",
    s03label: "EXPERIENCIA", s03title: "Trabajo real",
    s04label: "CERTIFICACIONES", s04title: "Formación certificada",
    certFilters: ["Todas","Microsoft","Cisco / Redes","Ciberseguridad","Desarrollo","Soporte IT"],
    s05label: "PROYECTOS", s05title: "Lo que he construido",
    s06label: "EDUCACIÓN", s06title: "Formación académica",
    edu: [
      { n:"01", title:"CFGS Desarrollo de Aplicaciones Web", center:"INS La Pineda", years:"2023 — 2025" },
      { n:"02", title:"CFGM Sistemas Microinformáticos y Redes", center:"Col·legi Cultural Badalona", years:"2020 — 2022" },
      { n:"03", title:"Educación Secundaria Obligatoria", center:"Escola Cultural Badalona", years:"2016 — 2020" },
    ],
    s07label: "CONTACTO", s07title: "¿Hablamos?",
    s07desc: "Disponible para proyectos freelance, nuevas oportunidades laborales o simplemente una buena conversación técnica.",
    viewProject: "Ver proyecto →",
    badgeNew: "✦ Nuevo proyecto",
    footer: "© 2025 Iker Navas García · Badalona, Cataluña",
  },
  en: {
    nav: ["About me", "Skills", "Experience", "Certs", "Projects", "Contact"],
    langBtn: "ES",
    available: "Available for projects",
    heroRole: "Full Stack Developer",
    heroDesc: "Full stack web developer and IT technician passionate about building interfaces and systems that truly work. Badalona, Spain.",
    contactBtn: "Contact →",
    skillsBtn: "View skills",
    s01label: "ABOUT ME",
    s01title: "Code + Networks. All in one.",
    s01body: <>I'm a full stack developer with a degree in Web Application Development, backed by a solid background in systems and networks — which lets me understand projects from the interface all the way to the infrastructure.<br /><br />I have real-world experience at an SEO/SEM agency, corporate network maintenance, and on-site and remote technical support. I currently work as an IT technician at Merlos Soluciones Tecnológicas.<br /><br />I'm defined by a proactive attitude, attention to detail, and the ability to solve problems with technical creativity.</>,
    stats: [{ n:"5+", label:"Years learning" },{ n:"20+", label:"Technologies" },{ n:"25+", label:"Certifications" },{ n:"B1/B2", label:"English" }],
    s02label: "SKILLS", s02title: "Tech stack",
    s03label: "EXPERIENCE", s03title: "Real work",
    s04label: "CERTIFICATIONS", s04title: "Certified training",
    certFilters: ["All","Microsoft","Cisco / Networks","Cybersecurity","Development","IT Support"],
    s05label: "PROJECTS", s05title: "What I've built",
    s06label: "EDUCATION", s06title: "Academic background",
    edu: [
      { n:"01", title:"HND Web Application Development", center:"INS La Pineda", years:"2023 — 2025" },
      { n:"02", title:"HNC Microcomputer Systems & Networks", center:"Col·legi Cultural Badalona", years:"2020 — 2022" },
      { n:"03", title:"Secondary Education", center:"Escola Cultural Badalona", years:"2016 — 2020" },
    ],
    s07label: "CONTACT", s07title: "Let's talk?",
    s07desc: "Available for freelance projects, new job opportunities, or just a good technical conversation.",
    viewProject: "View project →",
    badgeNew: "✦ New project",
    footer: "© 2025 Iker Navas García · Badalona, Catalonia",
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_HREFS = ["#about","#skills","#experience","#certifications","#projects","#contact"];

const SKILLS = {
  Frontend: ["HTML / CSS","JavaScript","TypeScript","React","Next.js","Tailwind CSS","Bootstrap","SASS / SCSS","JavaFX"],
  Backend: ["Node.js","Python","PHP","Laravel","Java","C","XSL / XML","XPATH / XQuery","WordPress"],
  "Bases de datos / Databases": ["PostgreSQL","MySQL","MongoDB","SQLite","SQL","XML / DTD","XPATH / XQuery"],
  Otros: ["Figma (UI/UX)","Godot (Game Dev)","Cisco Networking","Microsoft Azure","3CX VOIP","Active Directory","SEO / SEM","Mantenimiento IT"],
};

const EXPERIENCE = {
  es: [
    { period:"Jul 2025 — Mar 2026", company:"Merlos Soluciones Tecnológicas", role:"Técnico IT — Remoto & Campo", desc:"Soporte técnico presencial y remoto. Instalación y mantenimiento de centralitas 3CX, gestión de redes y resolución de incidencias IT en entornos corporativos." },
    { period:"Jun 2024 — Abr 2025", company:"Posicionamiento Web Barcelona", role:"SEO / SEM — FCT + Contrato", desc:"Optimización y planificación de contenidos basada en análisis de palabras clave. Trabajo en agencia especializada en posicionamiento web y marketing digital." },
    { period:"5 meses", company:"Col·legi Singuerlin", role:"Técnico de redes y equipos — FCT", desc:"Mantenimiento, instalación y reparación de equipos informáticos y red en entorno educativo." },
    { period:"10 meses", company:"Mercadona", role:"Cajero / Reponedor", desc:"Atención al cliente, gestión de caja y reposición. Trabajo en equipo en entorno de alta demanda." },
  ],
  en: [
    { period:"Jul 2025 — Mar 2026", company:"Merlos Soluciones Tecnológicas", role:"IT Technician — Remote & On-site", desc:"On-site and remote technical support. Installation and maintenance of 3CX PBX systems, network management, and IT incident resolution in corporate environments." },
    { period:"Jun 2024 — Apr 2025", company:"Posicionamiento Web Barcelona", role:"SEO / SEM — Internship + Contract", desc:"Content optimization and planning based on keyword analysis. Work at an agency specializing in web positioning and digital marketing." },
    { period:"5 months", company:"Col·legi Singuerlin", role:"Network & Equipment Technician — Internship", desc:"Maintenance, installation and repair of computers and network infrastructure in an educational environment." },
    { period:"10 months", company:"Mercadona", role:"Cashier / Stock Replenisher", desc:"Customer service, cash management, and stock replenishment. Teamwork in a high-demand environment." },
  ],
};

const PROJECTS = {
  es: [
    { title:"Finanzas Personales", tags:["React","Next.js","TypeScript","Tailwind CSS"], desc:"Aplicación web de gestión de finanzas personales: seguimiento de gastos e ingresos, visualización de estadísticas y control de presupuesto personal con interfaz moderna.", highlights:["Dashboard interactivo","Gestión de transacciones","Gráficos de análisis"], url:"https://finanzas-opal-rho.vercel.app/", badge:true },
    { title:"Perruquería Dreams", tags:["JavaFX","MySQL","Java"], desc:"Aplicación de escritorio para gestión integral de una peluquería: agenda de citas, control de stock con alertas, estadísticas de facturación y gestión de trabajadores con roles diferenciados.", highlights:["Diseño de interfaces","Gráficos de facturación","Documentación técnica"] },
    { title:"Mars Studio", tags:["WordPress","HTML","CSS","JavaScript","PHP","SEO"], desc:"Diseño e implantación de sitio web corporativo con estrategia de contenidos orientada a SEO. Desarrollo sobre WordPress con personalización avanzada.", highlights:["Diseño web","Desarrollo","Estrategia SEO"], url:"https://mars-studio.es/" },
    { title:"HexPuzzle Adventure", tags:["Godot","GDScript","Game Dev"], desc:"Juego de puzzles con piezas hexagonales. Las piezas del mismo color se fusionan al contactar; al alcanzar el nivel máximo desaparecen sumando puntos.", highlights:["Diseño de mecánicas","Desarrollo en Godot"] },
    { title:"Apeles Fenosa", tags:["PHP","JavaScript","HTML","SASS"], desc:"Sistema de gestión de obras de arte para museo. Permite catalogar, buscar y administrar el catálogo artístico completo con interfaz limpia.", highlights:["Desarrollo full stack","UI con SASS"] },
  ],
  en: [
    { title:"Personal Finance", tags:["React","Next.js","TypeScript","Tailwind CSS"], desc:"Web app for personal finance management: expense and income tracking, statistics visualization, and budget control with a modern interface.", highlights:["Interactive dashboard","Transaction management","Analytics charts"], url:"https://finanzas-opal-rho.vercel.app/", badge:true },
    { title:"Perruquería Dreams", tags:["JavaFX","MySQL","Java"], desc:"Desktop application for full hairdresser management: appointment scheduling, stock control with alerts, billing statistics, and staff management with role-based access.", highlights:["UI design","Billing charts","Technical docs"] },
    { title:"Mars Studio", tags:["WordPress","HTML","CSS","JavaScript","PHP","SEO"], desc:"Design and deployment of a corporate website with SEO-focused content strategy. Built on WordPress with advanced customization.", highlights:["Web design","Development","SEO strategy"], url:"https://mars-studio.es/" },
    { title:"HexPuzzle Adventure", tags:["Godot","GDScript","Game Dev"], desc:"Hex-tile puzzle game. Same-color pieces merge on contact; reaching the max level makes them disappear and score points.", highlights:["Mechanics design","Godot development"] },
    { title:"Apeles Fenosa", tags:["PHP","JavaScript","HTML","SASS"], desc:"Artwork management system for a museum. Allows cataloguing, searching, and administering the full art collection with a clean interface.", highlights:["Full stack dev","UI with SASS"] },
  ],
};

const CERTS = [
  { issuer:"MS", title:{ es:"Administrar reuniones y llamadas en Microsoft Teams", en:"Manage meetings and calls in Microsoft Teams" }, tag:"Microsoft Teams · Ene 2026" },
  { issuer:"MS", title:{ es:"AZ-104: Administración de identidades y gobernanza en Azure", en:"AZ-104: Azure Identity and Governance Administration" }, tag:"Microsoft Azure · Ene 2026" },
  { issuer:"MS", title:{ es:"MS-721: Planeamiento y diseño de sistemas de comunicaciones de Teams", en:"MS-721: Teams Communications Systems Planning and Design" }, tag:"Microsoft Teams · Ene 2026" },
  { issuer:"MS", title:{ es:"Azure: Introducción a la nube de Microsoft", en:"Azure: Introduction to Microsoft Cloud" }, tag:"Microsoft Azure" },
  { issuer:"MS", title:{ es:"Seguridad de Microsoft Esencial: Conceptos y Protección con IA", en:"Microsoft Essential Security: Concepts and AI Protection" }, tag:"Ciberseguridad · Seguridad Microsoft" },
  { issuer:"MS", title:{ es:"Windows Server 2016: Active Directory", en:"Windows Server 2016: Active Directory" }, tag:"Windows Server" },
  { issuer:"LI", title:{ es:"Microsoft 365 para administradores: Monitorización y solución de problemas", en:"Microsoft 365 for Administrators: Monitoring and Troubleshooting" }, tag:"Microsoft 365 · Dic 2025" },
  { issuer:"LI", title:{ es:"Microsoft SharePoint Online: Administración", en:"Microsoft SharePoint Online: Administration" }, tag:"SharePoint · Dic 2025" },
  { issuer:"LI", title:{ es:"Windows 11 para profesionales IT: Administración local", en:"Windows 11 for IT Pros: Local Administration" }, tag:"Windows 11 · Ene 2026" },
  { issuer:"LI", title:{ es:"Windows Server: DNS", en:"Windows Server: DNS" }, tag:"DNS · Windows Server · Dic 2025" },
  { issuer:"3CX", title:{ es:"3CX Basic Certified Engineer", en:"3CX Basic Certified Engineer" }, tag:"3CX PBX installation & maintenance" },
  { issuer:"CC", title:{ es:"Acceso a Redes — Cisco CCNA", en:"Network Access — Cisco CCNA" }, tag:"Gestión de redes · NAC" },
  { issuer:"CC", title:{ es:"Conectividad IP — Cisco CCNA", en:"IP Connectivity — Cisco CCNA" }, tag:"Conectividad de red · Protocolo IP" },
  { issuer:"CC", title:{ es:"Fundamentos de Redes — Cisco CCNA", en:"Network Fundamentals — Cisco CCNA" }, tag:"Cisco Networking · Interconexión de red" },
  { issuer:"LI", title:{ es:"Servicios IP (Cisco CCNA)", en:"IP Services (Cisco CCNA)" }, tag:"Servicios de redes · Dic 2025" },
  { issuer:"LI", title:{ es:"Fundamentos de protocolos de red: HTTP y HTTPs", en:"Network Protocol Fundamentals: HTTP and HTTPS" }, tag:"HTTP · HTTPS · Ene 2026" },
  { issuer:"LI", title:{ es:"Fundamentos de ciberseguridad", en:"Cybersecurity Fundamentals" }, tag:"Ciberseguridad · Dic 2025" },
  { issuer:"LI", title:{ es:"Concienciación en ciberseguridad: Terminología", en:"Cybersecurity Awareness: Terminology" }, tag:"Ciberseguridad · Ene 2026" },
  { issuer:"LI", title:{ es:"Panorámica de amenazas a la ciberseguridad", en:"Overview of Cybersecurity Threats" }, tag:"Ciberseguridad · Dic 2025" },
  { issuer:"OW", title:{ es:"Fundamentos de JavaScript", en:"JavaScript Fundamentals" }, tag:"JavaScript · OpenWebinars · Jun 2025 · 8h" },
  { issuer:"LI", title:{ es:"Conviértete en especialista en soporte IT", en:"Become an IT Support Specialist" }, tag:"ITIL · Gestión TI · Ene 2026" },
  { issuer:"LI", title:{ es:"Soporte IT: Trucos", en:"IT Support: Tips & Tricks" }, tag:"Soporte técnico · Ene 2026" },
  { issuer:"LI", title:{ es:"Fundamentos de la atención al cliente para profesionales IT", en:"Customer Service Fundamentals for IT Professionals" }, tag:"Gestión de servicios TI · Ene 2026" },
  { issuer:"LI", title:{ es:"Fundamentos de la gestión de proyectos: Requisitos", en:"Project Management Fundamentals: Requirements" }, tag:"Gestión de proyectos · Dic 2025" },
  { issuer:"LI", title:{ es:"Plesk para administradores de sistemas", en:"Plesk for System Administrators" }, tag:"Plesk · Administración de servidores · Ene 2026" },
];

const CERT_FILTER_KEYS = {
  es: { "Todas":"all","Microsoft":"ms","Cisco / Redes":"cisco","Ciberseguridad":"cyber","Desarrollo":"dev","Soporte IT":"support" },
  en: { "All":"all","Microsoft":"ms","Cisco / Networks":"cisco","Cybersecurity":"cyber","Development":"dev","IT Support":"support" },
};

const certMatch = (cert, filterKey) => {
  if (filterKey === "all") return true;
  if (filterKey === "ms") return cert.issuer === "MS";
  if (filterKey === "cisco") return cert.issuer === "CC" || ["cisco","redes","ip","http","network"].some(k => cert.tag.toLowerCase().includes(k));
  if (filterKey === "cyber") return cert.tag.toLowerCase().includes("ciberseguridad") || cert.tag.toLowerCase().includes("security") || cert.tag.toLowerCase().includes("cyber");
  if (filterKey === "dev") return cert.tag.toLowerCase().includes("javascript") || cert.tag.toLowerCase().includes("plesk");
  if (filterKey === "support") return ["soporte","itil","gesti","support"].some(k => cert.tag.toLowerCase().includes(k));
  return true;
};

const ISSUER_COLORS = {
  MS:   { bg:"#E8F0FE", text:"#1A56DB" },
  LI:   { bg:"#E8F5E9", text:"#1B5E20" },
  CC:   { bg:"#FFF3E0", text:"#E65100" },
  "3CX":{ bg:"#F3E5F5", text:"#6A1B9A" },
  OW:   { bg:"#FCE4EC", text:"#880E4F" },
};

// ── Global CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root {
    width: 100%; max-width: 100%; overflow-x: hidden; background: #fff;
  }
  .nav-desktop  { display: flex; }
  .nav-hamburger{ display: none; }
  .hero-inner   { display: flex; align-items: center; justify-content: space-between; gap: 60px; flex-wrap: wrap; }
  .hero-text    { flex: 1; min-width: 280px; }
  .about-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .exp-row      { display: grid; grid-template-columns: 180px 1fr; gap: 24px; }
  .edu-row      { display: flex; align-items: center; gap: 24px; }
  .footer-inner { display: flex; justify-content: space-between; align-items: center; }
  .contact-links{ display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

  @media (max-width: 768px) {
    .nav-desktop   { display: none !important; }
    .nav-hamburger { display: flex !important; }
    .hero-inner    { flex-direction: column; gap: 32px; }
    .hero-text     { min-width: unset; width: 100%; }
    .hero-card     { width: 100%; min-width: unset !important; }
    .about-grid    { grid-template-columns: 1fr; gap: 28px; }
    .exp-row       { grid-template-columns: 1fr; gap: 4px; padding: 20px 0 !important; }
    .exp-period    { font-size: 12px !important; }
    .edu-row       { flex-wrap: wrap; gap: 12px; padding: 16px 20px !important; }
    .edu-number    { display: none; }
    .footer-inner  { flex-direction: column; gap: 6px; text-align: center; }
    .contact-links { flex-direction: column; align-items: center; gap: 10px; }
    .section       { padding: 64px 20px !important; }
    .section-sm    { padding: 48px 20px !important; }
  }
  @media (max-width: 480px) {
    .cert-grid     { grid-template-columns: 1fr !important; }
    .skills-grid   { grid-template-columns: 1fr !important; }
    .projects-grid { grid-template-columns: 1fr !important; }
  }
`;

// ── Small components ──────────────────────────────────────────────────────────
function Tag({ label }) {
  return <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:20, background:"rgba(79,70,229,0.08)", color:"#4F46E5", fontSize:12, fontWeight:500, margin:"2px 3px 2px 0" }}>{label}</span>;
}
function SkillPill({ name }) {
  return <span style={{ display:"inline-block", background:"#F9FAFB", border:"1px solid #E5E7EB", borderRadius:8, padding:"5px 12px", fontSize:13, color:"#374151", margin:"3px 4px 3px 0" }}>{name}</span>;
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
function ProjectCard({ project, viewLabel, badgeLabel }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => project.url && window.open(project.url, "_blank")}
      style={{
        background: hovered ? "#fafafa" : "#fff",
        border: project.badge ? "2px solid #4F46E5" : "1.5px solid #e5e7eb",
        borderRadius:16, padding:"28px 24px 22px", transition:"all 0.25s",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 32px rgba(79,70,229,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        position:"relative", cursor: project.url ? "pointer" : "default",
        display:"flex", flexDirection:"column", gap:12,
      }}
    >
      {project.badge && (
        <span style={{ position:"absolute", top:-12, right:20, background:"#4F46E5", color:"#fff", fontSize:11, fontWeight:700, letterSpacing:1.2, padding:"3px 12px", borderRadius:20, textTransform:"uppercase" }}>{badgeLabel}</span>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <h3 style={{ margin:0, fontSize:18, fontWeight:700, color:"#111", lineHeight:1.2 }}>{project.title}</h3>
        {project.url && <span style={{ fontSize:12, color:"#4F46E5", fontWeight:600, whiteSpace:"nowrap", marginTop:2, flexShrink:0 }}>{viewLabel}</span>}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap" }}>{project.tags.map(t => <Tag key={t} label={t} />)}</div>
      <p style={{ margin:0, color:"#555", fontSize:14, lineHeight:1.65 }}>{project.desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {project.highlights.map(h => <span key={h} style={{ fontSize:12, color:"#6B7280", background:"#F3F4F6", padding:"3px 10px", borderRadius:8 }}>{h}</span>)}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang]           = useState("es");
  const [certFilterKey, setCertFilterKey] = useState("all");
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  const t = T[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reset cert filter to "all" on lang change
  useEffect(() => { setCertFilterKey("all"); }, [lang]);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior:"smooth", block:"start" });
    setMenuOpen(false);
  };

  const filterMap = CERT_FILTER_KEYS[lang];
  const filteredCerts = CERTS.filter(c => certMatch(c, certFilterKey));
  const experience = EXPERIENCE[lang];
  const projects   = PROJECTS[lang];

  const navBg = scrolled || menuOpen ? "rgba(255,255,255,0.97)" : "transparent";

  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#111", background:"#fff", width:"100%" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid #f3f4f6", transition:"all 0.3s" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px" }}>
          <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            style={{ fontWeight:800, fontSize:16, letterSpacing:-0.5, background:"none", border:"none", cursor:"pointer", color:"#111", padding:0 }}
          >IN/</button>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ alignItems:"center", gap:24 }}>
            {t.nav.map((label, i) => (
              <button key={label} onClick={() => scrollTo(NAV_HREFS[i])}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"#6B7280", fontWeight:500, padding:0, transition:"color 0.2s" }}
                onMouseEnter={e => e.target.style.color="#111"}
                onMouseLeave={e => e.target.style.color="#6B7280"}
              >{label}</button>
            ))}
          </div>

          {/* Right side: lang toggle + hamburger */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={() => setLang(l => l === "es" ? "en" : "es")}
              style={{ background:"#4F46E5", color:"#fff", border:"none", borderRadius:8, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer", letterSpacing:0.5, transition:"background 0.2s" }}
              onMouseEnter={e => e.target.style.background="#4338CA"}
              onMouseLeave={e => e.target.style.background="#4F46E5"}
            >{t.langBtn}</button>
            <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}
              style={{ background:"none", border:"none", cursor:"pointer", display:"none", flexDirection:"column", gap:5, padding:4 }}
            >
              <span style={{ width:22, height:2, background:"#111", borderRadius:2, display:"block", transition:"all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ width:22, height:2, background:"#111", borderRadius:2, display:"block", transition:"all 0.2s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width:22, height:2, background:"#111", borderRadius:2, display:"block", transition:"all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ borderTop:"1px solid #F3F4F6", padding:"8px 24px 16px" }}>
            {t.nav.map((label, i) => (
              <button key={label} onClick={() => scrollTo(NAV_HREFS[i])}
                style={{ display:"block", width:"100%", background:"none", border:"none", cursor:"pointer", fontSize:15, color:"#374151", fontWeight:500, padding:"10px 0", textAlign:"left", borderBottom:"1px solid #F9FAFB" }}
              >{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="section" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"120px 32px 80px", background:"linear-gradient(160deg, #fff 0%, #F5F3FF 60%, #EEF2FF 100%)" }}>
        <div className="hero-inner" style={{ maxWidth:1100, margin:"0 auto", width:"100%" }}>
          <div className="hero-text">
            <p style={{ fontSize:13, color:"#4F46E5", fontWeight:600, letterSpacing:2, marginBottom:16, textTransform:"uppercase" }}>{t.heroRole}</p>
            <h1 style={{ fontSize:"clamp(2.2rem,6vw,4rem)", fontWeight:800, color:"#111", lineHeight:1.1, margin:"0 0 24px", letterSpacing:-2 }}>
              Iker Navas<br />García.
            </h1>
            <p style={{ fontSize:15, color:"#6B7280", lineHeight:1.7, marginBottom:32, maxWidth:480 }}>{t.heroDesc}</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button onClick={() => scrollTo("#contact")}
                style={{ background:"#4F46E5", color:"#fff", border:"none", padding:"12px 24px", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer" }}
                onMouseEnter={e => e.target.style.background="#4338CA"} onMouseLeave={e => e.target.style.background="#4F46E5"}
              >{t.contactBtn}</button>
              <button onClick={() => scrollTo("#skills")}
                style={{ background:"transparent", color:"#4F46E5", border:"1.5px solid #4F46E5", padding:"12px 24px", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer" }}
                onMouseEnter={e => { e.target.style.background="#4F46E5"; e.target.style.color="#fff"; }}
                onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#4F46E5"; }}
              >{t.skillsBtn}</button>
            </div>
          </div>
          <div className="hero-card" style={{ background:"#fff", border:"1.5px solid #E5E7EB", borderRadius:20, padding:"28px 28px", boxShadow:"0 8px 32px rgba(79,70,229,0.08)", minWidth:260 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#10B981", flexShrink:0 }} />
              <span style={{ fontSize:13, color:"#6B7280", fontWeight:500 }}>{t.available}</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap" }}>
              {["React","Next.js","Node.js","TypeScript","PHP/Laravel","PostgreSQL","MongoDB","Cisco CCNA","Azure","3CX"].map(tag => <Tag key={tag} label={tag} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="01" label={t.s01label} />
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:800, margin:"0 0 32px", letterSpacing:-1 }}>{t.s01title}</h2>
          <div className="about-grid">
            <p style={{ color:"#555", lineHeight:1.75, fontSize:15 }}>{t.s01body}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {t.stats.map(s => (
                <div key={s.label} style={{ background:"#F9FAFB", borderRadius:14, padding:"24px 20px", border:"1px solid #E5E7EB" }}>
                  <div style={{ fontSize:32, fontWeight:800, color:"#4F46E5", letterSpacing:-1 }}>{s.n}</div>
                  <div style={{ fontSize:13, color:"#6B7280", marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section" style={{ padding:"96px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="02" label={t.s02label} />
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:800, margin:"0 0 40px", letterSpacing:-1 }}>{t.s02title}</h2>
          <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:20 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} style={{ background:"#fff", borderRadius:14, padding:"22px 20px", border:"1px solid #E5E7EB" }}>
                <h3 style={{ margin:"0 0 14px", fontSize:13, fontWeight:700, color:"#4F46E5", textTransform:"uppercase", letterSpacing:1 }}>{cat}</h3>
                <div>{items.map(s => <SkillPill key={s} name={s} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="03" label={t.s03label} />
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:800, margin:"0 0 40px", letterSpacing:-1 }}>{t.s03title}</h2>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {experience.map((e, i) => (
              <div key={i} className="exp-row" style={{ padding:"28px 0", borderBottom: i < experience.length-1 ? "1px solid #F3F4F6" : "none" }}>
                <div className="exp-period" style={{ color:"#9CA3AF", fontSize:13, fontWeight:500, paddingTop:3 }}>{e.period}</div>
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

      {/* ── CERTS ── */}
      <section id="certifications" className="section" style={{ padding:"96px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="04" label={t.s04label} />
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:800, margin:"0 0 28px", letterSpacing:-1 }}>
            {t.s04title} <span style={{ color:"#4F46E5" }}>{CERTS.length}</span>
          </h2>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
            {t.certFilters.map(f => {
              const key = filterMap[f];
              return (
                <button key={f} onClick={() => setCertFilterKey(key)} style={{
                  background: certFilterKey===key ? "#4F46E5" : "#fff",
                  color: certFilterKey===key ? "#fff" : "#6B7280",
                  border: certFilterKey===key ? "1.5px solid #4F46E5" : "1.5px solid #E5E7EB",
                  borderRadius:20, padding:"6px 16px", fontSize:13, fontWeight:500, cursor:"pointer", transition:"all 0.2s",
                }}>{f}</button>
              );
            })}
          </div>
          <div className="cert-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:12 }}>
            {filteredCerts.map((c, i) => {
              const col = ISSUER_COLORS[c.issuer] || { bg:"#F3F4F6", text:"#374151" };
              return (
                <div key={i} style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:12, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start" }}>
                  <span style={{ background:col.bg, color:col.text, fontWeight:700, fontSize:11, padding:"3px 8px", borderRadius:6, minWidth:28, textAlign:"center", marginTop:1, flexShrink:0 }}>{c.issuer}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#111", lineHeight:1.4, marginBottom:4 }}>{c.title[lang]}</div>
                    <div style={{ fontSize:11, color:"#9CA3AF" }}>{c.tag}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="05" label={t.s05label} />
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:800, margin:"0 0 40px", letterSpacing:-1 }}>{t.s05title}</h2>
          <div className="projects-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:24 }}>
            {projects.map(p => <ProjectCard key={p.title} project={p} viewLabel={t.viewProject} badgeLabel={t.badgeNew} />)}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section-sm" style={{ padding:"80px 32px", background:"#F9FAFB" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionLabel number="06" label={t.s06label} />
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:800, margin:"0 0 32px", letterSpacing:-1 }}>{t.s06title}</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {t.edu.map(e => (
              <div key={e.n} className="edu-row" style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:14, padding:"20px 24px" }}>
                <span className="edu-number" style={{ fontSize:28, fontWeight:800, color:"#E5E7EB", fontFamily:"monospace", flexShrink:0 }}>{e.n}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:"#111" }}>{e.title}</div>
                  <div style={{ fontSize:13, color:"#6B7280", marginTop:2 }}>{e.center}</div>
                </div>
                <span style={{ fontSize:13, color:"#9CA3AF", whiteSpace:"nowrap", flexShrink:0 }}>{e.years}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ padding:"96px 32px", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
          <SectionLabel number="07" label={t.s07label} />
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.8rem)", fontWeight:800, margin:"0 0 16px", letterSpacing:-1 }}>{t.s07title}</h2>
          <p style={{ color:"#6B7280", fontSize:16, maxWidth:480, margin:"0 auto 40px" }}>{t.s07desc}</p>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <a href="mailto:ikernavas608@gmail.com" style={{ background:"#4F46E5", color:"#fff", textDecoration:"none", padding:"13px 28px", borderRadius:10, fontWeight:600, fontSize:14 }}>ikernavas608@gmail.com</a>
          </div>
          <div className="contact-links">
            {[{ label:"LinkedIn", url:"https://www.linkedin.com/in/ikernavas/" },{ label:"GitHub", url:"https://github.com/ikernvs-17" },{ label:"Instagram", url:"https://www.instagram.com/ikernvs/" }].map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color:"#6B7280", textDecoration:"none", fontSize:14, fontWeight:500, padding:"8px 20px", borderRadius:8, border:"1px solid #E5E7EB" }}>{l.label}</a>
            ))}
          </div>
          <p style={{ marginTop:24, fontSize:13, color:"#9CA3AF" }}>+34 697 707 494</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid #F3F4F6", padding:"24px 24px", background:"#fff" }}>
        <div className="footer-inner" style={{ maxWidth:1100, margin:"0 auto" }}>
          <span style={{ fontSize:13, color:"#9CA3AF" }}>{t.footer}</span>
          <span style={{ fontSize:13, color:"#9CA3AF" }}>ikernavas608@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}