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
        Schema::create('td_sale_orders', function (Blueprint $table) {
            $table->id('td_sale_order_id');
            $table->string('td_sale_order_code')->nullable();
            $table->string('customer')->nullable();
            $table->string('status')->nullable();
            $table->string('src')->nullable();
            $table->string('order_type')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('split_type')->nullable();
            $table->string('table_no')->nullable();
            $table->dateTime('time')->nullable();
            $table->string('discount')->nullable();
            $table->string('card_no')->nullable();
            $table->string('cancel_reason')->nullable();
            $table->string('cancel_comment')->nullable();
            $table->string('card_holder_name')->nullable();
            $table->string('seat_no')->nullable();
            $table->string('parent_order')->nullable();
            $table->string('orgination_station')->nullable();
            $table->foreignId('user_id')->on('users')->nullable();
            $table->string('order_amount')->nullable();
            $table->foreignId('cd_client_id')->on('cd_clients');
            $table->foreignId('cd_brand_id')->on('cd_brands');
            $table->foreignId('cd_branch_id')->on('cd_branchs');
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
        Schema::dropIfExists('td_sale_orders');
    }
};
