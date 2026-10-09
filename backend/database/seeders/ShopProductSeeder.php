<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ShopProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Moringa soap', 'slug' => 'moringa-soap', 'description' => 'Moringa soap bar. Ask us for the ingredient list and bar size.', 'price_kes' => 350, 'category' => 'body-care'],
            ['name' => 'Beef tallow body butter', 'slug' => 'beef-tallow-body-butter', 'description' => 'A rich body butter made with beef tallow. Ask us for the full ingredients and jar size.', 'price_kes' => 1200, 'category' => 'body-care'],
            ['name' => 'Pure kombucha', 'slug' => 'pure-kombucha', 'description' => 'Our pure kombucha. Ask us about bottle size, ingredients and availability.', 'price_kes' => 350, 'category' => 'kombucha'],
            ['name' => 'Hibiscus kombucha', 'slug' => 'hibiscus-kombucha', 'description' => 'Hibiscus kombucha. Ask us about bottle size, ingredients and availability.', 'price_kes' => 400, 'category' => 'kombucha'],
            ['name' => 'Pure ashwagandha', 'slug' => 'pure-ashwagandha', 'description' => 'Pure ashwagandha. Ask us for the format, ingredients and product details.', 'price_kes' => 1200, 'category' => 'supplement'],
            ['name' => 'SCOBY culture', 'slug' => 'scoby-culture', 'description' => 'A culture for home kombucha brewing. Ask us about what’s included and how to get started.', 'price_kes' => 500, 'category' => 'fermented'],
            ['name' => 'Sauerkraut', 'slug' => 'sauerkraut', 'description' => 'Fermented cabbage. Ask us for the ingredients, jar size and storage details.', 'price_kes' => 600, 'category' => 'fermented'],
            ['name' => 'Beeswax candles', 'slug' => 'beeswax-candles', 'description' => 'Beeswax candles. Ask us about available shapes, sizes and burn time.', 'price_kes' => 800, 'category' => 'home'],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['slug' => $product['slug']],
                [...$product, 'image_path' => null, 'is_active' => true, 'stock_quantity' => 1],
            );
        }
    }
}
