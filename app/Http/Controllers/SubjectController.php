<?php 
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class SubjectController extends Controller {
    
    public function __construct(){
        $this->middleware('role:admin', ['only' => ['store', 'update', 'destroy']]);
    }
	
	public function index(){
		return Subject::all();
	}


	public function store(Request $request){
		$subject = Subject::create($request->all());
		return new Response($subject['id'] , 201);
	}

	public function update($id , Request $request){
		Lesson::where('subject_id', $id)->delete();
		Subject::where('id', $id )->update($request->all());
		return new Response(NULL , 204);
	}

	public function destroy($id , Request $request){
		Subject::destroy( $id );
		return new Response(NULL , 204);
	}
}
