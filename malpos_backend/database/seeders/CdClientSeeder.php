<?php

namespace Database\Seeders;

use App\Models\CdClient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CdClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $clients = [
            [
                'name' => 'Faheem',
                'email' => 'fahim.bilal.ch@gmail.com',
                'address' => 'Lahore',
                'is_active' => '1',
                'country_id' => "pakistan",
                'city_id' => "Lahore",
                'phone_no' => "03040891842",
                'client_role' => "Admin",
                'created_by' => '1',
                'updated_by' => '1',              
            ],
            [
                'name' => 'umar',
                'email' => 'umar@gmail.com',
                'address' => 'Lahore',
                'is_active' => '1',
                'country_id' => "pakistan",
                'city_id' => "Lahore",
                'phone_no' => "03040891842",
                'client_role' => "Admin",
                'created_by' => '1',
                'updated_by' => '1',              
            ],
        ];

        foreach ($clients as $client) {
            CdClient::create($client);
        }
    }
}
