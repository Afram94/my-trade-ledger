<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'trade_type_id',
        'stock_name',
        'buy_price',
        'sell_price',
        'status',
        'percentage',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function tradeType()
    {
        return $this->belongsTo(TradeType::class);
    }
}
