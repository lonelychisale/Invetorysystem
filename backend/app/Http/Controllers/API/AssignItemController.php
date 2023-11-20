<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AssignItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AssignItemController extends Controller
{
    public function store(Request $request)
    {
         $assignedItem = new AssignItem;
         $assignedItem->item_id = $request->input('item_id');

        $assignedItemCheck = AssignItem::where('item_id', $assignedItem->item_id)->first();

        if(!$assignedItemCheck){
        $assignedItem = AssignItem::create([
            'user_id' => $request->input('user_id'),
            'item_id' => $request->input('item_id'),
            'assignedby_id' => $request->input('assignedby'),
        ]);

        // Update the itempossession attribute in the items table
       $item = Item::find($request->input('item_id'));
       $item-> 	itempossesionstatus  = 'assigned';
       $item->save();

        return response()->json([
            'status' => 200,
            'message' => 'Item assigned successfully',
            'assigned_item' => $assignedItem,
        ]);
    }
  else{
    return response()->json([
        'status' => 409,
        'message' => 'Item been already assigned',
        'assigned_item' => $assignedItem,
    ]);

  }
    }

    public function retrieveassigneditems(){
        $assignedItems = DB::table('assign_items')
        ->join('users as assigned_by', 'assign_items.assignedby_id', '=', 'assigned_by.id')
        ->join('users', 'assign_items.user_id', '=', 'users.id')
        ->join('items', 'assign_items.item_id', '=', 'items.id')
        ->select('assign_items.id as assigned_item_id', 'assign_items.assignedby_id as createdBy', 
                 'assigned_by.fullname as assigned_by_name', 'users.fullname as assigned_to_name', 
                 'users.email', 'items.itemname as name', 'items.itemcategory as category', 
                 'items.idnumber as serial_number', 'items.itemstatus as status', 
                 'assign_items.updated_at as time')
        ->get();
    
    

      

        foreach ($assignedItems as $assignedItem) {
        $username = $assignedItem->assigned_to_name;
        $email = $assignedItem->email;
        $itemName = $assignedItem->name;
        $itemcategory = $assignedItem->category;
        $serialNumber = $assignedItem->serial_number;
        $itemstatus = $assignedItem->status;
        $assignedby = $assignedItem->assigned_by_name;
        

        return response()->json([
            'status' => 200,
            'assignedItems' => $assignedItems,
        ]);

        // Use the retrieved data as needed
      }
    }


    //assigneitems statistics
    public function assignedstatistics()
    {
         $assigneditemCount = AssignItem::count();
 
         return response()->json([
            'status' => 200,
            'assigneditemCount' => $assigneditemCount,
         ]);
     }

     //deleting specific assigned item
     public function deleteAssignedItem($assignedItemId)
     {
         // Find the assigned item by ID
         $assignedItem = AssignItem::find($assignedItemId);

        
     
         // Check if the assigned item exists
         if (!$assignedItem) {
             return response()->json([
                 'status' => 404,
                 'message' => 'Assigned item not found',
             ], 404);
         }
     
         // Delete the assigned item
         $assignedItem->delete();

     
         return response()->json([
             'status' => 200,
             'message' => 'Assigned item deleted successfully',
         ]);
     }


//search assigned item
public function search(Request $request)
{
    $query = $request->input('searchvalue');

    // Perform the search query based on the input parameters and join the necessary tables
    $assignItems = AssignItem::join('users', 'assign_items.user_id', '=', 'users.id')
        ->join('users as assigned_by', 'assign_items.assignedby_id', '=', 'assigned_by.id')
        ->join('items', 'assign_items.item_id', '=', 'items.id')
        ->where(function ($queryBuilder) use ($query) {
            // Search by user email or item name
            $queryBuilder->where('users.email', 'like', '%' . $query . '%')
                ->orWhere('items.idnumber', 'like', '%' . $query . '%');
        })
        ->select('assign_items.*', 'users.fullname','assigned_by.fullname as assigned_by_name', 'users.email', 'items.itemname', 'items.itemcategory','items.itemstatus','items.idnumber','assign_items.updated_at as time')
        ->get();

    return response()->json(['assignItems' => $assignItems]);
}





public function getReportAssignedItems(Request  $request, $email) {
    // Get the user_id from the request, replace 'email' with your actual field name
    ;

   
   Log::info("Received Email: " . $email);


    // Fetch assigned items for the user based on user_id
    $assignedItems = DB::table('assign_items')
        ->join('items', 'assign_items.item_id', '=', 'items.id')
        ->where('assign_items.user_id', $email) // Replace with your actual field name
        ->select('items.*') // Select the fields you need from both tables
        ->get();

    return response()->json([
        'status' => 200,
        'items' => $assignedItems,
    ]);
}







}



