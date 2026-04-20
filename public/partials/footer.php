    </main>
    <footer class="border-t border-black/10 py-6">
      <div class="eve-container text-xs opacity-75">
        Eve demo - navigation fluide avec fallback SSR.
      </div>
    </footer>
    <script defer src="<?= htmlspecialchars($basePath . '/../dist/eve.min.js', ENT_QUOTES, 'UTF-8'); ?>"></script>
    <script defer src="<?= htmlspecialchars($basePath . '/assets/demo-init.js', ENT_QUOTES, 'UTF-8'); ?>"></script>
    <script defer src="<?= htmlspecialchars($basePath . '/assets/router.js', ENT_QUOTES, 'UTF-8'); ?>"></script>
  </body>
</html>
