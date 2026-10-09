<?php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductFeedController extends Controller
{
    public function __invoke()
    {
        return response()->json(Product::query()->where('is_active', true)->orderBy('name')->get(['id', 'name', 'slug', 'description', 'price_kes', 'image_path', 'category', 'stock_quantity'])->map(function (Product $product): array {
            $data = $product->toArray();
            $data['is_in_stock'] = $product->stock_quantity > 0;
            unset($data['stock_quantity']);
            return [...$data, 'image_url' => $product->image_path ? asset('storage/'.$product->image_path) : null];
        }))->header('Cache-Control', 'public, max-age=60');
    }
}
