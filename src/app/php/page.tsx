<?php
// Basic information first (in case phpinfo doesn't work)
header('Content-Type: text/html; charset=UTF-8');
echo "<h1>PHP is working!</h1>";
echo "<p>PHP version: " . phpversion() . "</p>";
echo "<p>Time: " . date('Y-m-d H:i:s') . "</p>";
echo "<p>Request URI: " . ($_SERVER['REQUEST_URI'] ?? 'unknown') . "</p>";
echo "<hr>";

// Then try phpinfo
phpinfo();