@extends('layouts.admin')
@section('title', 'Admin sign in')
@section('content')
<section class="panel login"><p class="muted">PRIVATE PRODUCT MANAGEMENT</p><h1>Sign in</h1><p>Use your shop administrator account.</p>
@if($errors->any())<div class="errors" role="alert">{{ $errors->first() }}</div>@endif
<form method="post" action="{{ route('admin.login.store') }}">@csrf
<div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="username" value="{{ old('email') }}" required autofocus></div>
<div class="field"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required></div>
<button class="button" type="submit">Sign in</button></form></section>
@endsection
