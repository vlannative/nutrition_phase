<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleFeedController extends Controller
{
    public function __invoke()
    {
        $articles = Article::query()->where('is_published', true)->whereNotNull('published_at')->latest('published_at')->get();

        return response()->json($articles->map(fn (Article $article): array => [
            'title' => $article->title,
            'slug' => $article->slug,
            'type' => $article->type,
            'excerpt' => $article->excerpt,
            'image_url' => $article->image_path ? asset('storage/'.$article->image_path) : null,
            'prep_minutes' => $article->prep_minutes,
            'servings' => $article->servings,
            'published_at' => $article->published_at?->toDateString(),
            'url' => route('articles.show', $article->slug),
        ]))->header('Cache-Control', 'public, max-age=60');
    }

    public function show(Request $request, Article $article)
    {
        abort_unless($article->is_published && $article->published_at, 404);
        return view('articles.show', compact('article'));
    }
}
