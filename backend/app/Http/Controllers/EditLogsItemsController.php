<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EditItemsLogs;
use Illuminate\Http\Request;

class EditLogsItemsController extends Controller
{
    public function store(Request $request){
    $validatedData = $request->validate([
        'user_id' => 'required|integer', // Make sure user_id is provided and is an integer
        'edited_item_id' => 'required|integer', // Make sure request_id is provided and is an integer
        'category' => 'required|string', // Make sure message is provided and is a string
    ]);

    // Create a new request response
    $response = new EditItemsLogs();
    $response->user_id = $validatedData['user_id'];
    $response->edited_item_id = $validatedData['edited_item_id'];
    $response->category = $validatedData['category'];
    $response->save();

    return response()->json(['message' => 'edited item logs created successfully']);
}

public function show()
{
    $editeditemlogs = EditItemsLogs::with('editinguser','editeditem')->get();

    return response()->json([
        'status' => 200,
        'message' => 'edited items retrived successfully',
        'deleteditemlogs' =>  $editeditemlogs ,
    ]);

}
}
