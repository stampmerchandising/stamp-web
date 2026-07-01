// Catálogo — primero categorías, luego productos por categoría.
// Los datos vienen del ERP (catalog-source.jsx); si no hay config, del demo local.

function CatCTA() {
  return (
    <div className="cat-cta">
      <div>
        <div className="cat-cta-eyebrow">¿No lo encuentras en el catálogo?</div>
        <h3 className="cat-cta-title">Lo que necesitas<br/><em>está aquí. Pregúntanos.</em></h3>
        <p className="cat-cta-desc">El catálogo es solo una muestra. Cuéntanos qué buscas y lo resolvemos.</p>
      </div>
    </div>
  );
}

function CatalogStatus({ title, desc, children }) {
  return (
    <section className="section section--tight">
      <div className="catalog-status">
        <h3 className="catalog-status-title">{title}</h3>
        {desc && <p className="catalog-status-desc">{desc}</p>}
        {children}
      </div>
    </section>
  );
}

function CatalogSkeleton() {
  return (
    <section className="section section--tight">
      <div className="cats-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="cat-tile cat-tile--skeleton" aria-hidden="true">
            <div className="cat-tile-img skeleton" />
            <div className="cat-tile-meta">
              <span className="skeleton-line" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CatalogoSection({ fam, goCategory, categorias, productos }) {

  // Vista general de categorías
  if (!fam) {
    const cats = categorias.filter(c => c.id !== "all");
    if (!cats.length) {
      return (
        <CatalogStatus
          title="Catálogo en preparación"
          desc="Estamos publicando los productos. Mientras tanto, escríbenos y te enviamos lo que buscas.">
          <a href={`https://wa.me/51981423207?text=${encodeURIComponent("Hola, quisiera ver el catálogo")}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Escríbenos por WhatsApp
            <span className="btn-arrow"><ArrowIcon /></span>
          </a>
        </CatalogStatus>
      );
    }
    return (
      <section className="section section--tight">
        <div className="cats-grid">
          {cats.map((c, i) => {
            const items = productos.filter(p => p.fam === c.id);
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
                    <CatalogImg
                      src={c.image || (cover && cover.image)}
                      label={cover ? (cover.imageLabel || cover.name) : c.label}
                    />
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

        <CatCTA />
      </section>
    );
  }

  // Productos de la categoría seleccionada
  const cat = categorias.find(c => c.id === fam);
  const filtered = productos.filter(p => p.fam === fam);

  return (
    <section className="section section--tight">
      <div className="cat-crumbs">
        <a href="catalogo.html">Catálogo</a>
        <span className="cat-crumbs-sep">/</span>
        <span>{cat ? cat.label : ""}</span>
      </div>
      {filtered.length ? (
        <div className="cat-grid cat-grid--5">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 18}>
              <a className="cat-card" href={`producto.html?slug=${p.slug}`}>
                <div className="cat-img">
                  <CatalogImg src={p.image} label={p.imageLabel || p.name.toUpperCase()} />
                  {p.hot && <span className="cat-hot">{p.tag || "Top"}</span>}
                </div>
                <div className="cat-body">
                  <h3 className="cat-name">{p.name}</h3>
                  {p.moq != null && <span className="cat-moq-pill">{p.moq}<span className="cat-unit"> u</span></span>}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="catalog-status-desc" style={{ marginTop: 8 }}>
          Aún no hay productos publicados en esta categoría. Escríbenos y te ayudamos.
        </p>
      )}

      <CatCTA />
    </section>
  );
}

function CatalogoApp() {
  const { loading, error, categorias, productos } = useCatalog();

  const readHash = React.useCallback(() => {
    if (typeof window === "undefined") return null;
    const h = (window.location.hash || "").replace(/^#/, "");
    if (!h) return null;
    return categorias.find(c => c.id === h && c.id !== "all") ? h : null;
  }, [categorias]);

  const [fam, setFam] = React.useState(null);

  React.useEffect(() => {
    setFam(readHash());
    const onHash = () => setFam(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [readHash]);

  const goCategory = (id) => {
    setFam(id);
    if (id) history.replaceState(null, "", "#" + id);
    else history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cat = fam ? categorias.find(c => c.id === fam) : null;

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

      {loading ? (
        <CatalogSkeleton />
      ) : error ? (
        <CatalogStatus
          title="No pudimos cargar el catálogo"
          desc="Hubo un problema al conectar con el catálogo. Vuelve a intentarlo o escríbenos y te ayudamos al toque.">
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            Reintentar
            <span className="btn-arrow"><ArrowIcon /></span>
          </button>
        </CatalogStatus>
      ) : (
        <CatalogoSection fam={fam} goCategory={goCategory} categorias={categorias} productos={productos} />
      )}

      <CTAStrip />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CatalogoApp />);
