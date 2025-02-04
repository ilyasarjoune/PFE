<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DomainesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $domaines = [
            ['name' => 'Informatique'],
            ['name' => 'Finance'],
            ['name' => 'Marketing'],
            ['name' => 'Gestion'],
            ['name' => 'Électronique'],
        ];

        DB::table('domaines')->insert($domaines);
    }
}
