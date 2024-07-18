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
        Schema::create('offer_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('company')->onDelete('cascade');
            $table->string('title');
            $table->string('location');
            $table->string('company_name');
            $table->date('date');
            $table->foreignId('domaines_id')->constrained()->onDelete('cascade');
            $table->text('description');
            $table->enum('paid', ['yes', 'no']);
            $table->string('duration');
            $table->enum('type', ['PFE', 'OBS', 'FON', 'TEL', 'ALT', 'EMP']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offer_requests');
    }
};
