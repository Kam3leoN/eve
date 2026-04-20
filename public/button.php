<?php
declare(strict_types=1);

$fragmentOnly = isset($_GET['fragment']) && $_GET['fragment'] === '1';
$pageTitle = 'Eve Demo - Buttons';
$pageDescription = 'Catalogue complet du composant button avec variantes, tailles, icones, RTL, accessibilite et events.';
$canonicalPath = '/button.php';
$activeNav = 'button';
$pageView = __DIR__ . '/pages/button.php';
$basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/public/button.php')), '/');

if ($fragmentOnly) {
    require $pageView;
    exit;
}

require __DIR__ . '/partials/header.php';
require $pageView;
require __DIR__ . '/partials/footer.php';
