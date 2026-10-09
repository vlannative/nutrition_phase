<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return view('admin.articles.index', ['articles' => Article::latest()->paginate(20)]);
    }

    public function create()
    {
        return view('admin.articles.form', ['article' => new Article()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $this->uniqueSlug($data['title']);
        $data['is_published'] = $request->boolean('is_published');
        $data['published_at'] = $data['is_published'] ? now() : null;
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('articles', 'public');
        Article::create($data);
        return redirect()->route('admin.articles.index')->with('status', 'Content saved.');
    }

    public function edit(Article $article)
    {
        return view('admin.articles.form', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $data = $this->validated($request);
        $data['is_published'] = $request->boolean('is_published');
        $data['published_at'] = $data['is_published'] ? ($article->published_at ?? now()) : null;
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('articles', 'public');
        $article->update($data);
        return redirect()->route('admin.articles.index')->with('status', 'Content updated.');
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('admin.articles.index')->with('status', 'Content removed.');
    }

    private function uniqueSlug(string $title): string
    {
        $base = Str::slug($title) ?: 'post';
        do { $slug = $base.'-'.Str::lower(Str::random(5)); }
        while (Article::where('slug', $slug)->exists());
        return $slug;
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'type' => ['required', 'in:recipe,article'],
            'excerpt' => ['required', 'string', 'max:320'],
            'body' => ['required', 'string', 'max:20000'],
            'ingredients' => ['nullable', 'string', 'max:10000'],
            'method' => ['nullable', 'string', 'max:10000'],
            'prep_minutes' => ['nullable', 'integer', 'min:1', 'max:1440'],
            'servings' => ['nullable', 'integer', 'min:1', 'max:1000'],
            'is_published' => ['nullable', 'boolean'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);
    }
}
