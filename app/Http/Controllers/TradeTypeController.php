<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TradeType;

class TradeTypeController extends Controller
{
    /* public function index()
    {
        $tradeTypes = TradeType::all();

        return inertia('TradingType/Show', [
            'auth' => [
                'trade_type' => $tradeTypes,
            ]
        ]);
    }

    public function getTradingTypeData()
    {
        $tradeTypes = TradeType::all();

        return response()->json($tradeTypes, 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'initial_capital' => 'required|numeric',
            'uses_compounding_interest' => 'required|boolean',
        ]);

        $tradeType = TradeType::create($validatedData);
        return response()->json($tradeType, 201);
    } */
}
