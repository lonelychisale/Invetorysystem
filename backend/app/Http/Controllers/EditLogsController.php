<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EditLogs;
use Illuminate\Http\Request;

class EditLogsController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer', // Make sure user_id is provided and is an integer
            'edited_user_id' => 'required|integer', // Make sure request_id is provided and is an integer
            'category' => 'required|string', // Make sure message is provided and is a string
        ]);

        // Create a new request response
        $response = new EditLogs();
        $response->user_id = $validatedData['user_id'];
        $response->edited_user_id = $validatedData['edited_user_id'];
        $response->category = $validatedData['category'];
        $response->save();

        return response()->json(['message' => 'edited user logs created successfully']);
    }


    public function show()
    {
        $editeduserlogs = EditLogs::with('editinguser','editeduser')->get();
    
        return response()->json([
            'status' => 200,
            'message' => 'edited users retrived successfully',
            'deleteduserlogs' => $editeduserlogs,
        ]);
    }

}
