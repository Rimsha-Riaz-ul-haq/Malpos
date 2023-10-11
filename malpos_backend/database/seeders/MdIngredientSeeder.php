<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MdIngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        {
            DB::table('md_ingredients')->insert([
                'name' => 'Ingredient 1',
                'md_ingredient_category_id' => 1, // Replace with the actual category ID
                'unit' => 'Grams',
                'cost_price' => 5,
                'base_unit' => 'Grams',
                'barcode' => '1234567890',
                'gross_weight' => '100g',
                'cost' => 5,
                'cd_client_id' => 1, // Replace with the actual client ID
                'cd_brand_id' => 1,  // Replace with the actual brand ID
                'cd_branch_id' => 1, // Replace with the actual branch ID
                'is_active' => true,
                'created_by' => 'Seeder',
                'updated_by' => 'Seeder',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            DB::table('md_ingredients')->insert([
                'name' => 'Ingredient 2',
                'md_ingredient_category_id' => 2, // Replace with the actual category ID
                'unit' => 'Pieces',
                'cost_price' => 2,
                'base_unit' => 'Pieces',
                'barcode' => '9876543210',
                'gross_weight' => '50g',
                'cost' => 2,
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
