<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'slug', 'type', 'excerpt', 'body', 'image_path',
        'prep_minutes', 'servings', 'ingredients', 'method', 'is_published', 'published_at',
    ];

    protected function casts(): array
    {
        return ['prep_minutes' => 'integer', 'servings' => 'integer', 'is_published' => 'boolean', 'published_at' => 'datetime'];
    }
}
