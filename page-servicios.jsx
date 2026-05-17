// Servicios — los 6 en detalle

function ServiciosDetalle() {
  return (
    <section className="section">
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} className="service" delay={i * 40}>
            <div className="service-tag">{s.tags?.[0] || `0${i + 1} / 0${SERVICES.length}`}</div>
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
    </section>
  );
}

function ServiciosApp() {
  return (
    <div className="app">
      <Nav />
      <PageHero
        eyebrow="Servicios · 6 áreas"
        title={<>No solo vendemos<br/><em>cosas con tu logo.</em></>}
        lede="Cubrimos todo el ciclo: del catálogo a la producción, del armado al despacho. Un solo proveedor, un solo asesor, una sola factura."
      />
      <ServiciosDetalle />
      <Marquee items={[
        "Catálogo curado",
        "Producción end-to-end",
        "Asesor dedicado",
        "Muestras antes de producir",
        "Stock para reposiciones",
        "Despacho a provincia",
      ]} />
      <CTAStrip />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ServiciosApp />);
