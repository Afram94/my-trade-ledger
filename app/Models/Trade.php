<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'initial_capital',
        'stock_name',
        'buy_price',
        'sell_price',
        'status',
        'percentage',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    /* public function tradeType()
    {
        return $this->belongsTo(TradeType::class);
    } */

    public function calculateProfitLoss()
    {
        if ($this->sell_price && $this->buy_price) {
            return ($this->sell_price - $this->buy_price) * $this->initial_capital;
        }

        return 0;
    }

    public function calculateProfitLossPercentage()
    {
        if ($this->buy_price != 0) {
            return (($this->sell_price - $this->buy_price) / $this->buy_price) * 100;
        }

        return 0;
    }

}
