// Landing page — slim, summary, anzuelo

const VOICES = {
  editorial: {
    eyebrow: "Merch & regalos corporativos · Lima, Perú",
    title: (<>Tu marca,<br/>en cosas que <em>la gente sí&nbsp;usa</em>.</>),
    lede: "Te asesoramos, producimos y entregamos. Un solo aliado para todo el ciclo — sin tres proveedores, sin idas y venidas, sin sorpresas en los plazos.",
    primary: "Ver catálogo",
    secondary: "Trabajos recientes",
    serviciosTitle: (<>No solo vendemos<br/><span style={{ color: "var(--accent)" }}>cosas con tu logo.</span></>),
    serviciosLede: "Asesoría, producción y logística — todo bajo un mismo techo. Tú decides, nosotros nos ocupamos.",
    portafolioTitle: (<>Producciones reales,<br/><span style={{ color: "var(--accent)" }}>números reales.</span></>),
    cta: (<>¿Listo para sacarte<br/>el merch de la cabeza?<br/><em>Conversemos.</em></>),
  },
  manifiesto: {
    eyebrow: "STAMP · Producción de merch corporativo",
    title: (<>Merch que <em>no&nbsp;termina</em><br/>en la papelera.</>),
    lede: "Te acompañamos desde la idea hasta el despacho. Producimos las cosas con tu marca que tu equipo, tus clientes y tus eventos sí quieren llevarse — y entregamos en la fecha que prometimos.",
    primary: "Empezar un proyecto",
    secondary: "Ver lo que hicimos",
    serviciosTitle: (<>Tres procesos.<br/><span style={{ color: "var(--accent)" }}>Un solo aliado.</span></>),
    serviciosLede: "Pensar contigo, producir bien y entregar a tiempo. Sin intermediarios, sin promesas que no podamos cumplir.",
    portafolioTitle: (<>Producimos para<br/><span style={{ color: "var(--accent)" }}>las marcas que importan.</span></>),
    cta: (<>Tu próximo lote<br/>empieza con un mensaje.<br/><em>Escríbenos.</em></>),
  },
  cercano: {
    eyebrow: "Merch & regalos corporativos · Lima, Perú",
    title: (<>¿Necesitas merch?<br/>Te ayudamos a <em>no&nbsp;equivocarte</em>.</>),
    lede: "Hacemos todo más fácil para ti. Producción end-to-end acorde a tus necesidades.",
    primary: "Mira el catálogo",
    secondary: "Cómo trabajamos",
    serviciosTitle: (<>Asesoría, producción y logística.<br/><span style={{ color: "var(--accent)" }}>Bajo un solo techo.</span></>),
    serviciosLede: "Un asesor dedicado, un solo punto de contacto. Coordinamos lo que haga falta y tomamos las decisiones obvias por ti.",
    portafolioTitle: (<>Marcas que volvieron<br/><span style={{ color: "var(--accent)" }}>a pedirnos un segundo lote.</span></>),
    cta: (<>¿Listo para sacarte<br/>el merch de la cabeza?<br/><em>Conversemos.</em></>),
  },
};

const ACCENTS = {
  naranja:{ color: "#FF7929", ink: "#FFFFFF" },
  rojo:   { color: "#DF201E", ink: "#FFFFFF" },
  morado: { color: "#4C239D", ink: "#FFFFFF" },
  verde:  { color: "#00A651", ink: "#FFFFFF" },
  cobalto:{ color: "#1E40AF", ink: "#FFFFFF" },
};

