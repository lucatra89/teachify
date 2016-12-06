<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TypeOfEducation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class TypeOfEducationController extends Controller {

    public function __construct(){
        $this->middleware('role:admin', ['only' => ['store', 'update', 'destroy']]);
    }


	public function index(){
		return TypeOfEducation::all();
	}


	public function store(Request $request){
		$education = TypeOfEducation::create($request->all());
		return new Response($education['id'] , 201);
	}

	public function update($id , Request $request){
		TypeOfEducation::where('id', $id )->update($request->all());
		return new Response(NULL , 204);
	}

	public function destroy($id , Request $request){
		Lesson::where('type_of_education_id', $id)->delete();
		TypeOfEducation::destroy( $id );
		return new Response(NULL , 204);
	}
}
