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
        Schema::create('md_supplies_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('md_supply_id')->on('md_supplies');
            $table->foreignId('md_product_id')->on('md_products');
            $table->bigInteger('uom_id');
            $table->enum("uom_type",["base_unit","conversion"])->default("base_unit");
            $table->double("qty");
            // $table->string("unit")->nullable();
            $table->double("cost");
            $table->double("avg_cost")->nullable();
            $table->double("line_amount");
            $table->double("discount_percent")->nullable();
            $table->double("tax")->nullable();
            $table->double("total");
            $table->boolean("is_deleted")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_supply_lines');
    }
};
