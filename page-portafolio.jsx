// Portafolio — todos los casos

function PortafolioGrid() {
  return (
    <section className="section section--tight">
      <div className="port-grid">
        {CASOS.map((c, i) => (
          <Reveal key={c.client + c.title} className={"port-card" + (c.size === "big" ? " port-card--big" : "")} delay={i * 30}>
            <div className="port-img">
              <Placeholder label={c.label} />
            </div>
            <div className="port-body">
              <div className="port-meta">
                <span className="port-cat">{c.cat}</span>
                <span className="port-client">{c.client}</span>
              </div>
              <h3 className="port-title">{c.title}</h3>
              <p className="port-desc">{c.desc}</p>
              <div className="port-stats">
                {c.stats.map(s => (
                  <div className="port-stat" key={s.lbl}>
                    <div className="num">{s.num}</div>
                    <div className="lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PortafolioApp() {
  return (
    <div className="app">
      <Nav />
      <PageHero
        eyebrow="Portafolio · 6 trabajos destacados"
        title={<>Producciones reales,<br/><em>números reales.</em></>}
        lede="Una muestra de los últimos lotes que salieron de nuestros talleres. Si tu marca es próxima, estás cerca."
      />
      <PortafolioGrid />
      <CTAStrip />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PortafolioApp />);
