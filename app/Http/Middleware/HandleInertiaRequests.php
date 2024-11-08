<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'type' => $request->user()->type,
                    'is_active' => $request->user()->is_active,
                ] : null,
            ],
            'ziggy' => fn() => [
                'url' => $request->url(),
                'port' => $request->getPort(),
                'defaults' => [],
                'routes' => method_exists(\Illuminate\Support\Facades\Route::class, 'getRoutes')
                    ? collect(\Illuminate\Support\Facades\Route::getRoutes()->getRoutesByName())
                    ->map(function ($route) {
                        return [
                            'uri' => $route->uri(),
                            'methods' => $route->methods(),
                            'parameters' => $route->parameterNames(),
                        ];
                    })
                    ->toArray()
                    : [],
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ]);
    }
}
