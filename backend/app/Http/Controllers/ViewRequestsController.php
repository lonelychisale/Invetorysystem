<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ViewRequest;
use Illuminate\Http\Request;

class ViewRequestsController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'request_id' => 'required|exists:requests,id', // Ensure request_id exists in the requests table
            'user_id' => 'required|exists:users,id', // Ensure user_id exists in the users table
        ]);

        // Create a new ViewRequest model instance and fill it with the validated data
        $viewRequest = new ViewRequest([
            'request_id' => $request->input('request_id'),
            'user_id' => $request->input('user_id'),
        ]);

        // Save the record to the view_requests table
        $viewRequest->save();

        // Optionally, you can return a response or redirect to a different page
        return response()->json(['message' => 'View request created successfully'], 201);
    }

}
