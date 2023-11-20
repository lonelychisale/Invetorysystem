<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    
    public function up()
    {
        Schema::create('view_report_responses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('report_response_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('report_response_id')->references('id')->on('report_responses');
            $table->foreign('user_id')->references('id')->on('users');

            // Add unique constraint to ensure a user can only view a report response once
            $table->unique(['report_response_id', 'user_id']);

           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('view_report_responses');
    }
};
