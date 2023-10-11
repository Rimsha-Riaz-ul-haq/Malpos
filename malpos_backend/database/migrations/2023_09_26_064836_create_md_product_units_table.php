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
        Schema::create('md_product_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands')->nullable();
            $table->foreignId('cd_branch_id')->on('cd_branchs')->nullable();

            $table->foreignId('md_product_id')->on('md_products');
            $table->enum("type",["unit"])->default("unit");
            $table->foreignId('md_uom_id')->on('md_unit_of_measurements')->nullable();
            // $table->foreignId('md_uom_conversion_id')->on('md_unit_of_measurements')->nullable();

            $table->boolean("is_deleted")->default(0);
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
        Schema::dropIfExists('md_product_units');
    }
};
