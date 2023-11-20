<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UnassignItemsLog;
use Illuminate\Http\Request;

class UnassignItemsLogController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer', 
            'unassigned_item_id' => 'required|integer', 
           
        ]);

       // Validate the request data
       $validatedData = $request->validate([
        'user_id' => 'required|integer', // Make sure user_id is provided and is an integer
        'unassigned_item_id' => 'required|integer', // Make sure request_id is provided and is an intege
    ]);

    // Create a new request response
    $response = new UnassignItemsLog();
    $response->user_id = $validatedData['user_id'];
    $response->unassigned_item_id = $validatedData['unassigned_item_id'];
    $response->save();
        

        return response()->json(['message' => 'unassigned item logs created successfully']);
    }

    public function show()
    {
        $unassgneditmelogs = UnassignItemsLog::with('unassigninguser', 'unassigneditem.user', 'unassigneditem.item')->get();
    
        return response()->json([
            'status' => 200,
            'message' => 'unassigned item retrieved successfully',
            'unassgneditmelogs' => $unassgneditmelogs,
        ]);
    }
    
}
