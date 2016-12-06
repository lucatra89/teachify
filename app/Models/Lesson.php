<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model {

	protected $table = 'lessons';

    protected $fillable = ['subject_id', 'type_of_education_id', 'tutor_id'];
    
    public $timestamps = false;

    
    public function subject(){
        return $this->belongsTo('App\Models\Subject');
    }

    public function typeOfEducation()
    {
        return $this->belongsTo('App\Models\TypeOfEducation');
    }

    public static function store($model)
    {

    	return Lesson::create($model);
    }
	
}
