<section class="flex flex-col gap-6 sm:gap-8">
  <div class="flex flex-col gap-3">
    <h1 class="text-2xl font-semibold text-[color:var(--md-sys-color-on-background)]">
      Eve - demo SSR + navigation fluide
    </h1>
    <p class="text-sm opacity-90">
      Cette page charge instantanement les sections avec le routeur PJAX, sans rechargement complet.
    </p>
  </div>

  <section class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <article class="rounded-xl border border-black/10 bg-white/40 p-5">
      <h2 class="text-base font-semibold">Composant Button</h2>
      <p class="mt-2 text-sm opacity-85">
        Variantes Material Design 3 Expressive, tailles, icones, RTL, toggles et etats.
      </p>
      <div class="mt-4">
        <eve-button href="<?= htmlspecialchars($basePath . '/button.php', ENT_QUOTES, 'UTF-8'); ?>" variant="filled" data-link>
          Ouvrir la page Button
        </eve-button>
      </div>
    </article>
    <article class="rounded-xl border border-black/10 bg-white/40 p-5">
      <h2 class="text-base font-semibold">SEO + Performance</h2>
      <p class="mt-2 text-sm opacity-85">
        Chaque page conserve un fallback SSR complet et des metas dediees pour viser Lighthouse 100.
      </p>
    </article>
    <article class="rounded-xl border border-black/10 bg-white/40 p-5">
      <h2 class="text-base font-semibold">Pack distribution ZIP</h2>
      <p class="mt-2 text-sm opacity-85">
        Telecharge le lot complet de distribution genere a chaque build.
      </p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <eve-button href="<?= htmlspecialchars($basePath . '/download.php?asset=zip', ENT_QUOTES, 'UTF-8'); ?>" variant="filled" download>
          Telecharger le ZIP
        </eve-button>
        <eve-button href="<?= htmlspecialchars($basePath . '/download.php?asset=css', ENT_QUOTES, 'UTF-8'); ?>" variant="outlined" download>
          Telecharger le style CSS
        </eve-button>
        <eve-button href="<?= htmlspecialchars($basePath . '/download.php?asset=js', ENT_QUOTES, 'UTF-8'); ?>" variant="outlined" download>
          Telecharger le script JS
        </eve-button>
      </div>
    </article>
  </section>
</section>
