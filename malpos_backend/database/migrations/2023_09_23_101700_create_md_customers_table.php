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
        Schema::create('md_customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
            $table->foreignId('md_customer_group_id')->on('md_customer_groups')->nullable();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('address')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(1);
            $table->string('country')->nullable();
            $table->enum('gender',['male','female','other'])->nullable();
            $table->date('dob')->nullable();
            $table->string('city')->nullable();
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
        Schema::dropIfExists('md_customers');
    }
};
