<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('shop:admin', function (): void {
    $email = strtolower(trim($this->ask('Administrator email')));
    if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $this->error('Enter a valid email address.');
        return;
    }

    $password = $this->secret('Administrator password (at least 12 characters)');
    if (strlen((string) $password) < 12) {
        $this->error('Use a password with at least 12 characters.');
        return;
    }

    $user = App\Models\User::updateOrCreate(
        ['email' => $email],
        ['name' => 'Shop administrator', 'password' => Illuminate\Support\Facades\Hash::make($password), 'is_admin' => true],
    );

    $this->info("Administrator account ready for {$user->email}.");
})->purpose('Create or reset the private shop administrator account');
