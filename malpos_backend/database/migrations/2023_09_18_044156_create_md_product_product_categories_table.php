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
        Schema::create('md_product_product_categories', function (Blueprint $table) {
            $table->id('md_product_product_category_id');
            $table->foreignId('md_product_category_id')->on('md_product_categories');
            $table->foreignId('md_product_id')->on('md_products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_product_product_categories');
    }
};
