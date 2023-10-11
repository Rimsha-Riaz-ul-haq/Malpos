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
        Schema::create('md_uoms_conversions', function (Blueprint $table) {
            $table->id('md_uoms_conversions_id');
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands')->nullable();
            $table->foreignId('cd_branch_id')->on('cd_branchs')->nullable();

            $table->foreignId('md_uom_id')->on('md_unit_of_measurements');
            $table->string('uom_to_name');
            $table->double('multiply_rate')->nullable();
            $table->double('divide_rate')->nullable();
            
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
        Schema::dropIfExists('md_uoms_conversions');
    }
};
