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
        Schema::create('md_stock_transfer_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('md_stock_transfer_id')->on('md_stock_transfers');
            $table->foreignId('md_product_id')->on('md_products');
            $table->bigInteger('uom_id');
            $table->enum("uom_type",["base_unit","conversion"])->default("base_unit");
            $table->double("qty");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_stock_transfer_lines');
    }
};
