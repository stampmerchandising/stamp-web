// Servicios — los 6 en detalle

function ServiciosDetalle() {
  return (
    <section style={{ paddingInline: "var(--pad-x)" }}>
      {SERVICES.map((s, i) => (
        <Reveal key={s.id} className={"service-detail" + (i % 2 === 1 ? " is-alt" : "")} style={{ paddingInline: 0 }} delay={i * 30}>
          <div>
            <div className="sd-idx">0{i + 1} / 0{SERVICES.length}</div>
          </div>
          <div>
            <h2>{s.title}</h2>
            <p className="sd-long">{s.long}</p>
            <div className="prod-tags" style={{ marginTop: 24 }}>
              {s.tags.map(t => <span key={t} className="prod-tag">{t}</span>)}
            </div>
          </div>
          <div>
            <h3 className="sd-includes-h">Qué incluye</h3>
            <ul>{s.includes.map(it => <li key={it}>{it}</li>)}</ul>
          </div>
        </Reveal>
      ))}
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
