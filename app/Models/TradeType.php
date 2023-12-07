<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TradeType extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'initial_capital',
        'uses_compounding_interest',
    ];

    protected $casts = [
        'uses_compounding_interest' => 'boolean',
    ];

    public function trades()
    {
        return $this->hasMany(Trade::class);
    }
}
