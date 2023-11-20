<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DeleteLogs;
use Illuminate\Http\Request;

class DeleteLogsController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer', // Make sure user_id is provided and is an integer
            'deleted_user_id' => 'required|integer', // Make sure request_id is provided and is an integer
            'category' => 'required|string', // Make sure message is provided and is a string
        ]);

        // Create a new request response
        $response = new DeleteLogs();
        $response->user_id = $validatedData['user_id'];
        $response->deleted_user_id = $validatedData['deleted_user_id'];
        $response->category = $validatedData['category'];
        $response->save();

        return response()->json(['message' => 'deted user logs created successfully']);
    }

    public function show()
    {
        $deleteduserlogs = DeleteLogs::with('deletinguser','deleteduser')->get();

        return response()->json([
            'status' => 200,
            'message' => 'deleted users retrived successfully',
            'deleteduserlogs' => $deleteduserlogs,
        ]);
    }

}
