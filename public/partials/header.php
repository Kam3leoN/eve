<?php
declare(strict_types=1);

$pageTitle = $pageTitle ?? 'Eve Demo';
$pageDescription = $pageDescription ?? 'Demo Eve Material Design 3 Expressive.';
$canonicalPath = $canonicalPath ?? '/index.php';
$activeNav = $activeNav ?? 'home';
$basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/public/index.php')), '/');

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$canonicalUrl = $scheme . '://' . $host . $basePath . $canonicalPath;
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8'); ?>" />
    <style>
      html, body { margin: 0; min-height: 100%; }
    </style>
    <link rel="preload" href="<?= htmlspecialchars($basePath . '/../dist/eve.min.css', ENT_QUOTES, 'UTF-8'); ?>" as="style" />
    <link rel="stylesheet" href="<?= htmlspecialchars($basePath . '/../dist/eve.min.css', ENT_QUOTES, 'UTF-8'); ?>" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="<?= htmlspecialchars($basePath . '/../dist/eve.min.css', ENT_QUOTES, 'UTF-8'); ?>" /></noscript>
  </head>
  <body class="min-h-screen text-[color:var(--md-sys-color-on-surface)]">
    <header class="border-b border-black/10 bg-white/70 backdrop-blur">
      <?php require __DIR__ . '/menu.php'; ?>
    </header>
    <main id="app" class="eve-container min-h-screen py-6 sm:py-8" data-page="<?= htmlspecialchars($activeNav, ENT_QUOTES, 'UTF-8'); ?>">
