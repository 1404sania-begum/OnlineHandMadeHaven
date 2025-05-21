<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Place a new order
    public function store(Request $request)
    {
        $order = Order::create($request->all());
        return response()->json($order);
    }

    // Get all orders for the logged-in user
    public function index()
    {
        $orders = Order::where('user_id', auth()->user()->id)->get();
        return response()->json($orders);
    }
}
