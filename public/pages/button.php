<div class="flex flex-col gap-8">
  <section class="flex flex-col gap-3">
    <h1 class="text-2xl font-semibold text-[color:var(--md-sys-color-on-background)]">Eve Button - demo complete</h1>
    <p class="text-sm opacity-90">Thème M3 applique sur <code>:root</code> avec navigation sans rechargement.</p>
  </section>
  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold uppercase tracking-wide opacity-80">Common buttons (Expressive - defaut <code class="rounded bg-black/5 px-1">round</code> / pilule)</h2>
    <div class="flex flex-wrap items-center gap-3">
      <eve-button variant="elevated">Elevated</eve-button>
      <eve-button variant="filled">Filled</eve-button>
      <eve-button variant="tonal">Tonal</eve-button>
      <eve-button variant="outlined">Outlined</eve-button>
      <eve-button variant="text">Text</eve-button>
    </div>
  </section>
  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold uppercase tracking-wide opacity-80">Icones - leading & trailing</h2>
    <p class="text-xs opacity-70 max-w-prose">Exemples avec sprite via <code class="rounded bg-black/5 px-1">icon-leading</code> et <code class="rounded bg-black/5 px-1">icon-trailing</code>.</p>
    <div class="flex flex-wrap items-center gap-3">
      <eve-button variant="filled" icon-leading="check">Leading</eve-button>
      <eve-button variant="outlined" icon-trailing="chevron-right">Trailing</eve-button>
      <eve-button variant="tonal" icon-leading="menu" icon-trailing="chevron-right">Leading + trailing</eve-button>
    </div>
  </section>
  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold uppercase tracking-wide opacity-80">Direction LTR / RTL</h2>
    <p class="text-xs opacity-70 max-w-prose">Comparaison propre en 2 colonnes : LTR a gauche et RTL a droite.</p>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="flex flex-col gap-3">
        <p class="text-xs font-medium opacity-80">Lecture gauche vers droite (LTR)</p>
        <div class="flex flex-wrap items-center gap-3">
          <eve-button variant="filled" icon-leading="chevron-right" dir="ltr">Suivant</eve-button>
          <eve-button variant="outlined" dir="ltr">Retour</eve-button>
          <eve-button variant="text" dir="ltr">Texte</eve-button>
        </div>
      </div>
      <div class="flex flex-col gap-3 md:items-end" dir="rtl" lang="ar">
        <p class="text-xs font-medium opacity-80">Lecture droite vers gauche (RTL)</p>
        <div class="flex flex-wrap items-center gap-3 md:justify-end">
          <eve-button variant="filled" icon-leading="chevron-right">التالي</eve-button>
          <eve-button variant="outlined">رجوع</eve-button>
          <eve-button variant="text">نص</eve-button>
        </div>
      </div>
    </div>
  </section>
  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold uppercase tracking-wide opacity-80">Tailles et formes</h2>
    <div class="flex flex-wrap items-center gap-3">
      <eve-button variant="filled" size="extra-small" shape="square">Square XS</eve-button>
      <eve-button variant="filled" shape="square">Square S</eve-button>
      <eve-button variant="filled">Round S</eve-button>
      <eve-button variant="filled" size="large">Round L</eve-button>
    </div>
  </section>
  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold uppercase tracking-wide opacity-80">Lien & etats</h2>
    <div class="flex flex-wrap items-center gap-3">
      <eve-button variant="filled" href="#app" target="_self">Lien filled</eve-button>
      <eve-button variant="outlined" soft-disabled>Soft disabled</eve-button>
      <eve-button variant="tonal" disabled>Desactive</eve-button>
    </div>
  </section>
  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold uppercase tracking-wide opacity-80">Toggle + inversion de forme</h2>
    <div class="flex flex-wrap items-center gap-3">
      <eve-button variant="filled" toggle shape-toggle-swap shape="round">Toggle Round</eve-button>
      <eve-button variant="outlined" toggle shape-toggle-swap shape="square">Toggle Square</eve-button>
    </div>
  </section>
  <section class="flex flex-col gap-3">
    <h2 class="text-sm font-semibold uppercase tracking-wide opacity-80">Events</h2>
    <div class="overflow-x-auto rounded-xl border border-black/10 bg-white/40">
      <table class="w-full min-w-[760px] text-left text-sm">
        <thead class="bg-black/5 text-xs uppercase tracking-wide opacity-80">
          <tr>
            <th class="px-3 py-2">Evenement</th>
            <th class="px-3 py-2">Quand</th>
            <th class="px-3 py-2">Payload</th>
            <th class="px-3 py-2">Options</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-black/10">
          <tr>
            <td class="px-3 py-2"><code>eve-change</code></td>
            <td class="px-3 py-2">Au clic quand <code>toggle</code> bascule <code>pressed</code>.</td>
            <td class="px-3 py-2"><code>event.detail.pressed: boolean</code></td>
            <td class="px-3 py-2"><code>bubbles: true</code>, <code>composed: true</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
