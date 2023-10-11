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
        Schema::create('cd_clients', function (Blueprint $table) {
            $table->id('cd_client_id');
            $table->string('name');
            $table->string('email');
            $table->string('address');
            $table->boolean('is_active');
            $table->string('country_id');
            $table->string('city_id');
            $table->string('phone_no');
            $table->string('client_role');
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
        Schema::dropIfExists('cd_clients');
    }
};
