<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Station;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Station::query()->latest()->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'station_name' => ['required', 'string', 'max:50'],
            'category' => ['required', 'in:Regular,VIP,Streaming Room'],
            'hourly_rate' => ['required', 'numeric', 'min:0.01', 'max:9999.99'],
        ]);

        $station = Station::create($validated);

        return response()->json(['data' => $station], 201);
    }

    public function show(Station $station): JsonResponse
    {
        return response()->json(['data' => $station]);
    }
}