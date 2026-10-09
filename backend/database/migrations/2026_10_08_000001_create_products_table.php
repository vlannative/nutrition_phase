<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table): void {
            $table->id(); $table->string('name', 120); $table->string('slug')->unique(); $table->text('description');
            $table->unsignedInteger('price_kes'); $table->string('image_path')->nullable(); $table->string('category', 32);
            $table->boolean('is_active')->default(true); $table->unsignedInteger('stock_quantity')->default(0); $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('products'); }
};
