<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\RespnseEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendResponseEmail(Request $request) {
        $data = $request->validate([
            'recipientEmail' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);
    
        // Send the email using a Mailable class
        Mail::to($data['recipientEmail'])->send(new RespnseEmail($data['recipientEmail'],$data['subject'], $data['message']));
    
        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
