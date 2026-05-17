// Catálogo — primero categorías, luego productos por categoría

function CatalogoSection({ fam, goCategory }) {

  // Categories overview
  if (!fam) {
    const cats = CATEGORIAS.filter(c => c.id !== "all");
    return (
      <section className="section">
        <div className="cats-grid">
          {cats.map((c, i) => {
            const items = PRODUCTOS.filter(p => p.fam === c.id);
            const cover = items.find(p => p.hot) || items[0];
            return (
              <Reveal key={c.id} delay={i * 40}>
                <button
                  type="button"
                  className="cat-tile"
                  onClick={() => goCategory(c.id)}
                  aria-label={`Ver ${c.label}`}
                >
                  <div className="cat-tile-img">
                    <Placeholder label={cover ? (cover.imageLabel || cover.name) : c.label} />
                  </div>
                  <div className="cat-tile-meta">
                    <h3 className="cat-tile-name">{c.label}</h3>
                    <span className="cat-tile-arrow" aria-hidden="true"><ArrowIcon /></span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div className="cat-cta">
          <div>
            <div className="cat-cta-eyebrow">¿No lo encuentras en el catálogo?</div>
            <h3 className="cat-cta-title">Lo que necesitas<br/><em>está aquí. Pregúntanos.</em></h3>
            <p className="cat-cta-desc">El catálogo es solo una muestra. Cuéntanos qué buscas y lo resolvemos.</p>
          </div>
        </div>
      </section>
    );
  }

  // Products in selected category
  const cat = CATEGORIAS.find(c => c.id === fam);
  const filtered = PRODUCTOS.filter(p => p.fam === fam);

  return (
    <section className="section">
      <div className="cat-grid">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 18}>
            <a className="cat-card" href={`producto.html?slug=${p.slug}`}>
              <div className="cat-img">
                <Placeholder label={p.imageLabel || p.name.toUpperCase()} />
                {p.hot && <span className="cat-hot">{p.tag || "Top"}</span>}
              </div>
              <div className="cat-row">
                <div className="cat-cat">{getCategoryLabel(p.fam)}</div>
                <h3 className="cat-name">{p.name}</h3>
              </div>
              <div className="cat-foot">
                <div>
                  <div className="cat-from-lbl">Desde</div>
                  <div className="cat-from-val">{p.moq}<span className="cat-unit"> u (MOQ)</span></div>
                </div>
                <div className="cat-moq">Ver ficha</div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="cat-cta">
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>¿No ves lo que buscas?</div>
          <p style={{ margin: 0, fontSize: 18, maxWidth: "44ch" }}>
            Tenemos más de 200 productos en catálogo, y producimos a medida. Cuéntanos qué necesitas.
          </p>
        </div>
        <a href="#conversemos" className="btn btn-primary">
          Pedir un producto a medida
          <span className="btn-arrow"><ArrowIcon /></span>
        </a>
      </div>
    </section>
  );
}

function CatalogoApp() {
  const readHash = () => {
    if (typeof window === "undefined") return null;
    const h = (window.location.hash || "").replace(/^#/, "");
    if (!h) return null;
    return CATEGORIAS.find(c => c.id === h && c.id !== "all") ? h : null;
  };

  const [fam, setFam] = React.useState(readHash);

  React.useEffect(() => {
    const onHash = () => setFam(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goCategory = (id) => {
    setFam(id);
    if (id) history.replaceState(null, "", "#" + id);
    else history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cat = fam ? CATEGORIAS.find(c => c.id === fam) : null;
  const filtered = fam ? PRODUCTOS.filter(p => p.fam === fam) : [];

  return (
    <div className="app">
      <Nav />
      {cat ? (
        <PageHero
          eyebrow={`Catálogo · ${filtered.length} productos`}
          title={<>{cat.label}</>}
          crumbs={[
            { href: "catalogo.html", label: "Catálogo" },
            { label: cat.label },
          ]}
        />
      ) : (
        <PageHero
          eyebrow="Catálogo · 200+ productos"
          title={<>Todo lo que puede llevar <em>tu marca</em>.</>}
          lede="Desde el clásico que nunca falla hasta el regalo premium edición limitada. Filtra por familia, entra a cada ficha — sin precios, porque cada producción depende de cantidad, técnica y plazos."
        />
      )}
      <CatalogoSection fam={fam} goCategory={goCategory} />
      <CTAStrip />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CatalogoApp />);
