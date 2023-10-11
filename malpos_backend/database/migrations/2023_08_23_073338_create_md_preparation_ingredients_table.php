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
        Schema::create('md_preparation_ingredients', function (Blueprint $table) {
            $table->id('md_preparation_ingredient_id');
            $table->foreignId('md_ingredient_id')->on('md_ingredients');
            $table->foreignId('md_preparation_id')->on('md_preparations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_preparation_ingredients');
    }
};
