// Proceso — 5 pasos en detalle + FAQ

function ProcesoDetalle() {
  return (
    <section className="section">
      <div className="proceso-detail-rail">
        {PROCESO.map((s, i) => (
          <Reveal key={s.num} className="proceso-detail-step" delay={i * 50}>
            <div className="pd-num">{s.num}</div>
            <div>
              <h3 className="pd-title">{s.title}</h3>
              <p className="pd-desc">{s.desc}</p>
            </div>
            <p className="pd-detail">{s.detail}</p>
            <div className="pd-time">{s.time}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcesoApp() {
  return (
    <div className="app">
      <Nav />
      <PageHero
        eyebrow="Proceso · 5 pasos · 0 sorpresas"
        title={<>Un proceso <em>aburrido</em>.<br/>Y eso es lo que quieres.</>}
        lede="Te decimos qué pasa en cada paso, qué tienes que aprobar tú y qué resolvemos nosotros. Nada de promesas vacías, nada de plazos en cuento."
      />
      <ProcesoDetalle />
      <FAQ />
      <CTAStrip
        title={<>¿Te quedó alguna duda?<br/><em>Pregúntanos directo.</em></>}
      />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ProcesoApp />);
