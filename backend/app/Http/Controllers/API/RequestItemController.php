<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\RequestItem;
use Illuminate\Http\Request;

class RequestItemController extends Controller
{
    //adding requests to the database
    public function insertrequests(Request $request){
        $email = $request->input('email');
        $subject = $request->input('subject');
        $currentDate = now()->format('Y-m-d'); // Get the current date in 'Y-m-d' format
    
        // Check if a request with the same email and subject exists on the same day
        $existingRequest = RequestItem::where('user_id', $email)
            ->where('subject', $subject)
            ->whereDate('created_at', $currentDate)
            ->first();
    
        if (!$existingRequest) {
            $requestsitem = new RequestItem();
            $requestsitem->subject = $subject;
            $requestsitem->user_id = $email;
            $requestsitem->category = $request->input('category');
            $requestsitem->message = $request->input('message');
            
            $requestsitem->save();
        
            return response()->json([
                'status' => 200,
                'message' => 'Request has been successfully added'
            ]);
        } else {
            return response()->json([
                'status' => 409,
                'message' => 'Request with the same email and subject already exists for today'
            ]);
        }
    }


    public function getAllRequestsAndReports()
    {
        $reports = Report::with('user', 'item')->get();
        $combinedData = array_merge( $reports->toArray());
    
        return response()->json(['data' => $combinedData]);
    }

    public function getAllRequestss()
    {
        $requests = RequestItem::with('user')->get();
      
    
        return response()->json(['data' => $requests]);
    }

    public function searchrequest(Request $request)
    {
        $searchvalue = $request->input('searchvalue');

        // Search based on the fullname of the respondent or the one who sent the report
        $results = RequestItem::with(['user'])
            ->whereHas('user', function ($query) use ($searchvalue) {
                $query->where('email', 'like', '%' . $searchvalue . '%');
            })
            ->orWhereHas('user', function ($query) use ($searchvalue) {
                $query->where('fullname', 'like', '%' . $searchvalue . '%');
            })
            ->get();

        return response()->json([
            'request' => $results,
        ]);
    }
     

       //getting all requests form the database
       public function retrieveAllRequests($id)
       {
           // Retrieve all requests that the user has not viewed
           $requests = RequestItem::whereNotExists(function ($query) use ($id) {
               $query->select('id')
                   ->from('view_requests')
                   ->whereRaw('view_requests.request_id = request_items.id')
                   ->where('view_requests.user_id', $id);
           })->get();
       
           return response()->json([
               'status' => 200,
               'requests' => $requests,
           ]);
       }
       

     // Retrieve a specific department by ID
     public function show($id)
     {
         $requestitem = RequestItem::find($id);
 
         if (!$requestitem) {
             return response()->json([
                 'status' => 404,
                 'message' => 'request not found',
             ], 404);
         }
 
         return response()->json([
             'status' => 200,
             'requestitem' => $requestitem,
         ]);
     }

     public function getRequestsBySubject($subjectId) {
        // Query the requests table for requests related to the subject
        $requests = RequestItem::where('id', $subjectId)->get();
    
        return response()->json(['requests' => $requests]);
    }


     


    
}
