<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ViewReport;
use App\Models\ViewReportResponse;
use App\Models\ViewRequest;
use App\Models\ViewRequestResponse;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data on the server
        $request->validate([
            'subjectId' => 'required|integer', // Subject ID (request or report ID)
            'type' => 'required|in:requests,reports', // Ensure subject_type is either 'request' or 'report'
            'userId' => 'required|integer', // User ID
        ]);

        // Check the subject type and insert data accordingly
        if ($request->input('type') === 'requests') {
            // Insert into view_requests table
            ViewRequest::create([
                'request_id' => $request->input('subjectId'),
                'user_id' => $request->input('userId'),
            ]);
        } elseif ($request->input('type') === 'reports') {
            // Insert into view_reports table
            ViewReport::create([
                'report_id' => $request->input('subjectId'),
                'user_id' => $request->input('userId'),
            ]);
        }

        // Optionally, you can return a response or redirect to a different page
        return response()->json(['message' => 'View record created successfully'], 201);
    }


    public function insertRequestResponseView(Request $request) {
        $userId = $request->input('user_id');
        $requestResponseId = $request->input('response_id');
        
        // Insert into viewrequestresponse table
        $viewRequestResponse = new ViewRequestResponse();
        $viewRequestResponse->user_id = $userId;
        $viewRequestResponse->request_response_id = $requestResponseId;
        $viewRequestResponse->save();
        
        // Handle the response as needed
        return response()->json(['message' => 'View record created successfully'], 201);
    }
    
    public function insertReportResponseView(Request $request) {
        $userId = $request->input('user_id');
        $reportResponseId = $request->input('response_id');
        
        // Insert into viewreportresponse table
        $viewReportResponse = new ViewReportResponse();
        $viewReportResponse->user_id = $userId;
        $viewReportResponse->report_response_id = $reportResponseId;
        $viewReportResponse->save();
        
        
        // Handle the response as needed
        return response()->json(['message' => 'View record created successfully'], 201);
    }
    
    
   }

