<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trade;

class TradeController extends Controller
{
    public function index()
    {
        $trades = Trade::all();

        return inertia('Trading/Show', [
            'auth' => [
                'trade' => $trades,
            ]
        ]);
    }

    public function create(Request $request)
    {
        $trade = Trade::create($request->all());
        return response()->json($trade, 201);
    }

}
