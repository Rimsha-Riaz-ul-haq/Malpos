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
        Schema::create('td_sale_order_items', function (Blueprint $table) {
            $table->id('td_sale_order_item_id');
            $table->foreignId('td_sale_order_id')->on('td_sale_orders');
            $table->foreignId('md_product_id')->on('md_products');
            $table->string('qty')->nullable();
            $table->string('price')->nullable();
            $table->string('comment')->nullable();
            $table->string('order_item_status')->nullable();
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
            $table->boolean('is_new')->default(true);
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
        Schema::dropIfExists('td_sale_order_items');
    }
};
