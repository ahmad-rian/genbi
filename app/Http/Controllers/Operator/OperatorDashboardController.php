<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use Inertia\Response;
use Inertia\Inertia;

class OperatorDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Operator/Dashboard');
    }

    public function reports(): Response
    {
        return Inertia::render('Operator/Reports');
    }
}
