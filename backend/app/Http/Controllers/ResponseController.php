<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ReportResponse;
use App\Models\RequestResponse;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function storeRequestResponse(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer', // Make sure user_id is provided and is an integer
            'request_id' => 'required|integer', // Make sure request_id is provided and is an integer
            'message' => 'required|string', // Make sure message is provided and is a string
        ]);

        // Create a new request response
        $response = new RequestResponse();
        $response->user_id = $validatedData['user_id'];
        $response->request_id = $validatedData['request_id'];
        $response->message = $validatedData['message'];
        $response->save();

        return response()->json(['message' => 'Response created successfully']);
    }

    public function storeReportResponse(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer', // Make sure user_id is provided and is an integer
            'report_id' => 'required|integer', // Make sure report_id is provided and is an integer
            'message' => 'required|string', // Make sure message is provided and is a string
        ]);

        // Create a new report response
        $response = new ReportResponse();
        $response->user_id = $validatedData['user_id'];
        $response->report_id = $validatedData['report_id'];
        $response->message = $validatedData['message'];
        $response->save();

        return response()->json(['message' => 'Response created successfully']);
    }



    public function getAllResponses($id)
    {
        // Fetch request responses excluding viewed responses
        $requestResponses = RequestResponse::whereNotExists(function ($query) use ($id) {
            $query->select('id')
                ->from('view_request_responses')
                ->whereColumn('view_request_responses.request_response_id', 'request_responses.id')
                ->where('view_request_responses.user_id', $id);
          })->with('user', 'request')->get();
    
         // Fetch report responses excluding viewed responses
         $reportResponses = ReportResponse::whereNotExists(function ($query) use ($id) {
            $query->select('id')
                ->from('view_report_responses')
                ->whereColumn('view_report_responses.report_response_id', 'report_responses.id')
                ->where('view_report_responses.user_id', $id);
         })->with('user', 'report')->get();
    
        // Combine responses from both tables into a single array
        $combinedResponses = $requestResponses->concat($reportResponses);
       
    
        return response()->json([
            'status' => 200,
            'responses' => $combinedResponses,
        ]);
    }


    //getting all request responses
    public function requestresponses(){
        $requestsresponses = RequestResponse::with('user','request.user')->get();
    
        return response()->json(['data' => $requestsresponses]); 
    }
    
    public function reportresponses(){
        $reportsresponses = ReportResponse::with('user','report.user')->get();
    
        return response()->json(['data' => $reportsresponses]); 
    }


    public function searchrequestresponses(Request $request)
    {
        $searchvalue = $request->input('searchvalue');

        // Search based on the fullname of the respondent or the one who sent the report
        $results = RequestResponse::with(['user', 'request.user'])
            ->whereHas('user', function ($query) use ($searchvalue) {
                $query->where('fullname', 'like', '%' . $searchvalue . '%');
            })
            ->orWhereHas('request.user', function ($query) use ($searchvalue) {
                $query->where('fullname', 'like', '%' . $searchvalue . '%');
            })
            ->get();

        return response()->json([
            'requestresponses' => $results,
        ]);
    }
    
    public function searchreportresponses(Request $request)
    {
        $searchvalue = $request->input('searchvalue');

        // Search based on the fullname of the respondent or the one who sent the report
        $results = ReportResponse::with(['user', 'report.user'])
            ->whereHas('user', function ($query) use ($searchvalue) {
                $query->where('fullname', 'like', '%' . $searchvalue . '%');
            })
            ->orWhereHas('report.user', function ($query) use ($searchvalue) {
                $query->where('fullname', 'like', '%' . $searchvalue . '%');
            })
            ->get();

        return response()->json([
            'reportresponses' => $results,
        ]);
    }
}


