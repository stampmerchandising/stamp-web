// Sección de testimonios — guardada para uso futuro
// Para reactivarla en la landing, agregar <Testimonios /> en page-landing.jsx
// entre <PortafolioResumen /> y <CTAStrip />

// --- DATA (actualmente en data.jsx) ---
// const TESTIMONIOS = [
//   { quote: "Nos resolvieron los kits de onboarding de un trimestre completo sin que tuviéramos que preocuparnos por nada. Cumplieron cada plazo que nos prometieron, sin sustos.",
//     name: "Anthony Bancho", role: "People Ops · D-LINK Perú", initials: "AB" },
//   { quote: "Un solo proveedor para textil, libretas y empaque. Tres semanas menos de coordinación, y la calidad fue mejor de la que esperaba.",
//     name: "María Sotelo", role: "Marketing · Banco Pichincha", initials: "MS" },
//   { quote: "Avisaron de un cambio de material antes de producir y lo resolvieron sin costo extra. Eso es ser aliado, no proveedor.",
//     name: "Carlos Quintana", role: "Brand · Selvámonos", initials: "CQ" },
// ];

// --- COMPONENTE (actualmente en shared-sections.jsx) ---
// function Testimonios() {
//   return (
//     <section className="section" id="testimonios">
//       <div className="section-head">
//         <Reveal className="eyebrow">Lo que dicen</Reveal>
//         <Reveal as="h2" className="h-section" delay={80}>
//           Marcas que volvieron<br />
//           <span className="muted">a pedirnos un segundo lote.</span>
//         </Reveal>
//       </div>
//       <div className="testi-grid">
//         {TESTIMONIOS.map((t, i) =>
//         <Reveal key={t.name} className="testi" delay={i * 80}>
//             <p className="testi-quote">{t.quote}</p>
//             <div className="testi-author">
//               <div className="testi-avatar">{t.initials}</div>
//               <div>
//                 <div className="testi-name">{t.name}</div>
//                 <div className="testi-role">{t.role}</div>
//               </div>
//             </div>
//           </Reveal>
//         )}
//       </div>
//     </section>
//   );
// }
