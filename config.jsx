// ============================================================================
// config.jsx — Conexión de la web pública con el catálogo del ERP
// ----------------------------------------------------------------------------
// El ERP es el backend del catálogo. Esta web SOLO LEE lo público (nunca ve
// costos, historial ni notas internas). Rellena UNA de las dos opciones:
//
//   OPCIÓN 1 (recomendada) — API pública del ERP: una sola llamada, sin llaves.
//     erpApi: "https://erp.stamp.com.pe"
//
//   OPCIÓN 2 — Lectura directa de Supabase: requiere las dos llaves públicas
//     y las vistas de la migración v89 (web_catalog_products / _categories).
//     supabaseUrl:     "https://<tu-proyecto>.supabase.co"
//     supabaseAnonKey: "<anon key>"   // pública por diseño, solo lectura
//
// Si dejas todo vacío, la web usa el catálogo de demo de data.jsx (fallback).
//
// Nota: este sitio es estático (no Next.js), así que en vez de variables
// NEXT_PUBLIC_* en un .env, la configuración va aquí:
//     NEXT_PUBLIC_ERP_API          -> erpApi
//     NEXT_PUBLIC_SUPABASE_URL     -> supabaseUrl
//     NEXT_PUBLIC_SUPABASE_ANON_KEY-> supabaseAnonKey
// ============================================================================

window.STAMP_CONFIG = {
  // --- Opción 1: API del ERP (recomendada) ---
  erpApi: "",

  // --- Opción 2: Supabase directo (alternativa) ---
  supabaseUrl: "",
  supabaseAnonKey: "",
};
