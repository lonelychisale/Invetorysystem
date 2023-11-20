<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    public function insertitems(Request $request){
        $systemitem = new Item;
        $systemitem->idnumber = $request->input('idnumber');
    
        $checlitem = Item::where('idnumber', $systemitem->idnumber)->first();
    
        if(!$checlitem){
            $systemitem->itemname = $request->input('itemname');
            $systemitem->itemcategory = $request->input('itemcategory');
            $systemitem->idnumber = $request->input('idnumber');
            $systemitem->serialnumber = $request->input('serialnumber');
            $systemitem->price = $request->input('price');
            $systemitem->itemmanufactureddate = $request->input('manufacturedate');
            $systemitem->itemlifespan = $request->input('lifespan');
            $systemitem->itemstatus = $request->input('itemstatus');
            $systemitem->itempossesionstatus = $request->input('itempossesionstatus');
            $systemitem->branch = $request->input('branch');
            $systemitem->createdBy = $request->input('createdBy');

        
            $systemitem->save();
        
            return response()->json([
                'status'=>200,
                'message'=>'item has been successfully added'
            ]);
        }
      else{
        return response()->json([
            'status'=>409,
            'message'=>'item has been already added'
        ]);
      }
    
        
       } 
    
    
    
       
       public function retrieveallitems(){
        $items = Item::all();
        return response()->json([
            'status'=>200,
            'items'=>$items,
        ]);
    }
        //retrieving data from the the database
        public function retrieveitems(){
            $items = DB::select('select * from items items limit 5');;
            return response()->json([
                'status'=>200,
                'items'=>$items,
            ]);
        }
    
        //retrieving laptops from the databse
        public function retrievelaptops(){
            $laptops = DB::select('select * from items WHERE itemcategory="computer"');
     
            return response()->json([
                'status'=>200,
                'laptops'=>$laptops,
            ]);
        }
    
        //retrieving phones from the database
        public function retrievephone(){
            $phones = DB::select('select * from items WHERE itemcategory="phone"');
     
            return response()->json([
                'status'=>200,
                'phones'=>$phones,
            ]);
        }
    
        //retrieving furniture from the databse
        public function retrievefurniture(){
            $furniture = DB::select('select * from items WHERE itemcategory="furniture"');
     
            
            return response()->json([
                'status'=>200,
                'furniture'=>$furniture,
            ]);
        }
    
        //retriving stationary from the database
        public function retrievestationary(){
            $stationary = DB::select('select * from items WHERE itemcategory="stationary"');
            return response()->json([
                'status'=>200,
                'stationary'=>$stationary,
            ]);
        }
       
        //items statistics
        public function itemsstatistics()
        {
             $itemCount = Item::count();
     
             return response()->json([
                'status' => 200,
                'itemCount' => $itemCount,
             ]);
         }
    
    
         //deleting specific item
         public function deleteitem($id){
            $deleteitem = Item::find($id);
            $deleteitem -> delete();
    
            
            return response()->json([
                'status' => 200,
                'message' => 'deleted successfully',
             ]);
        }
    
    
    
        // Retrieve a specific item by ID
        public function show($id)
        {
            $item = Item::find($id);
    
            if (!$item) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Item not found',
                ], 404);
            }
    
            return response()->json([
                'status' => 200,
                'item' => $item,
            ]);
        }
    
    
    
        //updating specific item
    
        public function update(Request $request, $id)
           {
              $item = Item::find($id);
              if (!$item) {
                   return response()->json(['status' => 404, 'message' => 'Item not found'], 404);
              }
    
             $item->update($request->all());
    
             return response()->json(['status' => 200, 'message' => 'Item updated successfully']);
           }
    
    
    // auto complete
    
    public function autocompleteSearch(Request $request)
    {
        $query = $request->input('search');
        $suggestions = Item::where('itemname', 'like', '%' . $query . '%')
                           ->orWhere('idnumber', 'like', '%' . $query . '%')
                           ->get(['id', 'itemname']);
    
        return response()->json(['suggestions' => $suggestions]);
    }
    
    
    
    
    
           //searching an item
           public function search(Request $request)
           {
               $query = $request->input('searchvalue');
               $category = $request->input('category');
           
               // Perform the search query based on the input parameters
               $items = Item::when($query, function ($queryBuilder) use ($category, $query) {
                   // Filter by category if provided
                   if ($category !== 'all') {
                       $queryBuilder->where('itemcategory', $category);
                   }
           
                   // Filter by item name or any other fields you want to search
                   $queryBuilder->where(function ($queryInner) use ($query) {
                       $queryInner->where('itemname', 'like', '%' . $query . '%');
                       $queryInner->orWhere('idnumber', 'like', '%' . $query . '%');
                       // Add more fields here as needed
                   });
           
                   return $queryBuilder;
               })->get();
           
               return response()->json(['items' => $items]);
           }
    
   //dashboard search
           public function dashboardsearch(Request $request)
     {
        $query = $request->input('searchvalue');
        $category = $request->input('category');
    
        // Perform the search query based on the input parameters
        $items = Item::when($query, function ($queryBuilder) use ($category, $query) {
            // Filter by category if provided
            if ($category !== 'all') {
                $queryBuilder->where('itemcategory', $category);
            }
    
            // Filter by item name or any other fields you want to search
            $queryBuilder->where(function ($queryInner) use ($query) {
                $queryInner->where('itemname', 'like', '%' . $query . '%');
                $queryInner->orWhere('idnumber', 'like', '%' . $query . '%');
               
            });
    
            return $queryBuilder;
        })->take(5) // Limit the result to 5 items
          ->get();
    
        return response()->json(['items' => $items]);
    }
    
           
    
       //searching items in the phone table
       public function searchphonetable(Request $request)
      {
        $query = $request->input('searchvalue');
    
        // Perform the search query based on the input parameters
        $items = Item::where('itemcategory', 'phone')
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('itemname', 'like', '%' . $query . '%')
                             ->orWhere('idnumber', 'like', '%' . $query . '%');
            })
            ->get();
    
        return response()->json(['items' => $items]);
      }
    
    
    
      //laptop search controller
      public function searchlaptoptable(Request $request)
      {
        $query = $request->input('searchvalue');
    
        // Perform the search query based on the input parameters
        $items = Item::where('itemcategory', 'laptop')
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('itemname', 'like', '%' . $query . '%')
                             ->orWhere('idnumber', 'like', '%' . $query . '%');
            })
            ->get();
    
        return response()->json(['items' => $items]);
      }
    
    
    
      //stationary search controller
      public function searchstationarytable(Request $request)
      {
        $query = $request->input('searchvalue');
    
        // Perform the search query based on the input parameters
        $items = Item::where('itemcategory', 'stationary')
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('itemname', 'like', '%' . $query . '%')
                             ->orWhere('idnumber', 'like', '%' . $query . '%');
            })
            ->get();
    
        return response()->json(['items' => $items]);
      }
    
    
      //furniture search controller
      public function searchfurnituretable(Request $request)
      {
        $query = $request->input('searchvalue');
    
        // Perform the search query based on the input parameters
        $items = Item::where('itemcategory', 'furniture')
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('itemname', 'like', '%' . $query . '%')
                             ->orWhere('idnumber', 'like', '%' . $query . '%');
            })
            ->get();
    
        return response()->json(['items' => $items]);
      }

}
