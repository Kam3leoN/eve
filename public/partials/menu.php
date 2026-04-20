<nav class="eve-container flex items-center justify-between gap-3 py-4" aria-label="Navigation principale">
  <eve-button href="<?= htmlspecialchars($basePath . '/index.php', ENT_QUOTES, 'UTF-8'); ?>" variant="text" data-link>
    Eve Demo
  </eve-button>
  <div class="flex items-center gap-2" role="navigation" aria-label="Sections demo">
    <eve-button
      href="<?= htmlspecialchars($basePath . '/index.php', ENT_QUOTES, 'UTF-8'); ?>"
      variant="<?= $activeNav === 'home' ? 'filled' : 'text'; ?>"
      data-link
      <?= $activeNav === 'home' ? 'aria-current="page"' : ''; ?>
    >
      Accueil
    </eve-button>
    <eve-button
      href="<?= htmlspecialchars($basePath . '/button.php', ENT_QUOTES, 'UTF-8'); ?>"
      variant="<?= $activeNav === 'button' ? 'filled' : 'text'; ?>"
      data-link
      <?= $activeNav === 'button' ? 'aria-current="page"' : ''; ?>
    >
      Buttons
    </eve-button>
  </div>
</nav>
