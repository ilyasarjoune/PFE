<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserInternshipsTable extends Migration
{
    public function up()
    {
        Schema::create('user_internships', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('internship_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_internships');
    }
}
