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
            <div className="service-top">
              <span className="service-idx">0{i + 1}</span>
            </div>
            <h3 className="service-title h-card">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <ul className="service-includes">
              {s.includes.slice(0, 3).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
  // Nos cuentas — speech bubble (forum)
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 4v7H5.17L4 12.17V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z"/></svg>,
  // Te cotizamos — receipt / invoice
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM13 17H7v-2h6v2zm4-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
  // Aprobamos muestras — thumbs up
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>,
  // Producimos — edit / create (pencil)
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
  // Entregamos — package / box
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="m17 7.76-5-2.86-5 2.86v4.68l5 2.86 5-2.86V7.76zM1 6l11-6 11 6v12l-11 6L1 18V6z"/></svg>,
];

function ProcesoResumen() {
  return (
    <section className="section" id="proceso">
      <div className="section-head">
        <Reveal className="eyebrow">Cómo trabajamos</Reveal>
        <Reveal delay={80}>
          <h2 className="h-section">5 pasos.<br/><span style={{ color: "var(--accent)" }}>Sin sorpresas.</span></h2>
        </Reveal>
      </div>
      <div className="proceso-resumen-grid">
        {PROCESO.map((s, i) => (
          <Reveal key={s.num} className="proceso-resumen-step" delay={i * 60}>
            <div className="proceso-resumen-icon">{PROCESO_ICONS[i]}</div>
            <div className="proceso-resumen-title">{s.title}</div>
            <div className="proceso-resumen-desc">{s.desc}</div>
          </Reveal>
        ))}
      </div>
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
