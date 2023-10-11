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
        Schema::create('md_product_branches', function (Blueprint $table) {
            $table->id('md_product_branch_id');
            $table->foreignId('cd_branch_id')->on('cd_branches');
            $table->foreignId('md_product_id')->on('md_products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_product_branches');
    }
};
