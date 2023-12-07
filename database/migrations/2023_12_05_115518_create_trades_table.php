<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trade_type_id')->constrained(); // Foreign key to trade_types table
            $table->string('stock_name');
            $table->decimal('buy_price', 8, 2);
            $table->decimal('sell_price', 8, 2)->nullable();
            $table->boolean('status')->default(false); // false for loss, true for profit
            $table->decimal('percentage', 5, 2)->nullable(); // percentage of profit or loss
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trades');
    }
};
