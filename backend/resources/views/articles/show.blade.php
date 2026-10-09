<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{ $article->title }} — Recipes &amp; Blog</title>
  <meta name="description" content="{{ $article->excerpt }}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/home-theme.css">
  <link rel="stylesheet" href="/editorial.css">
  <style>.article-content{white-space:pre-line;max-width:75ch}.article-cover{max-width:100%;max-height:460px;object-fit:cover;margin:1rem 0 2rem}.recipe-columns{display:grid;grid-template-columns:1fr 1.4fr;gap:2rem}.recipe-list{white-space:pre-line}</style>
</head>
<body>
<header class="site-header"><div class="nav-wrap"><a class="brand" href="/index.html">Nutritionist Shemomo</a><nav class="main-nav" aria-label="Main"><ul><li><a href="/index.html">Home</a></li><li><a href="/services.html">Service</a></li><li><a href="/learn.html" aria-current="page">Blogs/Recipes</a></li><li><a href="/shop.html">Shop</a></li></ul></nav></div></header>
<main><section class="page-hero"><div class="container"><p><a href="/learn.html">← Back to Blogs/Recipes</a></p><p class="eyebrow">{{ $article->type === 'recipe' ? 'Recipe' : 'Article' }}@if($article->prep_minutes) · {{ $article->prep_minutes }} min prep @endif @if($article->servings) · Serves {{ $article->servings }}@endif</p><h1>{{ $article->title }}</h1><p class="lead">{{ $article->excerpt }}</p></div></section>
<section><div class="container">@if($article->image_path)<img class="article-cover" src="{{ asset('storage/'.$article->image_path) }}" alt="{{ $article->title }}">@endif
@if($article->type === 'recipe' && ($article->ingredients || $article->method))<div class="recipe-columns"><div>@if($article->ingredients)<h2>Ingredients</h2><div class="recipe-list">{{ $article->ingredients }}</div>@endif @if($article->method)<h2 style="margin-top:2rem">Method</h2><div class="recipe-list">{{ $article->method }}</div>@endif</div><div><h2>About this recipe</h2><div class="article-content">{{ $article->body }}</div></div></div>@else<div class="article-content">{{ $article->body }}</div>@endif
</div></section></main><footer class="site-footer"><div class="container"><p>Nutritionist Shemomo · <a href="/learn.html">Blogs/Recipes</a></p></div></footer></body></html>
