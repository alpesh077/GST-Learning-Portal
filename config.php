<?php
// config.php - Central Database and Environment Configuration

// Support getenv / .env if present
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbName = getenv('DB_NAME') ?: 'gst_portal_db';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASSWORD') ?: (getenv('DB_PASS') ?: '');

if (!defined('DB_HOST')) define('DB_HOST', $dbHost);
if (!defined('DB_NAME')) define('DB_NAME', $dbName);
if (!defined('DB_USER')) define('DB_USER', $dbUser);
if (!defined('DB_PASSWORD')) define('DB_PASSWORD', $dbPass);
?>
