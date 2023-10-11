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
        Schema::create('cd_demo_requests', function (Blueprint $table) {
            $table->id('cd_demo_request_id');
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
            $table->string('request_by');
            $table->string('request_no');
            $table->string('represenetative');
            $table->string('date_of_request');
            $table->string('date_of_completion');
            $table->string('status');
            $table->string('request_types');
            $table->string('city');
            $table->string('country');
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
        Schema::dropIfExists('cd_demo_requests');
    }
};
