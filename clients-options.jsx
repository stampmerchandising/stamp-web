/* Client logos — propuestas de presentación */

const CLIENTS_LIST = [
  { name: "NVIDIA",   logo: "assets/clients/NVIDIA.svg",   h: 28 },
  { name: "AMD",      logo: "assets/clients/AMD.svg",      h: 24 },
  { name: "Intel",    logo: "assets/clients/INTEL.svg",    h: 26 },
  { name: "Aorus",    logo: "assets/clients/AORUS.svg",    h: 26 },
  { name: "Moonton",  logo: "assets/clients/MOONTON.svg",  h: 24 },
  { name: "Rivalry",  logo: "assets/clients/RIVALRY.svg",  h: 32 },
  { name: "Yape",     logo: "assets/clients/YAPE.svg",     h: 50 },
  { name: "SPDA",     logo: "assets/clients/SPDA.svg",     h: 32 },
  { name: "PUCP",     logo: "assets/clients/PUCP.svg",     h: 32 },
  { name: "UTP",      logo: "assets/clients/UTP.svg",      h: 30 },
];

/* ──────────────────── OPT A · Marquee infinito (oscuro) ────────────────────
 * Una banda de logos que scrollea infinito. Sin label sobreimpreso.
 * Eyebrow + título por encima como sección normal.
 */
function OptionA() {
  const row = (
    <div className="ol-marquee-track">
      {CLIENTS_LIST.concat(CLIENTS_LIST).map((c, i) => (
        <div className="ol-marquee-item" key={c.name + i}>
          <img src={c.logo} alt={c.name} style={{ height: c.h }} />
        </div>
      ))}
    </div>
  );
  return (
    <section className="ol-a">
      <div className="ol-a-head">
        <div className="ol-eyebrow">→ Algunas marcas que confían</div>
        <h2 className="ol-h">
          Producimos para <em>las marcas</em><br/>
          <span className="ol-muted">que sí van en serio.</span>
        </h2>
      </div>
      <div className="ol-marquee">
        {row}
      </div>
    </section>
  );
}

/* ──────────────────── OPT B · Headline + grid editorial (claro) ────────────────────
 * Lo opuesto a la actual: una sección propia, con un número grande de prueba social
 * a la izquierda y la grilla de logos a la derecha, con divisores.
 */
function OptionB() {
  return (
    <section className="ol-b">
      <div className="ol-b-inner">
        <div className="ol-b-left">
          <div className="ol-eyebrow">→ Confianza ganada</div>
          <div className="ol-b-num">1.200<sup>+</sup></div>
          <div className="ol-b-num-lbl">marcas atendidas<br/>en 8 años de oficio.</div>
          <p className="ol-b-blurb">
            De startups que recién encuentran su voz a corporativos que producen miles de piezas al año — la lista es larga; estos son algunos.
          </p>
        </div>
        <div className="ol-b-right">
          {CLIENTS_LIST.map((c, i) => (
            <div className="ol-b-cell" key={c.name} data-row={Math.floor(i / 3)}>
              <img src={c.logo} alt={c.name} style={{ height: c.h }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── OPT C · Quote case-study + logos satélite (claro) ────────────────────
 * Centrado en credibilidad: un testimonio con cliente destacado, y debajo la fila de logos.
 */
function OptionC() {
  return (
    <section className="ol-c">
      <div className="ol-c-inner">
        <div className="ol-eyebrow">→ Producimos para</div>
        <blockquote className="ol-c-quote">
          “Pedimos 800 welcome kits, en dos semanas. Llegaron a tiempo, sin un solo error.”
        </blockquote>
        <div className="ol-c-cite">
          <span className="ol-c-name">Camila Torres</span>
          <span className="ol-c-role">Talent Lead · Yape</span>
        </div>
        <div className="ol-c-rail">
          {CLIENTS_LIST.map(c => (
            <div className="ol-c-cell" key={c.name}>
              <img src={c.logo} alt={c.name} style={{ height: c.h * 0.85 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── OPT D · Grilla densa con divisores (claro, formal) ────────────────────
 * Más "wall of logos" tipo agency: grilla 5×2 con divisores finos, sin label.
 * Compacto, no compite con nada.
 */
function OptionD() {
  return (
    <section className="ol-d">
      <div className="ol-d-head">
        <div className="ol-eyebrow ol-eyebrow-center">→ Marcas que confían en Stamp</div>
      </div>
      <div className="ol-d-grid">
        {CLIENTS_LIST.map(c => (
          <div className="ol-d-cell" key={c.name}>
            <img src={c.logo} alt={c.name} style={{ height: c.h * 0.95 }} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────── App ──────────────────── */
function App() {
  return (
    <DesignCanvas
      title="Client logos · propuestas"
      subtitle="4 direcciones para sacar los logos del header y darles una sección propia. El más popular en agencias suele ser A o D; B es más editorial si quieres usar la prueba social como gancho."
      defaultZoom={0.6}
    >
      <DCSection id="opts" title="Opciones" subtitle="Cada uno reemplazaría la actual <Trust /> bajo el header.">
        <DCArtboard id="a" label="A · Marquee infinito (oscuro)" width={1440} height={520}>
          <OptionA />
        </DCArtboard>
        <DCArtboard id="b" label="B · Headline + grid editorial" width={1440} height={620}>
          <OptionB />
        </DCArtboard>
        <DCArtboard id="c" label="C · Quote + logos satélite" width={1440} height={620}>
          <OptionC />
        </DCArtboard>
        <DCArtboard id="d" label="D · Grilla densa con divisores" width={1440} height={420}>
          <OptionD />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