function LandingHero({ voice }) {
  const v = VOICES[voice] || VOICES.editorial;
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <Reveal delay={80}>
          <h1 className="hero-title">{v.title}</h1>
        </Reveal>

        <Reveal delay={160} className="hero-lede">{v.lede}</Reveal>

        <Reveal delay={240} className="hero-cta">
          <a href="catalogo.html" className="btn btn-primary">
            {v.primary}
            <span className="btn-arrow"><ArrowIcon /></span>
          </a>
          <a href="portafolio.html" className="btn btn-ghost" style={{ color: "#FAFAFA", borderColor: "#2A2A2A" }}>
            {v.secondary}
          </a>
        </Reveal>
      </div>

      <div className="hero-pillars">
        <Reveal className="hero-pillar" delay={0}>
          <span className="hero-pillar-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M24 4 L29.6 18.4 L44 20 L33 30 L36 44 L24 36.4 L12 44 L15 30 L4 20 L18.4 18.4 Z"/>
            </svg>
          </span>
          <p>+5 años de experiencia</p>
        </Reveal>
        <Reveal className="hero-pillar" delay={80}>
          <span className="hero-pillar-icon hero-pillar-icon--mask" aria-hidden="true" style={{
            WebkitMaskImage: "url(assets/peru.svg)",
            maskImage: "url(assets/peru.svg)",
          }}></span>
          <p>Envíos a todo el Perú</p>
        </Reveal>
        <Reveal className="hero-pillar" delay={160}>
          <span className="hero-pillar-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <circle cx="24" cy="15" r="9"/>
              <path d="M8 44 C 8 33.5, 15 28, 24 28 C 33 28, 40 33.5, 40 44 Z"/>
            </svg>
          </span>
          <p>Asesor personalizado</p>
        </Reveal>
        <Reveal className="hero-pillar" delay={240}>
          <span className="hero-pillar-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M10 16 L38 16 L40 44 L8 44 Z M16 16 L16 12 C 16 7, 19 4, 24 4 C 29 4, 32 7, 32 12 L 32 16 L 28 16 L 28 12 C 28 9.5, 26 7.5, 24 7.5 C 22 7.5, 20 9.5, 20 12 L 20 16 Z"/>
            </svg>
          </span>
          <p>Todo en un solo lugar</p>
        </Reveal>
      </div>
    </section>
  );
}

