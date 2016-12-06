<?php 

namespace App\Models;
use DB;

class TutorInfo {

	private static function buildSql($lat , $lon){
        
        $miles = '(3956 * 2 * ASIN(SQRT(POWER(SIN((';
        $miles .= $lat;
        $miles .= '- abs(latitude)) * pi()/180 / 2), 2) + COS(';
		$miles .= $lat;
		$miles .='* pi()/180 ) * COS(abs(latitude) * pi()/180) * POWER(SIN((';
		$miles .=	$lon;
		$miles .='- longitude) * pi()/180 / 2), 2) )))';
		
		$meters = '('. $miles . '/0.62137) * 1000';

		return $meters;
	}

	private static function buildQuery($request){

		$subjectId = $request['subjectId'];
		$educationId = $request['typeOfEducationId'];

		$sql = static::buildSql($request['latitude'], $request['longitude']);

		$query = DB::table('tutors')
			->select(DB::raw('user_id as id'), DB::raw($sql .' as distance'))
			->distinct()
			->join('lessons', 'tutors.user_id', '=', 'lessons.tutor_id');

		if( $subjectId != 0){
		 	$query->where('subject_id', $subjectId);
		}
		if( $educationId != 0){
			$query->where('type_of_education_id', $educationId);
		}

		$query->orderBy('distance');

		return $query;
	}

	private static function getInfos($query , $uriRoot)
	{
		$infos = array();

		foreach ($query->get() as $item) {
			$info = ['uri' => $uriRoot. $item->id , 'distance' => round($item->distance,0)];
			array_push($infos, $info);
		}

		return $infos;

	}

	public static function findByRequest($request)
	{
		$query = static::buildQuery($request);
		$uriRoot = str_replace('search', '', $request->url());

		return static::getInfos($query, $uriRoot);
	}

	
}
