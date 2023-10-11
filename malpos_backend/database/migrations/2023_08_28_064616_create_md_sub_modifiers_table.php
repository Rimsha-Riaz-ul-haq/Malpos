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
        Schema::create('md_sub_modifiers', function (Blueprint $table) {
            $table->id('md_sub_modifier_id');
            $table->foreignId('md_modifier_id')->on('md_modifiers');
            $table->string('name');
            $table->integer('min');
            $table->integer('max');
            $table->string('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_sub_modifiers');
    }
};
