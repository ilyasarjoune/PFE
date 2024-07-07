<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('internships', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('company');
        $table->string('location');
        $table->string('date');
        $table->string('domain');
        $table->string('image_url');
        $table->string('link', 500)->unique(); // Increase length to 500 characters or more as needed
        $table->timestamps();
        $table->unique(['title', 'company']);
    });
    
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};
