// Producto — ficha técnica, sin precio, optimizada para SEO

function getProductSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || PRODUCTOS[0].slug;
}

function ProdCarousel({ images }) {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 20000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="prod-img">
      <div className="prod-carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((img, i) => (
          <div key={i} className="prod-carousel-slide">
            <Placeholder label={img} />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="prod-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={"prod-dot" + (i === idx ? " is-on" : "")}
              onClick={() => setIdx(i)}
              aria-label={`Foto ${i + 1}`}
            >
              {i === idx && <span key={idx} className="prod-dot-fill" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
function ProductoPage({ product }) {
  const p = product;
  const cat = getCategoryLabel(p.fam);
  const relacionados = (() => {
    const base = (p.relacionados || []).map(s => getProductBySlug(s)).filter(Boolean);
    if (base.length < 4) {
      const extra = PRODUCTOS.filter(r => r.fam === p.fam && r.slug !== p.slug && !base.find(b => b.slug === r.slug));
      return [...base, ...extra].slice(0, 4);
    }
    return base.slice(0, 4);
  })();

  // Update page title/meta for SEO (client-side; in prod you'd SSR these)
  React.useEffect(() => {
    document.title = "Stamp";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", p.lead);
  }, [p.slug]);

  return (
    <div className="app">
      <Nav />

      <section className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="crumbs">
          <a href="index.html">Inicio</a>
          <span className="sep">/</span>
          <a href="catalogo.html">Catálogo</a>
          <span className="sep">/</span>
          <a href={`catalogo.html#${p.fam}`}>{cat}</a>
          <span className="sep">/</span>
          <span style={{ color: "#fff" }}>{p.name}</span>
        </div>
      </section>

      <div className="prod-grid">
        <ProdCarousel images={p.images || [p.imageLabel]} />
        <div className="prod-info">
          <div className="prod-cat">{cat}{p.tag ? ` · ${p.tag}` : ""}</div>
          <h1 className="prod-title">{p.name}</h1>
          <p className="prod-lead">{p.lead}</p>
          <div className="prod-moq-inline">
            <span className="prod-moq-num">{p.moq}</span>
            <span className="prod-moq-lbl"> u (MOQ)</span>
          </div>
          <div className="prod-cta">
            <a href="#conversemos" className="btn btn-primary">
              Cotizar este producto
              <span className="btn-arrow"><ArrowIcon /></span>
            </a>
            <a href={`https://wa.me/51981423207?text=${encodeURIComponent("Hola, quisiera info sobre " + p.name)}`} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="prod-details">
        <div className="prod-block">
          <div className="prod-block-head">Descripción</div>
          <p className="prod-desc">{p.desc}</p>
        </div>
        <div className="prod-block">
          <div className="prod-block-head">Materiales</div>
          <ul>{p.materials.map(m => <li key={m}>{m}</li>)}</ul>
        </div>
        <div className="prod-block">
          <div className="prod-block-head">Técnicas de personalización</div>
          <ul>{p.tecnicas.map(t => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="prod-block">
          <div className="prod-block-head">Colores disponibles</div>
          <div className="prod-tags">
            {p.colors.map(c => <span key={c} className="prod-tag">{c}</span>)}
          </div>
        </div>
        <div className="prod-block">
          <div className="prod-block-head">Para qué se usa</div>
          <div className="prod-tags">
            {p.usos.map(u => <span key={u} className="prod-tag">{u}</span>)}
          </div>
        </div>
        <div className="prod-block">
          <div className="prod-block-head">Cantidad mínima</div>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>{p.moq} unidades</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Producciones más pequeñas: pregúntanos.</div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="related">
          <div className="related-head">
            <h2 className="h-section" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
              Productos relacionados
            </h2>
            <a href="catalogo.html" className="btn btn-ghost">
              Ver catálogo completo
              <span className="btn-arrow"><ArrowIcon /></span>
            </a>
          </div>
          <div className="cat-grid">
            {relacionados.map(r => (
              <a className="cat-card" key={r.slug} href={`producto.html?slug=${r.slug}`}>
                <div className="cat-img">
                  <Placeholder label={r.imageLabel || r.name.toUpperCase()} />
                  {r.hot && <span className="cat-hot">{r.tag || "Top"}</span>}
                </div>
                <div className="cat-body">
                  <div className="cat-row">
                    <h3 className="cat-name">{r.name}</h3>
                  </div>
                  <div className="cat-foot">
                    <div>
                      <div className="cat-from-lbl">Desde</div>
                      <div className="cat-from-val">{r.moq}<span className="cat-unit"> u (MOQ)</span></div>
                    </div>
                    <div className="cat-moq">Ver ficha</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <CTAStrip />
      <Footer />

      {/* Inline JSON-LD for SEO — Product schema, no offers (no price strategy) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": p.name,
        "description": p.desc,
        "category": cat,
        "brand": { "@type": "Brand", "name": "STAMP" },
        "material": p.materials.join(", "),
        "color": p.colors.join(", "),
        "manufacturer": { "@type": "Organization", "name": "STAMP", "url": "https://stamp.com.pe", "address": { "@type": "PostalAddress", "addressCountry": "PE", "addressLocality": "Lima" } }
      }) }} />
    </div>
  );
}

function ProductoApp() {
  const slug = getProductSlug();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="app">
        <Nav />
        <section className="page-hero">
          <h1>Producto no encontrado</h1>
          <p className="page-hero-lede">
            El producto que buscas no existe o fue movido. Vuelve al catálogo para ver todo lo que tenemos.
          </p>
          <div style={{ marginTop: 32 }}>
            <a href="catalogo.html" className="btn btn-primary">
              Ir al catálogo
              <span className="btn-arrow"><ArrowIcon /></span>
            </a>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return <ProductoPage product={product} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<ProductoApp />);
