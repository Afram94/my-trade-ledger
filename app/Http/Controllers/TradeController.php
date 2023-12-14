<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trade;

class TradeController extends Controller
{
    public function index()
    {
        $trades = Trade::all();
        $totalProfitLoss = 0;

        foreach ($trades as $trade) {
            // Assuming calculateProfitLossPercentage returns the percentage profit or loss
            $percentageProfitLoss = $trade->calculateProfitLossPercentage();
            $trade->percentage = $percentageProfitLoss;

            // Reverse-engineering the absolute profit/loss from percentage
            // Profit/Loss = Buy Price * (Percentage / 100)
            $profitLoss = $trade->buy_price * ($percentageProfitLoss / 100);
            $trade->profit_loss = $profitLoss;
            $totalProfitLoss += $profitLoss;
        }

        return inertia('Trading/Show', [
            'auth' => [
                'trade' => $trades,
                'totalProfitLoss' => $totalProfitLoss,
            ]
        ]);
    }

    public function dashboard()
    {
        $trades = Trade::all();
        $totalProfitLoss = 0;

        foreach ($trades as $trade) {
            // Assuming calculateProfitLossPercentage returns the percentage profit or loss
            $percentageProfitLoss = $trade->calculateProfitLossPercentage();
            $trade->percentage = $percentageProfitLoss;

            // Reverse-engineering the absolute profit/loss from percentage
            // Profit/Loss = Buy Price * (Percentage / 100)
            $profitLoss = $trade->buy_price * ($percentageProfitLoss / 100);
            $trade->profit_loss = $profitLoss;
            $totalProfitLoss += $profitLoss;
        }

        return inertia('Dashboard', [
            'auth' => [
                'trade' => $trades,
                'totalProfitLoss' => $totalProfitLoss,
            ]
        ]);
    }





    public function create(Request $request)
    {
        $trade = Trade::create($request->all());
        return response()->json($trade, 201);
    }

}
