<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('12345678'),
                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'cd_role_id' => '1',
                'actions' => '1',
                'created_by' => '1',
                'updated_by' => '1',
            ],
            [
                'name' => 'Faheem',
                'email' => 'faheem@gmail.com',
                'password' => Hash::make('12345678'),
                'cd_client_id' => '1',
                'cd_brand_id' => '1',
                'cd_branch_id' => '1',
                'is_active' => '1',
                'cd_role_id' => '1',
                'actions' => '1',
                'created_by' => '1',
                'updated_by' => '1',

            ],
            // Add more users as needed
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}
