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
        Schema::create('md_ingredients', function (Blueprint $table) {
            $table->id('md_ingredient_id');
            $table->string('name');
            $table->foreignId('md_ingredient_category_id')->on('md_ingredient_categories');
            $table->string('unit')->nullable();
            $table->integer('cost_price')->nullable();
            $table->string('base_unit')->nullable();
            $table->string('barcode')->nullable();
            $table->string('gross_weight')->nullable();
            $table->integer('cost')->nullable();
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
            $table->boolean('is_active');
            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_ingredients');
    }
};
