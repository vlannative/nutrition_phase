<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'price_kes', 'image_path', 'category', 'is_active', 'stock_quantity'];
    protected function casts(): array
    {
        return ['price_kes' => 'integer', 'is_active' => 'boolean', 'stock_quantity' => 'integer'];
    }
}
