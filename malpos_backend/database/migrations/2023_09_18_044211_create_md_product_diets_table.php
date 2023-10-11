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
        Schema::create('md_product_diets', function (Blueprint $table) {
            $table->id('md_product_diet_id');
            $table->foreignId('md_diet_id')->on('md_product_diets');
            $table->foreignId('md_product_id')->on('md_products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_product_diets');
    }
};
