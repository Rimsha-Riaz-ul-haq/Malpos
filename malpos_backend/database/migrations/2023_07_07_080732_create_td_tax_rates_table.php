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
        Schema::create('td_tax_rates', function (Blueprint $table) {
            $table->id('td_tax_rate_id');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
            $table->foreignId('td_tax_category_id')->on('td_tax_categories');
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->string('valid_form');
            $table->string('type');
            $table->string('rate');
            $table->foreignId('gd_country_id')->on('gd_countries');
            $table->foreignId('gd_region_id')->on('gd_regions');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('td_tax_rates');
    }
};
