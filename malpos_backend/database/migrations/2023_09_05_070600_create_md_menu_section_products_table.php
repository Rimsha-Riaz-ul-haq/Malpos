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
        Schema::create('md_menu_section_products', function (Blueprint $table) {
            $table->id('md_menu_section_product_id');
            $table->foreignId('md_menu_section_id')->on('md_menu_sections');
            $table->foreignId('md_product_id')->on('md_products');
            $table->foreignId('td_currency_id')->on('td_currencies');
            $table->string('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_menu_section_products');
    }
};