// Servicios resumido — solo 3, link a /servicios
function ServiciosResumen({ voice }) {
  const v = VOICES[voice] || VOICES.editorial;
  const top3 = SERVICES.slice(0, 3);
  return (
    <section className="section" id="servicios">
      <div className="section-head">
        <Reveal className="eyebrow">Lo que hacemos</Reveal>
        <Reveal delay={80} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 className="h-section">{v.serviciosTitle}</h2>
          <p className="lede" style={{ marginTop: 12 }}>{v.serviciosLede}</p>
        </Reveal>
      </div>
      <div className="services-grid">
        {top3.map((s, i) => (
          <Reveal key={s.id} className="service" delay={i * 60}>
            <div className="service-img">
              <Placeholder label={s.title.toUpperCase()} />
            </div>
            <div className="service-body">
              <h3 className="service-title h-card">{s.title}</h3>
              <a href="servicios.html" className="port-more">Ver más <ArrowIcon /></a>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
        <a href="servicios.html" className="btn btn-ghost">
          Ver todos los servicios
          <span className="btn-arrow"><ArrowIcon /></span>
        </a>
      </div>
    </section>
  );
}

// Portafolio resumido — solo 3 destacados, link a /portafolio
function PortafolioResumen({ voice }) {
  const v = VOICES[voice] || VOICES.editorial;
  const top3 = CASOS.slice(0, 3);
  return (
    <section className="section" id="portafolio">
      <div className="section-head">
        <Reveal className="eyebrow">Trabajos recientes</Reveal>
        <Reveal delay={80} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 className="h-section">{v.portafolioTitle}</h2>
        </Reveal>
      </div>

      <div className="port-grid">
        {top3.map((c, i) => (
          <Reveal key={c.client + c.title} className="port-card" delay={i * 40}>
            <div className="port-img">
              <Placeholder label={c.label} />
            </div>
            <div className="port-meta">
              <span className="port-cat">{c.cat}</span>
              <span className="port-client">{c.client}</span>
            </div>
            <h3 className="port-title">{c.title}</h3>
            <div className="port-stats">
              {c.stats.map(s => (
                <div className="port-stat" key={s.lbl}>
                  <div className="num">{s.num}</div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
        <a href="portafolio.html" className="btn btn-ghost">
          Ver portafolio completo
          <span className="btn-arrow"><ArrowIcon /></span>
        </a>
      </div>
    </section>
  );
}

const PROCESO_ICONS = [
  // Nos cuentas — chat bubbles
  <svg viewBox="0 0 383.27 383.27" fill="currentColor"><path fill="white" d="M383.27,232.8l-1.91-3.36-27.24-31.83c15.7-17.83,25.74-38.9,28.4-62.04l.75-3.82v101.05Z"/><path d="M247.78,0l3.78.67c37.98,3.04,75.19,19.06,101.02,47.22,16.32,17.79,27.17,39.49,29.93,63.57l.75,3.82v16.47l-.75,3.82c-2.66,23.14-12.7,44.21-28.4,62.04l27.24,31.83,1.91,3.36v5.99c-1.89,3.58-4.84,8.11-9.81,8.13l-35.22.14c-1.63-72.54-57.58-127.14-124.98-145.92-39.91-11.12-81.63-9.89-121.42,3.21,7.35-38.69,34.44-68.06,68.25-85.78C180.84,7.7,203.21,2,226.08,0h21.71Z"/><path d="M177.37,382.97l-166,.31c-4.86,0-8.43-2.87-10.12-6.28-1.97-3.98-1.67-8.68,1.37-12.16l29.61-33.84C13.71,310.34,2.42,284.84.34,257.18c-4.21-55.84,33.3-102.78,83.04-125.23,42.01-18.97,90.01-20.97,133.66-6.19,38.4,12.99,72.91,40.27,89.26,77.72,12.82,29.36,12.8,62.08-.24,91.34-18.4,41.3-58.98,71.76-102.1,83.42-8.65,2.34-17.05,4.72-26.6,4.74ZM112.28,247.01c0-12.39-10.05-22.44-22.44-22.44s-22.44,10.05-22.44,22.44,10.05,22.44,22.44,22.44,22.44-10.05,22.44-22.44ZM180.39,247.01c0-12.39-10.05-22.44-22.44-22.44s-22.44,10.05-22.44,22.44,10.05,22.44,22.44,22.44,22.44-10.05,22.44-22.44ZM248.51,247.01c0-12.39-10.05-22.44-22.44-22.44s-22.44,10.05-22.44,22.44,10.05,22.44,22.44,22.44,22.44-10.05,22.44-22.44Z"/></svg>,
  // Te cotizamos — document
  <svg viewBox="0 0 291.98 383.23" fill="currentColor"><path d="M255.85,383.23H36.19C15.13,379.83,0,362.89,0,341.22L.03,40.55C.55,19.4,16.05,2.86,37.03.04l138.17-.04v86.81c.63,14.41,11.81,25.27,26.24,25.49h90.54s-.1,230.45-.1,230.45c0,21.1-16.07,37.17-36.03,40.48ZM226.37,172.15c6.92,0,11.05-6.08,10.88-11.53-.18-5.81-4.76-10.89-11.26-10.89H61.5c-6.48,0-11.07,5.1-11.28,10.91-.19,5.33,4.11,11.5,10.55,11.5h165.6ZM226.37,232.03c6.92,0,11.05-6.08,10.88-11.53-.18-5.81-4.76-10.89-11.26-10.89H61.5c-6.48,0-11.07,5.1-11.28,10.91-.19,5.33,4.11,11.5,10.55,11.5h165.6ZM116.41,291.86c6.58,0,10.78-6.09,10.63-11.43-.16-5.66-4.77-10.91-11.01-10.92l-54.62-.02c-6.3,0-11,5.12-11.2,10.89-.19,5.43,4.21,11.47,10.48,11.47h55.72Z"/><path d="M286.72,89.82l-85.28.03c-2.02,0-3.81-1.8-3.8-3.8l.02-81.25c4.45,2.26,7.81,5.09,11.48,8.56l69.48,65.73c3.31,3.24,5.78,6.14,8.1,10.73Z"/></svg>,
  // Aprobamos muestras — verified badge
  <svg viewBox="0 0 330.24 343.48" fill="currentColor"><path d="M184.93,335.45c-10.82,10.71-28.56,10.63-39.15.16l-25.57-25.29-35.05,5.34c-15,2.29-29.72-7.78-32.2-22.88l-5.83-35.43-31.67-16.33c-13.03-6.72-19.47-23.08-12.78-36.29l15.1-29.85c1.05-2.08,1.06-4.34,0-6.44l-14.85-29.23c-7.45-14.67.33-30.97,14.47-38.08l26.93-13.55c1.44-.72,3.1-2.52,3.34-4.11l4.82-31.08c2.39-15.44,16.18-27.13,32.14-24.73l35.63,5.37,24.32-24.28c11.16-11.14,29.21-11.98,40.63-.65l25.11,24.9,35.63-5.34c15.61-2.34,29.52,8.89,31.95,24.12l5.47,34.22,30.29,15.37c14.69,7.46,20.97,24.51,13.34,39.4l-14.47,28.23c-.75,1.47-.78,3.86-.02,5.34l14.28,27.7c7.77,15.07,1.9,32.28-13.17,39.94l-30.22,15.36-5.81,35.37c-2.68,16.28-18.42,25.26-34.27,22.79l-33.02-5.15-25.36,25.1ZM100.51,179.84l37.25,37.26c4.44,4.44,12.01,5.55,16.85.71l75.62-75.47c4.89-4.88,3.44-12.99-.96-16.81-5.25-4.56-12.19-3.87-17.09,1.02l-65.59,65.51-29-28.91c-4.72-4.7-12.09-4.44-16.73.02-4.21,4.05-5.26,11.77-.34,16.68Z"/></svg>,
  // Producimos — merch items
  <svg viewBox="0 0 359.26 358.67" fill="currentColor"><path d="M217.33,187.48c-6.31.02-11.06,4.68-11.71,10.66l-8.85,81.98c-.17,1.54-1.46,2.7-3.01,2.7h-81.16c-.63,0-1.25-.2-1.76-.57-8.85-6.36-18.53-10.7-29.27-13.02-1.38-.3-2.35-1.54-2.35-2.95V10.24c0-1.49,1.08-2.75,2.54-2.99L126.08.07c1.62-.26,3.14.82,3.45,2.43,4.46,22.97,24.47,39.15,47.45,39.05,22.87-.1,42.58-16.47,46.92-39.07.31-1.62,1.83-2.7,3.46-2.44l44.3,7.18c1.47.24,2.54,1.5,2.54,2.99v125.49c0,1.44-1.02,2.67-2.42,2.96-19.15,3.92-32.85,20.39-33.03,39.98l-.05,5.79c-.02,1.66-1.36,3-3.02,3l-18.34.05Z"/><path d="M315.09,87.26c-.78,1.26-1.82,2-3.07,2.34-.61.17-1.27.09-1.86-.14l-39.64-15.91c-1.17-.47-1.94-1.61-1.94-2.88l.05-60.21c0-2.19,2.21-3.69,4.25-2.87l59.51,23.8c1.81.94,2.67,2.73,2.25,4.68l-19.54,51.19Z"/><path d="M42.36,89.8c-2.23.49-3.95-.36-4.84-2.07l-19.36-50.7c-.83-2.18.24-4.63,2.41-5.49L80.52,7.6c1.64-.65,3.42.55,3.42,2.31v63.27s-41.58,16.62-41.58,16.62Z"/><path d="M78.03,335.4l-72.8,19.54c-2.06.55-4.46-.82-4.72-2.84-2.7-21.48,5.46-42.56,20.87-56.65,16.28-14.89,38.46-20.74,60.7-15.4-5.74,17.32-6.21,35.26-4.06,55.34Z"/><path d="M88.33,332.63c-1.42-11.41-1.34-22.19-.34-33.31.94-5.46,2.08-10.53,4.03-15.85,17.09,7.55,29.55,21.16,35.95,38.5l-39.64,10.66Z"/><path d="M168.37,350.36c-1.57,6.15-7.5,9.67-13.66,7.78l-60.06-16.24,39.44-10.72,36.67,9.84-2.38,9.35Z"/><path d="M359.18,345.8l-15.96-147.67-22.53-.28-.1-19.2c-.11-20.76-15.66-37.91-35.92-40.46l-.02,10.55c14.86,2.68,25.63,15.38,25.52,30.65l-.03,18.54h-94s-15.84,146.2-15.84,146.2c-.8,7.39,2.48,14.53,11.24,14.53h136.41c7.12,0,11.98-5.93,11.23-12.86Z"/><path d="M274.16,148.82c-13.71,2.81-23.7,13.79-24.81,27.59l-.16,11.05,25.04-.05-.07-38.59Z"/></svg>,
  // Enviamos — truck
  <svg viewBox="0 0 382.79 271.26" fill="currentColor"><path d="M0,147.51v-63.46s.78-26.66.78-26.66l.57-12.23C2.51,20.39,21.57,2.34,46.18,1.48c56-1.93,111.44-2.04,167.45.05,21.55.8,39.36,14.71,43.68,36.03l34.01.41c18.69.23,36.44,8.7,48.63,23.09,15,17.72,27.48,36.64,38.87,56.84,2.41,4.27,4.02,9.86,3.97,14.61l-.26,23.68c-.13,12.15-.28,24-1.99,36.25-2.49,17.81-15.57,31.89-32.7,36.39-3.74-28.98-28.47-49.3-56.61-48.21-27.66,1.07-50.66,22.89-52.47,51.34l-43.75-.67-53.2.78c-1.72-28.5-24.78-50.56-52.72-51.53s-52.69,19.58-56.25,47.8c-18.56-5.96-30.56-22.24-31.44-41.26l-.61-12.94L0,147.51ZM349.15,112.05c-8.21-12.66-16.39-24.43-25.84-35.83-7.96-9.6-19.34-14.71-31.71-15.8l-32.53-.24.95,67.38,81.66-.03c3.9,0,7-2.71,8.25-5.21,1.7-3.39,1.37-6.95-.78-10.26Z"/><circle cx="87.2" cy="235.28" r="35.94"/><circle cx="293.41" cy="235.32" r="35.94"/></svg>,
];

const PROCESO_BODY = [
  "Cuéntanos qué buscas. Te asesoramos para dar con el producto correcto para tu marca.",
  "Sabrás exactamente qué vas a recibir y cuándo. Sin sorpresas ni letra chica.",
  "Ves un preview de cómo va a quedar antes de producir. Sin tu aprobación, no avanzamos.",
  "Fabricamos cada pieza con el cuidado que tu marca se merece.",
  "En tu oficina, tu evento o tu almacén. Vamos donde nos digas.",
];

function ProcesoResumen() {
  return (
    <section className="section" id="proceso">
      <div className="section-head">
        <Reveal delay={80} style={{ gridColumn: "1 / -1" }}>
          <h2 className="h-section">Tu pedido,<br/><span style={{ color: "var(--accent)" }}>a solo 5 pasos.</span></h2>
        </Reveal>
      </div>
      <Reveal className="proceso-flow">
        {PROCESO.map((s, i) => (
          <div key={s.num} className="proceso-step">
            <div className="proceso-step-icon">{PROCESO_ICONS[i]}</div>
            <div className="proceso-step-title">{s.title}</div>
            <div className="proceso-step-desc">{PROCESO_BODY[i]}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "voz": "cercano",
  "personalidad": "editorial",
  "acento": "morado"
}/*EDITMODE-END*/;

function LandingApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    const accent = ACCENTS[t.acento] || ACCENTS.rojo;
    root.style.setProperty("--accent", accent.color);
    root.style.setProperty("--accent-ink", accent.ink);

    document.body.classList.remove("mood-editorial", "mood-taller", "mood-audaz");
    document.body.classList.add("mood-" + t.personalidad);
  }, [t.acento, t.personalidad]);

  const v = VOICES[t.voz] || VOICES.editorial;

  return (
    <div className="app">
      <Nav />
      <LandingHero voice={t.voz} />
      <Marquee />
      <ProcesoResumen />
      <Trust />
      <ServiciosResumen voice={t.voz} />
      <CTAStrip title={v.cta} />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Voz">
          <TweakRadio
            label="Tono"
            value={t.voz}
            onChange={(val) => setTweak("voz", val)}
            options={[
              { value: "editorial",  label: "Editorial"  },
              { value: "manifiesto", label: "Manifiesto" },
              { value: "cercano",    label: "Cercano"    },
            ]}
          />
        </TweakSection>
        <TweakSection label="Personalidad">
          <TweakRadio
            label="Tratamiento"
            value={t.personalidad}
            onChange={(val) => setTweak("personalidad", val)}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "taller",    label: "Taller"    },
              { value: "audaz",     label: "Audaz"     },
            ]}
          />
        </TweakSection>
        <TweakSection label="Acento">
          <TweakColor
            label="Color"
            value={t.acento}
            onChange={(val) => setTweak("acento", val)}
            options={[
              { value: "naranja", color: ACCENTS.naranja.color },
              { value: "rojo",    color: ACCENTS.rojo.color    },
              { value: "morado",  color: ACCENTS.morado.color  },
              { value: "verde",   color: ACCENTS.verde.color   },
              { value: "cobalto", color: ACCENTS.cobalto.color },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LandingApp />);
