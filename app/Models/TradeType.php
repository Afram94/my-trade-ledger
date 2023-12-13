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

    public function calculateWithCompoundingInterest($trade)
    {
        // Implement compounding interest calculation logic here
        // Example:
        $capital = $this->initial_capital;
        $changeAmount = $capital * ($trade->percentage / 100);
        return $capital + $changeAmount;
    }

    public function calculateWithoutCompoundingInterest($trade)
    {
        // Implement non-compounding interest calculation logic here
        // Example:
        $changeAmount = $this->initial_capital * ($trade->percentage / 100);
        return $this->initial_capital + $changeAmount;
    }
}
