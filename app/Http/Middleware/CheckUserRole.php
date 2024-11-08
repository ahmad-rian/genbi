<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$types): Response
    {
        $user = $request->user();

        if (!$user || !$user->is_active) {
            return $this->handleUnauthorized($request, 'Account is inactive or unauthorized.');
        }

        if (!in_array($user->type, $types)) {
            return $this->handleUnauthorized($request, 'Unauthorized action.');
        }

        return $next($request);
    }

    /**
     * Handle unauthorized requests.
     */
    private function handleUnauthorized(Request $request, string $message): Response
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => $message], 403);
        }

        return redirect()->route('dashboard')->with('error', $message);
    }
}
