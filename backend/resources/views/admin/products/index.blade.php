@extends('layouts.admin')
@section('title', 'Products')
@section('content')
<div class="row"><div><p class="muted">YOUR CATALOG</p><h1>Products</h1><p>Add and update the items shown in your shop.</p></div><a class="button" href="{{ route('admin.products.create') }}">+ Add product</a></div>
<section class="panel"><table><thead><tr><th>Product</th><th>Price</th><th>Availability</th><th>Status</th><th></th></tr></thead><tbody>
@forelse($products as $product)<tr><td><div class="row" style="justify-content:flex-start">@if($product->image_path)<img class="thumb" src="{{ asset('storage/'.$product->image_path) }}" alt="">@endif<strong>{{ $product->name }}</strong></div></td><td>KSh {{ number_format($product->price_kes) }}</td><td>{{ $product->stock_quantity > 0 ? 'In stock' : 'Out of stock' }}</td><td>{{ $product->is_active ? 'Visible' : 'Hidden' }}</td><td><div class="actions"><a class="button subtle" href="{{ route('admin.products.edit', $product) }}">Edit</a><form class="inline" method="post" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Remove this product?')">@csrf @method('DELETE')<button class="button subtle danger" type="submit">Remove</button></form></div></td></tr>
@empty<tr><td colspan="5">No products yet. Add your first product to begin.</td></tr>@endforelse
</tbody></table>{{ $products->links() }}</section>
@endsection
