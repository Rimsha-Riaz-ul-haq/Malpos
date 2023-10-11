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
        Schema::create('md_products', function (Blueprint $table) {
            $table->id('md_product_id');
            $table->string('product_code');
            $table->string('product_name');
            $table->string('product_price');
            $table->string('product_image')->nullable();
            $table->string('deleting_method')->nullable();
            $table->string('total_weight')->nullable();
            $table->string('barcode')->nullable();
            $table->string('maximun_day_of_product_return')->nullable();
            $table->string('cooking_time')->nullable();
            $table->string('description')->nullable();
            // $table->foreignId('md_allergy_id')->on('md_allergies')->nullable();
            // $table->foreignId('md_diet_id')->on('md_diets')->nullable();
            $table->boolean('gift')->nullable();
            $table->boolean('portion')->nullable();
            $table->boolean('not_allow_apply_discount')->nullable();
            $table->boolean('sold_by_weight')->nullable();
            $table->boolean('ignore_service_charges')->nullable();
            $table->boolean('bundle')->nullable();
            $table->string('sale_price')->nullable();
            // $table->foreignId('md_product_category_id')->on('md_product_categories');
            $table->integer('td_tax_category_id')->nullable();
            $table->foreignId('cd_client_id')->on('cd_clients');
            // $table->foreignId('cd_brand_id')->on('cd_brands');
            // $table->foreignId('cd_branch_id')->on('cd_branchs');
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
        Schema::dropIfExists('md_products');
    }
};
