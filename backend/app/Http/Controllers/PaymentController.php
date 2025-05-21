<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkStatus($txnId)
    {
        // For now, we mock payment as always successful
        return response()->json([
            'txnId' => $txnId,
            'paid' => true // 👈 simulate success
        ]);
    }
}
