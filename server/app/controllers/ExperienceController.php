<?php

class ExperienceController extends Controller
{
    public function uniqAction()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        $data = $this->request->get();
        if (!isset($data->field) || !isset($data->value)) $this->send->status(401);
        $this->send->json((new ExperienceModel())->uniq($data->value, $data->field));
    }

    public function indexAction()
    {
        if (!$this->request->isGet()) $this->send->status(404);
        $frontend = array_map(function ($ex){
            return [
                'title' => strtoupper($ex->title),
                'experience' => ucwords($ex->experience),
            ];
        }, (new ExperienceModel())->find([order => 'title', conditions => 'category = ?', bind => ['frontend']]));
        $backend = array_map(function ($ex){
            return [
                'title' => strtoupper($ex->title),
                'experience' => ucwords($ex->experience),
            ];
        }, (new ExperienceModel())->find([order => 'title', conditions => 'category = ?', bind => ['backend']]));
        $this->send->json(['frontend' => $frontend, 'backend' => $backend]);
    }

}