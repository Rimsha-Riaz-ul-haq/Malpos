<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MdAllergySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('md_allergies')->insert([
            'allergy_name' => 'Shellfish Allergy',
            'cd_client_id' => 3, // Replace with the actual client ID
            'cd_brand_id' => 3,  // Replace with the actual brand ID
            'cd_branch_id' => 3, // Replace with the actual branch ID
            'is_active' => true,
            'created_by' => 'Seeder',
            'updated_by' => 'Seeder',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('md_allergies')->insert([
            'allergy_name' => 'Dairy Allergy',
            'cd_client_id' => 4, // Replace with the actual client ID
            'cd_brand_id' => 4,  // Replace with the actual brand ID
            'cd_branch_id' => 4, // Replace with the actual branch ID
            'is_active' => true,
            'created_by' => 'Seeder',
            'updated_by' => 'Seeder',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
