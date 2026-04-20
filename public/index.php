<?php
declare(strict_types=1);

$fragmentOnly = isset($_GET['fragment']) && $_GET['fragment'] === '1';
$pageTitle = 'Eve Demo - Accueil';
$pageDescription = 'Demo Eve Material Design 3 Expressive avec navigation fluide sans rechargement.';
$canonicalPath = '/index.php';
$activeNav = 'home';
$pageView = __DIR__ . '/pages/home.php';
$basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/public/index.php')), '/');

if ($fragmentOnly) {
    require $pageView;
    exit;
}

require __DIR__ . '/partials/header.php';
require $pageView;
require __DIR__ . '/partials/footer.php';
