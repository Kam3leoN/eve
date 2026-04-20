<?php
declare(strict_types=1);

$asset = $_GET['asset'] ?? '';
$distDir = realpath(__DIR__ . '/../dist');

if ($distDir === false) {
    http_response_code(500);
    exit('Distribution introuvable.');
}

$map = [
    'zip' => ['path' => 'eve-distribution.zip', 'type' => 'application/zip'],
    'css' => ['path' => 'eve.min.css', 'type' => 'text/css; charset=UTF-8'],
    'js' => ['path' => 'eve.min.js', 'type' => 'application/javascript; charset=UTF-8'],
];

if (!isset($map[$asset])) {
    http_response_code(404);
    exit('Asset de telechargement introuvable.');
}

$filePath = realpath($distDir . DIRECTORY_SEPARATOR . $map[$asset]['path']);

if ($filePath === false || !str_starts_with($filePath, $distDir . DIRECTORY_SEPARATOR) || !is_file($filePath)) {
    http_response_code(404);
    exit('Fichier indisponible.');
}

header('Content-Type: ' . $map[$asset]['type']);
header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
header('Content-Length: ' . (string) filesize($filePath));
header('Cache-Control: no-store');
readfile($filePath);
