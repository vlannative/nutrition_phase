<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return view('admin.products.index', ['products' => Product::latest()->paginate(20)]);
    }

    public function create()
    {
        return view('admin.products.form', ['product' => new Product()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = Str::slug($data['name']).'-'.Str::lower(Str::random(6));
        $data['is_active'] = $request->boolean('is_active');
        $data['stock_quantity'] = $request->boolean('is_in_stock') ? 1 : 0;
        unset($data['is_in_stock']);
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('products', 'public');
        Product::create($data);
        return redirect()->route('admin.products.index')->with('status', 'Product added.');
    }

    public function edit(Product $product)
    {
        return view('admin.products.form', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $this->validated($request);
        $data['is_active'] = $request->boolean('is_active');
        $data['stock_quantity'] = $request->boolean('is_in_stock') ? max(1, $product->stock_quantity) : 0;
        unset($data['is_in_stock']);
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('products', 'public');
        $product->update($data);
        return redirect()->route('admin.products.index')->with('status', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('status', 'Product removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:2000'],
            'price_kes' => ['required', 'integer', 'min:1', 'max:10000000'],
            'category' => ['required', 'in:kombucha,fermented,body-care,supplement,home'],
            'is_in_stock' => ['required', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);
    }
}
