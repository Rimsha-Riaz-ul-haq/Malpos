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
        Schema::create('md_supplies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
            
            $table->string('invoice_no');
            $table->timestamp("operation_time");
            $table->foreignId('md_supplier_id')->on('md_suppliers');
            $table->foreignId('md_storage_id')->on('md_storages');
            $table->enum('status',["approved","draft","deleted"]);

            $table->string('balance')->nullable();
            $table->string('category')->nullable();

            $table->string('description')->nullable();

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
        Schema::dropIfExists('md_supplies');
    }
};
