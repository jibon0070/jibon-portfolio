<?php

class SiteOptions extends Controller
{
    public function index()
    {
        if (!$this->request->isGet()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $site_options = array_map(function ($option) {
            return [
                "id" => $option->id,
                "name" => $option->name,
                "value" => $option->option_value
            ];
        }, (new SiteOptionsModel())->find());
        $this->send->json($site_options);
    }

    public function new()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $data = $this->request->get();
        if (!isset($data->name) || !isset($data->value)) $this->send->status(401);
        $site_option = (new SiteOptionsModel())->findFirst(["conditions" => "name = ?", "bind" => [$data->name]]);
        if ($site_option) $this->send->json(["error" => "Option already exists"]);
        $site_option = new SiteOptionsModel();
        $site_option->name = $data->name;
        $site_option->option_value = $data->value;
        if (!$site_option->save()) $this->send->json(["error" => "Error saving option"]);
        $this->send->json([success => true]);
    }

    public function delete()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $data = $this->request->get();
        if (!isset($data->id)) $this->send->status(401);
        $site_option = (new SiteOptionsModel())->findById($data->id);
        if (!$site_option) $this->send->json(["error" => "Option does not exist"]);
        if (!$site_option->delete()) $this->send->json(["error" => "Error deleting option"]);
        $this->send->json([success => true]);
    }
}

class Experience extends Controller
{

    public function index()
    {
        if (!$this->request->isGet()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $experiences = array_map(function ($experience) {
            return [
                "id" => $experience->id,
                "title" => $experience->title,
                "experience" => $experience->experience,
                "category" => ucwords($experience->category)
            ];
        }, (new ExperienceModel())->find());
        $this->send->json($experiences);
    }

    public function new()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $data = $this->request->get();
        if (
            !isset($data->title) ||
            !(new ExperienceModel())->uniq($data->title, 'title')||
            !isset($data->experience) ||
            !isset($data->category)
        ) $this->send->status(401);
        $experience = new ExperienceModel();
        $experience->title = $data->title;
        $experience->experience = $data->experience;
        $experience->category = $data->category;
        if (!$experience->save()) $this->send->json(["error" => "Error saving experience"]);
        $this->send->json([success => true]);
    }

    public function delete()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $data = $this->request->get();
        if (!isset($data->id)) $this->send->status(401);
        $experience = (new ExperienceModel())->findById($data->id);
        if (!$experience) $this->send->json(["error" => "Experience does not exist"]);
        if (!$experience->delete()) $this->send->json(["error" => "Error deleting experience"]);
        $this->send->json([success => true]);
    }
}

class AdminController extends Controller
{
    public function headerImageAction()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        ini_set('upload_max_filesize', '100M');
        if (!isset($_POST['state'])) $this->send->status(401);
        $state = $_POST['state'];
        $site_options = (new SiteOptionsModel())->findFirst([conditions => "name = 'header_image'", order => "id DESC"]);
        if (!$site_options) $site_options = new SiteOptionsModel();
        if ($state == 'get') {
            $this->send->json(["url" => $site_options->option_value]);
        }
        if (!isset($_FILES) || !isset($_FILES['image'])) $this->send->status(401);
        $image = (object)$_FILES['image'];
        if ($image->error != 0) $this->send->json([error => "Error uploading image"]);
        if (!is_dir(root . ds . 'uploads'))
            mkdir(root . ds . 'uploads');
        if (!is_dir(root . ds . 'uploads' . ds . 'images'))
            mkdir(root . ds . 'uploads' . ds . 'images');
        $path = ds . 'uploads' . ds . 'images' . ds . time() . '.' . random_int(0, 1000) . '.' . $image->name;
        $path = str_replace(' ', '-', $path);
        move_uploaded_file($image->tmp_name, root . $path);
        if ($site_options->option_value)
            unlink(root . $site_options->option_value);
        $site_options->name = 'header_image';
        $site_options->option_value = $path;
        $site_options->save();
        $this->send->json([success => true]);
    }

    public function aboutMeImageAction()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        ini_set('upload_max_filesize', '100M');
        if (!isset($_POST['state'])) $this->send->status(401);
        $state = $_POST['state'];
        $site_options = (new SiteOptionsModel())->findFirst([conditions => "name = 'about_me_image'", order => "id DESC"]);
        if (!$site_options) $site_options = new SiteOptionsModel();
        if ($state == 'get') {
            $this->send->json(["url" => $site_options->option_value]);
        }
        if (!isset($_FILES) || !isset($_FILES['image'])) $this->send->status(401);
        $image = (object)$_FILES['image'];
        if ($image->error != 0) $this->send->json([error => "Error uploading image"]);
        if (!is_dir(root . ds . 'uploads'))
            mkdir(root . ds . 'uploads');
        if (!is_dir(root . ds . 'uploads' . ds . 'images'))
            mkdir(root . ds . 'uploads' . ds . 'images');
        $path = ds . 'uploads' . ds . 'images' . ds . time() . '.' . random_int(0, 1000) . '.' . $image->name;
        $path = str_replace(' ', '-', $path);
        move_uploaded_file($image->tmp_name, root . $path);
        if ($site_options->option_value)
            unlink(root . $site_options->option_value);
        $site_options->name = 'about_me_image';
        $site_options->option_value = $path;
        $site_options->save();
        $this->send->json([success => true]);
    }

    public function siteOptionsAction($params)
    {
        $site_options_controller = new SiteOptions();
        if (!count($params) || $params[0] == '' || $params[0] == 'index') $site_options_controller->index();
        elseif ($params[0] == 'new') $site_options_controller->new();
        elseif ($params[0] == 'delete') $site_options_controller->delete();
        $this->send->status(404);
    }

    public function experienceAction($params)
    {
        $experience_controller = new Experience();
        if (!count($params) || $params[0] == '' || $params[0] == 'index') $experience_controller->index();
        elseif ($params[0] == 'new') $experience_controller->new();
        elseif ($params[0] == 'delete') $experience_controller->delete();
        $this->send->status(404);
    }
}