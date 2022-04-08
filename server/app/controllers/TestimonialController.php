<?php

	class TestimonialController extends Controller
	{
		public function indexAction()
		{
			if (!$this->request->isGet())$this->send->status(404);
			$testimonials = array_map(function ($testimonial) {
				return [
					'id' => $testimonial->id,
					"name" => $testimonial->name,
					"description" => $testimonial->description,
					"image_link" => $testimonial->image_link,
				];
			}, (new TestimonialModel())->find());
			$this->send->json($testimonials);
		}
	}