// Shared section primitives used across multiple pages

function Trust() {
  const logos = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
  const row = (
    <div className="trust-track">
      {logos.map((c, i) => (
        <div className="trust-logo" key={c.name + "-" + i} title={c.name}>
          <img src={c.logo} alt={c.name} style={{ height: c.h, width: "auto" }} />
        </div>
      ))}
    </div>
  );

  return (
    <section className="trust">
      <div className="trust-head">
        <Reveal className="eyebrow">→ Algunos clientes</Reveal>
        <Reveal delay={80} className="trust-head-row">
          <h2 className="trust-h">
            Marcas que volvieron<br />
            <span style={{ color: "#fff" }}>a pedirnos un </span><span style={{ color: "var(--accent)" }}>segundo lote.</span>
          </h2>
          <div className="trust-head-cta">
            <a href="portafolio.html" className="btn btn-primary">
              Ver portafolio
              <span className="btn-arrow"><ArrowIcon /></span>
            </a>
          </div>
        </Reveal>
      </div>
      <div className="trust-marquee" aria-hidden="true">
        {row}
      </div>
    </section>
  );
}

function Marquee({ items }) {
  const defaults = [
  "No, no son solo lapiceros",
  "No, no son solo cosas con tu logo",
  "No, no tienes que hablar con tres proveedores",
  "Sí, primero ves la muestra",
  "Sí, hacemos desde cantidades pequeñas"];

  const list = items || defaults;
  const repeated = [...list, ...list, ...list, ...list];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {repeated.map((t, i) =>
          <span className="marquee-item" key={i}>
            {t}
            <span className="marquee-dot" />
          </span>
        )}
      </div>
    </div>);

}

function Testimonios() {
  return (
    <section className="section" id="testimonios">
      <div className="section-head">
        <Reveal className="eyebrow">Lo que dicen</Reveal>
        <Reveal as="h2" className="h-section" delay={80}>
          Marcas que volvieron<br />
          <span className="muted">a pedirnos un segundo lote.</span>
        </Reveal>
      </div>
      <div className="testi-grid">
        {TESTIMONIOS.map((t, i) =>
        <Reveal key={t.name} className="testi" delay={i * 80}>
            <p className="testi-quote">{t.quote}</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>);

}

function FAQ({ items }) {
  const [open, setOpen] = React.useState(0);
  const list = items || FAQS;
  return (
    <section className="section" id="faq">
      <div className="section-head">
        <Reveal className="eyebrow">Dudas frecuentes</Reveal>
        <Reveal as="h2" className="h-section" delay={80}>
          Lo que te preguntas<br />
          <span className="muted">antes de escribirnos.</span>
        </Reveal>
      </div>
      <div className="faq-list">
        {list.map((f, i) =>
        <div key={i} className={"faq-item" + (open === i ? " is-open" : "")}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="ix">0{i + 1}</span>
              <span>{f.q}</span>
              <span className="ic"><PlusIcon /></span>
            </button>
            <div className="faq-a">
              <div>
                <div className="inner">{f.a}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

}

function CopyEmailButton({ email = "hola@stamp.com.pe", className = "btn btn-ghost" }) {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef(null);

  const copy = async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = email;ta.style.position = "fixed";ta.style.opacity = "0";
        document.body.appendChild(ta);ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // last resort: open mailto
      window.location.href = "mailto:" + email;
    }
  };

  return (
    <button
      type="button"
      className={`${className} copy-email${copied ? " is-copied" : ""}`}
      onClick={copy}
      aria-live="polite">
      
      <span className="copy-email-label">{email}</span>
      <span className="copy-email-toast" aria-hidden={!copied}>
        <CheckIcon /> Correo copiado
      </span>
    </button>);

}

function CTAStrip({ title, primary, secondary }) {
  return (
    <section className="section cta-strip" id="conversemos">
      <div className="cta-strip-inner">
        <Reveal as="h2">{title || <>¿Listo para sacarte<br />el merch de la cabeza?<br /><em>Conversemos.</em></>}</Reveal>
        <Reveal delay={120} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href={primary?.href || "https://wa.me/51981423207"} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            {primary?.label || "Escribir por WhatsApp"}
            <span className="btn-arrow"><ArrowIcon /></span>
          </a>
          {secondary?.href ?
          <a href={secondary.href} className="btn btn-ghost">{secondary.label}</a> :
          <CopyEmailButton email={secondary?.label || "hola@stamp.com.pe"} />}
        </Reveal>
      </div>
    </section>);

}

// Generic page hero (for non-landing pages)
function PageHero({ eyebrow, title, lede, crumbs }) {
  return (
    <section className="page-hero">
      {crumbs &&
      <div className="crumbs">
          {crumbs.map((c, i) =>
        <React.Fragment key={i}>
              {c.href ? <a href={c.href}>{c.label}</a> : <span style={{ color: "#fff" }}>{c.label}</span>}
              {i < crumbs.length - 1 && <span className="sep">/</span>}
            </React.Fragment>
        )}
        </div>
      }
      {eyebrow &&
      <div className="page-hero-eyebrow">
          <span className="dot"></span>
          <span>{eyebrow}</span>
        </div>
      }
      <h1>{title}</h1>
      {lede && <p className="page-hero-lede">{lede}</p>}
    </section>);

}

Object.assign(window, { Trust, Marquee, Testimonios, FAQ, CTAStrip, CopyEmailButton, PageHero });