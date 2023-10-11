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
        Schema::create('md_product_details', function (Blueprint $table) {
            $table->id('md_product_detail_id');
            $table->foreignId('md_product_id')->on('md_products');
            $table->integer('md_detail_id');
            $table->string('product_type')->nullable();
            $table->string('gross')->nullable();
            $table->string('cost')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_product_details');
    }
};
