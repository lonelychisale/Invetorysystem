<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RespnseEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $subject; // The email subject
    public $message; // The email message
    public $recipientEmail;

    /**
     * Create a new message instance.
     *
     * @param string $recipientEmail
     * @param string $subject
     * @param string $message
     */

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($recipientEmail,$subject, $message)
    {
        $this->subject = $subject;
        $this->message = $message;
        $this->recipientEmail = $recipientEmail;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */

     public function build()
     {
         return $this ->from('lonelyfchisale@gmail.com', 'Invetory System Feedback')
                     ->subject($this->subject)
                     ->to($this->recipientEmail)
                     ->view('emails.response', [
                        'cf_message' => $this->message]); // Create an email template named 'emails/response.blade.php'
     }

    public function envelope()
    {
        return new Envelope(
            subject: $this->subject
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.response',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
