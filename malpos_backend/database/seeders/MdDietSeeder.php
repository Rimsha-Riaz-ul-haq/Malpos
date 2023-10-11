<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MdDietSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        {
            DB::table('md_diets')->insert([
                'diet_name' => 'Vegetarian Diet',
                'cd_client_id' => 1, // Replace with the actual client ID
                'cd_brand_id' => 1,  // Replace with the actual brand ID
                'cd_branch_id' => 1, // Replace with the actual branch ID
                'is_active' => true,
                'created_by' => 'Seeder',
                'updated_by' => 'Seeder',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            DB::table('md_diets')->insert([
                'diet_name' => 'Keto Diet',
                'cd_client_id' => 2, // Replace with the actual client ID
                'cd_brand_id' => 2,  // Replace with the actual brand ID
                'cd_branch_id' => 2, // Replace with the actual branch ID
                'is_active' => true,
                'created_by' => 'Seeder',
                'updated_by' => 'Seeder',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
