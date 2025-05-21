<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Artisan::command('serve-8001', function () {
//     $this->call('serve', [
//         '--host' => '127.0.0.1',
//         '--port' => 8001,
//     ]);
// });
