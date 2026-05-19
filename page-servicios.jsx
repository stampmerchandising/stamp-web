// Servicios — los 6 en detalle

function ServiciosDetalle() {
  return (
    <section className="section section--tight">
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} className="service" delay={i * 40}>
            <div className="service-top">
              <span className="service-idx">{"0" + (i + 1)}</span>
              <h3 className="service-title">{s.title}</h3>
            </div>
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
      <CTAStrip />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ServiciosApp />);
