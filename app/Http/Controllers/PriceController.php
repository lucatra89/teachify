<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class PriceController extends Controller {

    public function __construct(){
        $this->middleware('role:admin', ['only' => ['store', 'destroy']]);
    }


	public function index(){
		return Price::all();
	}


	public function store(Request $request){
		$price = Price::create($request->all());
		return new Response($price['id'] , 201);
	}


	public function destroy($id , Request $request){
		Price::destroy( $id );
		return new Response(NULL , 204);
	}
}
