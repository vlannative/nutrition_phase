@extends('layouts.admin')
@section('title', $article->exists ? 'Edit post' : 'New post')
@section('content')
<p><a href="{{ route('admin.articles.index') }}">← Recipes &amp; articles</a></p><h1>{{ $article->exists ? 'Edit post' : 'Write a post' }}</h1>
@if($errors->any())<div class="errors" role="alert"><strong>Please check these fields:</strong><ul>@foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>@endif
<form class="panel" method="post" enctype="multipart/form-data" action="{{ $article->exists ? route('admin.articles.update', $article) : route('admin.articles.store') }}">@csrf @if($article->exists)@method('PUT')@endif
<div class="field"><label for="title">Title</label><input id="title" name="title" maxlength="160" value="{{ old('title', $article->title) }}" required></div>
<div class="field"><label for="type">Post type</label><select id="type" name="type" required><option value="recipe" @selected(old('type', $article->type)==='recipe')>Recipe</option><option value="article" @selected(old('type', $article->type)==='article')>Blog article</option></select></div>
<div class="field"><label for="excerpt">Short summary</label><textarea id="excerpt" name="excerpt" maxlength="320" required>{{ old('excerpt', $article->excerpt) }}</textarea><span class="hint">Shown on the Recipes/Blog page.</span></div>
<div class="field"><label for="body">Main content</label><textarea id="body" name="body" maxlength="20000" required>{{ old('body', $article->body) }}</textarea><span class="hint">Plain text. Use a blank line between paragraphs. HTML is not accepted.</span></div>
<div class="field"><label for="ingredients">Ingredients (recipes)</label><textarea id="ingredients" name="ingredients">{{ old('ingredients', $article->ingredients) }}</textarea><span class="hint">One ingredient per line. Leave blank for articles.</span></div>
<div class="field"><label for="method">Method / steps (recipes)</label><textarea id="method" name="method">{{ old('method', $article->method) }}</textarea><span class="hint">One step per line. Leave blank for articles.</span></div>
<div class="row"><div class="field" style="flex:1"><label for="prep_minutes">Prep time (minutes)</label><input id="prep_minutes" name="prep_minutes" type="number" min="1" max="1440" value="{{ old('prep_minutes', $article->prep_minutes) }}"></div><div class="field" style="flex:1"><label for="servings">Servings</label><input id="servings" name="servings" type="number" min="1" max="1000" value="{{ old('servings', $article->servings) }}"></div></div>
<div class="field"><label for="image">Cover photo</label><input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp">@if($article->image_path)<span class="hint">Current photo: {{ basename($article->image_path) }}</span>@endif<span class="hint">JPG, PNG or WebP, up to 2 MB.</span></div>
<div class="field"><label><input type="checkbox" name="is_published" value="1" @checked(old('is_published', $article->exists ? $article->is_published : false))> Publish this post</label><span class="hint">Drafts are only visible after you sign in. Published posts appear on the public page.</span></div>
<button class="button" type="submit">{{ $article->exists ? 'Save changes' : 'Save post' }}</button> <a class="button subtle" href="{{ route('admin.articles.index') }}">Cancel</a></form>
@endsection
