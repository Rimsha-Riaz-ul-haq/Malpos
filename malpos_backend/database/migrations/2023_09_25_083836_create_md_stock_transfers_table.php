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
        Schema::create('md_stock_transfers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');

            $table->timestamp("operation_time");
            $table->string('reason')->nullable();

            $table->foreignId('md_from_storage_id')->on('md_storages');
            $table->foreignId('md_to_storage_id')->on('md_storages');
            
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('md_stock_transfers');
    }
};
