<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $itemPerPage = $request->query('item_per_page', 10);
        $products = Product::orderBy('id', 'desc')->paginate($itemPerPage);

        return response()->json($products);
    }
}
