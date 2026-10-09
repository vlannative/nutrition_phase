@extends('layouts.admin')
@section('title', 'Recipes and articles')
@section('content')
<div class="row"><div><p class="muted">PUBLIC CONTENT</p><h1>Recipes &amp; articles</h1><p>Write a recipe or post, save it as a draft, then publish it when ready.</p></div><a class="button" href="{{ route('admin.articles.create') }}">+ New post</a></div>
<section class="panel"><table><thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Updated</th><th></th></tr></thead><tbody>
@forelse($articles as $article)<tr><td><strong>{{ $article->title }}</strong></td><td>{{ $article->type === 'recipe' ? 'Recipe' : 'Article' }}</td><td>{{ $article->is_published ? 'Published' : 'Draft' }}</td><td>{{ $article->updated_at->format('d M Y') }}</td><td><div class="actions"><a class="button subtle" href="{{ route('admin.articles.edit', $article) }}">Edit</a>@if($article->is_published)<a class="button subtle" href="{{ route('articles.show', $article->slug) }}" target="_blank" rel="noopener">View</a>@endif<form class="inline" method="post" action="{{ route('admin.articles.destroy', $article) }}" onsubmit="return confirm('Remove this post?')">@csrf @method('DELETE')<button class="button subtle danger" type="submit">Remove</button></form></div></td></tr>
@empty<tr><td colspan="5">No posts yet. Create your first recipe or article.</td></tr>@endforelse
</tbody></table>{{ $articles->links() }}</section>
@endsection
