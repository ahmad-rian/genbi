<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;  // Tambahkan import ini
use Inertia\Response;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::latest()->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'min:8'],
            'type' => ['required', 'string', 'in:admin,operator,user'],
            'is_active' => ['required', 'boolean'],
        ]);

        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'type' => $validated['type'],
                'is_active' => $validated['is_active'],
            ]);

            return redirect()->route('admin.users.index')
                ->with('message', 'User created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create user.'])->withInput();
        }
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'type' => ['required', 'string', 'in:admin,operator,user'],
            'is_active' => ['required', 'boolean'],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        try {
            $updateData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'type' => $validated['type'],
                'is_active' => $validated['is_active'],
            ];

            if (!empty($validated['password'])) {
                $updateData['password'] = Hash::make($validated['password']);
            }

            $user->update($updateData);

            return redirect()->route('admin.users.index')
                ->with('message', 'User updated successfully');
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Failed to update user.'])
                ->withInput();
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->route('admin.users.index')
                ->with('message', 'User deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete user.']);
        }
    }
}
