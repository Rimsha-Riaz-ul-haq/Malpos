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
        Schema::create('md_preparations', function (Blueprint $table) {
            $table->id('md_preparation_id');
            $table->string('name');
            $table->string('recipe_output')->nullable();
            $table->string('description')->nullable();
            $table->string('deleting_method')->nullable();
            $table->string('total_weight')->nullable();
            $table->integer('total_cost')->nullable();
            $table->foreignId('md_ingredient_category_id')->on('md_ingredient_categories');
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branches');
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
        Schema::dropIfExists('md_preparations');
    }
};
