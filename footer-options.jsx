/* Footer option variations — all share Stamp's design language (Roboto, accent, dark+light) */

const STAMP_INFO = {
  email: "hola@stamp.com.pe",
  phone: "+51 981 423 207",
  phoneIntl: "51981423207",
  addressLine1: "Calle Manuel Gonzales Olaechea 450",
  addressLine2: "San Isidro — Lima, Perú",
  hoursWeek: "Lun – Vie · 9:30 – 18:30",
  hoursWeekend: "Sábado · 10:00 – 14:00",
  copyright: "© Stamp SAC · 2026",
  social: ["Instagram", "LinkedIn", "Behance"],
};

/* ───────────────────────── OPTION A · Classic dark (current, refined) ───────────────────────── */
function FooterA() {
  return (
    <footer className="fo-a">
      <div className="fo-a-top">
        <div className="fo-a-brand">
          <StampLogo style={{ height: 44, color: "#fff", marginBottom: 28 }} />
          <p className="fo-a-blurb">
            Producción de merch y regalos corporativos en Lima, Perú. Tu aliado para entregar regalos memorables, sin el dolor de cabeza.
          </p>
        </div>
        <div className="fo-col">
          <h4>Soluciones</h4>
          <ul>
            <li><a href="#">Merch corporativo</a></li>
            <li><a href="#">Kits onboarding</a></li>
            <li><a href="#">Regalos ejecutivos</a></li>
            <li><a href="#">Eventos y activaciones</a></li>
            <li><a href="#">Textil y uniformes</a></li>
          </ul>
        </div>
        <div className="fo-col">
          <h4>Compañía</h4>
          <ul>
            <li><a href="#">Cómo trabajamos</a></li>
            <li><a href="#">Portafolio</a></li>
            <li><a href="#">Catálogo</a></li>
          </ul>
        </div>
        <div className="fo-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href={`mailto:${STAMP_INFO.email}`}>{STAMP_INFO.email}</a></li>
            <li><a href={`tel:+${STAMP_INFO.phoneIntl}`}>{STAMP_INFO.phone}</a></li>
            <li>{STAMP_INFO.addressLine1},<br/>{STAMP_INFO.addressLine2}</li>
            <li>{STAMP_INFO.hoursWeek}</li>
            <li>{STAMP_INFO.hoursWeekend}</li>
          </ul>
        </div>
      </div>
      <div className="fo-a-bottom">
        <div>{STAMP_INFO.copyright}</div>
        <div className="fo-a-social">
          {STAMP_INFO.social.map(s => <a key={s} href="#">{s}</a>)}
        </div>
        <div>stamp.com.pe</div>
      </div>
    </footer>
  );
}

