<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DeleteItemsLogs;
use App\Models\EditItemsLogs;
use Illuminate\Http\Request;

class DeleteItemsLogsController extends Controller
{
    
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer', // Make sure user_id is provided and is an integer
            'deleted_item_id' => 'required|integer', // Make sure request_id is provided and is an integer
            'category' => 'required|string', // Make sure message is provided and is a string
        ]);

        // Create a new request response
        $response = new DeleteItemsLogs();
        $response->user_id = $validatedData['user_id'];
        $response->deleted_item_id = $validatedData['deleted_item_id'];
        $response->category = $validatedData['category'];
        $response->save();

        return response()->json(['message' => 'deleted item logs created successfully']);
    }


    public function show()
    {
        $deleteeditemlogs = DeleteItemsLogs::with('deletinguser','deleteditem')->get();
    
       

        return response()->json([
            'status' => 200,
            'message' => 'deleted items retrived successfully',
            'deleteditemlogs' =>  $deleteeditemlogs,
        ]);
    }
}
