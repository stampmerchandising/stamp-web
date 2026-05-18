// Catálogo — primero categorías, luego productos por categoría

function CatalogoSection({ fam, goCategory }) {

  // Categories overview
  if (!fam) {
    const cats = CATEGORIAS.filter(c => c.id !== "all");
    return (
      <section className="section section--tight">
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
    <section className="section section--tight">
      <div className="cat-crumbs">
        <a href="catalogo.html">Catálogo</a>
        <span className="cat-crumbs-sep">/</span>
        <span>{cat.label}</span>
      </div>
      <div className="cat-grid cat-grid--5">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 18}>
            <a className="cat-card" href={`producto.html?slug=${p.slug}`}>
              <div className="cat-img">
                <Placeholder label={p.imageLabel || p.name.toUpperCase()} />
                {p.hot && <span className="cat-hot">{p.tag || "Top"}</span>}
              </div>
              <div className="cat-body">
                <h3 className="cat-name">{p.name}</h3>
                <span className="cat-moq-pill">{p.moq}<span className="cat-unit"> u</span></span>
              </div>
            </a>
          </Reveal>
        ))}
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
          title={<>{cat.label}</>}
          lede={cat.desc}
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