/* ───────────────────────── OPTION B · Editorial light, big statement ───────────────────────── */
function FooterB() {
  return (
    <footer className="fo-b">
      <div className="fo-b-statement">
        <div className="fo-b-eyebrow">
          <span className="dot"></span>
          <span>Conversemos</span>
        </div>
        <h2 className="fo-b-head">
          ¿Listo para sacarte<br/>el merch <em>de la cabeza</em>?
        </h2>
        <div className="fo-b-actions">
          <a href={`https://wa.me/${STAMP_INFO.phoneIntl}`} className="fo-b-btn fo-b-btn-primary">
            Escribir por WhatsApp
            <span className="fo-b-arrow">→</span>
          </a>
          <a href={`mailto:${STAMP_INFO.email}`} className="fo-b-btn fo-b-btn-ghost">
            {STAMP_INFO.email}
          </a>
        </div>
      </div>

      <div className="fo-b-info">
        <div className="fo-b-block">
          <div className="fo-b-lbl">Estudio</div>
          <div className="fo-b-val">{STAMP_INFO.addressLine1}<br/>{STAMP_INFO.addressLine2}</div>
        </div>
        <div className="fo-b-block">
          <div className="fo-b-lbl">Atención</div>
          <div className="fo-b-val">{STAMP_INFO.hoursWeek}<br/>{STAMP_INFO.hoursWeekend}</div>
        </div>
        <div className="fo-b-block">
          <div className="fo-b-lbl">Directo</div>
          <div className="fo-b-val">
            <a href={`tel:+${STAMP_INFO.phoneIntl}`}>{STAMP_INFO.phone}</a><br/>
            <a href={`mailto:${STAMP_INFO.email}`}>{STAMP_INFO.email}</a>
          </div>
        </div>
        <div className="fo-b-block">
          <div className="fo-b-lbl">Síguenos</div>
          <div className="fo-b-val">
            {STAMP_INFO.social.map((s, i) => (
              <React.Fragment key={s}>
                <a href="#">{s}</a>{i < STAMP_INFO.social.length - 1 && <br/>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="fo-b-rule"></div>

      <div className="fo-b-bottom">
        <StampLogo style={{ height: 36, color: "#0A0A0A" }} />
        <div className="fo-b-meta">
          <span>{STAMP_INFO.copyright}</span>
          <span className="fo-b-sep">/</span>
          <span>stamp.com.pe</span>
          <span className="fo-b-sep">/</span>
          <span>RUC 20602345678</span>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── OPTION C · Oversized wordmark statement ───────────────────────── */
function FooterC() {
  return (
    <footer className="fo-c">
      <div className="fo-c-top">
        <div className="fo-c-eyebrow">
          <span className="dot"></span>
          <span>Lima · Perú · desde 2017</span>
        </div>
        <div className="fo-c-grid">
          <div className="fo-c-col">
            <div className="fo-c-lbl">Escríbenos</div>
            <a className="fo-c-link" href={`mailto:${STAMP_INFO.email}`}>{STAMP_INFO.email}</a>
            <a className="fo-c-link" href={`tel:+${STAMP_INFO.phoneIntl}`}>{STAMP_INFO.phone}</a>
          </div>
          <div className="fo-c-col">
            <div className="fo-c-lbl">Visítanos</div>
            <div className="fo-c-val">
              {STAMP_INFO.addressLine1}<br/>
              {STAMP_INFO.addressLine2}
            </div>
          </div>
          <div className="fo-c-col">
            <div className="fo-c-lbl">Horario</div>
            <div className="fo-c-val">
              {STAMP_INFO.hoursWeek}<br/>
              {STAMP_INFO.hoursWeekend}
            </div>
          </div>
          <div className="fo-c-col">
            <div className="fo-c-lbl">Navega</div>
            <a className="fo-c-link" href="#">Catálogo</a>
            <a className="fo-c-link" href="#">Servicios</a>
            <a className="fo-c-link" href="#">Proceso</a>
            <a className="fo-c-link" href="#">Portafolio</a>
          </div>
        </div>
      </div>

      <div className="fo-c-mark" aria-hidden="true">
        <StampLogo style={{ height: "100%", width: "100%", color: "#FAFAFA" }} />
      </div>

      <div className="fo-c-bottom">
        <span>{STAMP_INFO.copyright}</span>
        <span className="fo-c-dot">·</span>
        <span>stamp.com.pe</span>
        <span className="fo-c-spacer"></span>
        <div className="fo-c-social">
          {STAMP_INFO.social.map(s => <a key={s} href="#">{s}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── OPTION D · Postal stamp — perforated edge ───────────────────────── */
function FooterD() {
  return (
    <footer className="fo-d">
      <div className="fo-d-perfs" aria-hidden="true"></div>
      <div className="fo-d-inner">
        <div className="fo-d-left">
          <div className="fo-d-postmark" aria-hidden="true">
            <div className="fo-d-postmark-ring"></div>
            <div className="fo-d-postmark-ring fo-d-postmark-ring-inner"></div>
            <div className="fo-d-postmark-txt fo-d-postmark-top">STAMP · LIMA</div>
            <div className="fo-d-postmark-date">2026</div>
            <div className="fo-d-postmark-txt fo-d-postmark-bot">SAN ISIDRO · PE</div>
          </div>
          <StampLogo style={{ height: 60, color: "#0A0A0A", marginTop: 32 }} />
          <div className="fo-d-tag">→ Remitente</div>
          <p className="fo-d-blurb">
            Producción de merch y regalos corporativos.<br/>
            Pensados, producidos y despachados desde Lima.
          </p>
        </div>

        <div className="fo-d-right">
          <div className="fo-d-block">
            <div className="fo-d-lbl">Destinatario</div>
            <div className="fo-d-val fo-d-val-lg">
              Tu próxima campaña<br/>
              <em>de marca.</em>
            </div>
          </div>

          <div className="fo-d-grid">
            <div className="fo-d-block">
              <div className="fo-d-lbl">Correo</div>
              <a className="fo-d-link" href={`mailto:${STAMP_INFO.email}`}>{STAMP_INFO.email}</a>
            </div>
            <div className="fo-d-block">
              <div className="fo-d-lbl">Teléfono</div>
              <a className="fo-d-link" href={`tel:+${STAMP_INFO.phoneIntl}`}>{STAMP_INFO.phone}</a>
            </div>
            <div className="fo-d-block">
              <div className="fo-d-lbl">Dirección</div>
              <div className="fo-d-val">
                {STAMP_INFO.addressLine1}<br/>
                {STAMP_INFO.addressLine2}
              </div>
            </div>
            <div className="fo-d-block">
              <div className="fo-d-lbl">Horario</div>
              <div className="fo-d-val">
                {STAMP_INFO.hoursWeek}<br/>
                {STAMP_INFO.hoursWeekend}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fo-d-bottom">
        <span>{STAMP_INFO.copyright}</span>
        <span className="fo-d-dot">·</span>
        <span>stamp.com.pe</span>
        <span className="fo-d-dot">·</span>
        {STAMP_INFO.social.map((s, i) => (
          <React.Fragment key={s}>
            <a href="#">{s}</a>
            {i < STAMP_INFO.social.length - 1 && <span className="fo-d-dot">·</span>}
          </React.Fragment>
        ))}
      </div>
    </footer>
  );
}

/* ───────────────────────── OPTION E · Compact horizontal strip ───────────────────────── */
function FooterE() {
  return (
    <footer className="fo-e">
      <div className="fo-e-row fo-e-row-main">
        <div className="fo-e-brand">
          <StampLogo style={{ height: 34, color: "#FAFAFA" }} />
          <span className="fo-e-sep" aria-hidden="true"></span>
          <span className="fo-e-tag">Merch corporativo · Lima, Perú</span>
        </div>
        <div className="fo-e-nav">
          <a href="#">Catálogo</a>
          <a href="#">Servicios</a>
          <a href="#">Proceso</a>
          <a href="#">Portafolio</a>
        </div>
      </div>

      <div className="fo-e-row fo-e-row-info">
        <div className="fo-e-info-col">
          <div className="fo-e-k">Correo</div>
          <a className="fo-e-v" href={`mailto:${STAMP_INFO.email}`}>{STAMP_INFO.email}</a>
        </div>
        <div className="fo-e-info-col">
          <div className="fo-e-k">Teléfono</div>
          <a className="fo-e-v" href={`tel:+${STAMP_INFO.phoneIntl}`}>{STAMP_INFO.phone}</a>
        </div>
        <div className="fo-e-info-col">
          <div className="fo-e-k">Estudio</div>
          <div className="fo-e-v">{STAMP_INFO.addressLine1}, {STAMP_INFO.addressLine2}</div>
        </div>
        <div className="fo-e-info-col">
          <div className="fo-e-k">Horario</div>
          <div className="fo-e-v">{STAMP_INFO.hoursWeek} · {STAMP_INFO.hoursWeekend}</div>
        </div>
      </div>

      <div className="fo-e-row fo-e-row-bottom">
        <span>{STAMP_INFO.copyright}</span>
        <div className="fo-e-social">
          {STAMP_INFO.social.map(s => <a key={s} href="#">{s}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── App / Canvas ─────────────────────────────── */
function App() {
  return (
    <DesignCanvas
      title="Footer · opciones para Stamp"
      subtitle="Cinco direcciones — del clásico oscuro al sello postal. Cada uno usa Roboto, los datos correctos y el sistema de color de la web."
      defaultZoom={0.85}
    >
      <DCSection id="dark" title="Dirección oscura">
        <DCArtboard id="a" label="A · Clásico refinado" width={1280} height={520}>
          <FooterA />
        </DCArtboard>
        <DCArtboard id="c" label="C · Wordmark statement" width={1280} height={620}>
          <FooterC />
        </DCArtboard>
        <DCArtboard id="e" label="E · Strip compacto" width={1280} height={300}>
          <FooterE />
        </DCArtboard>
      </DCSection>

      <DCSection id="light" title="Dirección clara">
        <DCArtboard id="b" label="B · Editorial — CTA grande" width={1280} height={680}>
          <FooterB />
        </DCArtboard>
        <DCArtboard id="d" label="D · Sello postal" width={1280} height={700}>
          <FooterD />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
