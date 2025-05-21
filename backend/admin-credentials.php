<?php

// Include Composer autoloader to load the phpdotenv library
require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables from the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load(); // Load the .env file with environment variables

// Set the response header to JSON to return a JSON response
header('Content-Type: application/json');

// Create an associative array with the admin credentials
$adminCredentials = [
    "username" => $_ENV['ADMIN_USERNAME'],
    "password" => $_ENV['ADMIN_PASSWORD']
];

// Send the credentials as a JSON response
echo json_encode($adminCredentials);
