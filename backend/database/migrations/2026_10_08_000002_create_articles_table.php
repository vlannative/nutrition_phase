<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table): void {
            $table->id(); $table->string('title', 160); $table->string('slug')->unique(); $table->string('type', 16);
            $table->string('excerpt', 320); $table->longText('body'); $table->string('image_path')->nullable();
            $table->unsignedSmallInteger('prep_minutes')->nullable(); $table->unsignedSmallInteger('servings')->nullable();
            $table->longText('ingredients')->nullable(); $table->longText('method')->nullable();
            $table->boolean('is_published')->default(false); $table->timestamp('published_at')->nullable(); $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('articles'); }
};
