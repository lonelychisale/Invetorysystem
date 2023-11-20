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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('itemname');
            $table->string('itemcategory');
            $table->string('idnumber');
            $table->string('serialnumber');
            $table->string('price');
            $table->date('itemmanufactureddate');
            $table->string('itemlifespan');
            $table->string('itemstatus');
            $table->string('itempossesionstatus');
            $table->string('branch');
            $table->unsignedBigInteger('createdBy');
            $table->timestamps();

            //defining user foregn key
            $table->foreign('createdBy')->references('id')->on('users')->onDelete('cascade');
        });
    }

  
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
};
