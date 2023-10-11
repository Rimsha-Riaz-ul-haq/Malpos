<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GdCountry;
use App\Models\TdCurrency;

use PragmaRX\Countries\Package\Countries;

class TdCurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'country' => 'United States',
                'currency_type' => 'US Dollar',
                'cd_client_id' => 1,
                'cd_brand_id' => 1,
                'cd_branch_id' => 1,
                'is_active' => 1,
                'created_by' => 'John Doe',
                'updated_by' => 'Jane Smith',
                'description' => 'Currency for the United States',
            ],
            [
                'country' => 'Pakistan',
                'currency_type' => 'PKR',
                'cd_client_id' => 1,
                'cd_brand_id' => 1,
                'cd_branch_id' => 1,
                'is_active' => 1,
                'created_by' => 'John Doe',
                'updated_by' => 'Jane Smith',
                'description' => 'Currency for the United States',
            ],
            [
                'country' => 'Saudia Arabia',
                'currency_type' => 'SAR',
                'cd_client_id' => 1,
                'cd_brand_id' => 1,
                'cd_branch_id' => 1,
                'is_active' => 1,
                'created_by' => 'John Doe',
                'updated_by' => 'Jane Smith',
                'description' => 'Currency for the United States',
            ],
            // Add 9 more records with different values here...
        ];

        // Loop through the data array and insert each record into the database
        foreach ($data as $record) {
            TdCurrency::create($record);
        }
    }
}
