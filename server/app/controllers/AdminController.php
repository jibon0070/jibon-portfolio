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
            !(new ExperienceModel())->uniq($data->title, 'title') ||
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

class Portfolio extends Controller
{

    public function index()
    {
        if (!$this->request->isGet()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $portfolios = array_map(function ($portfolio) {
            return [
                "id" => $portfolio->id,
                "title" => ucwords($portfolio->title),
                "github_link" => $portfolio->github_link,
                "live_link" => $portfolio->live_link,
                "image_link" => $portfolio->image_link
            ];
        }, (new PortfolioModel())->find());
        $this->send->json($portfolios);
    }

    public function new()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        if (
            !isset($_FILES['image']) ||
            !isset($_POST['title']) ||
            !(new PortfolioModel())->uniq($_POST['title'], 'title')
        ) $this->send->status(401);
        $data = (object)[
            "title" => $_POST['title'],
            "image" => (object)$_FILES['image']
        ];
        if (isset($_POST['github_link'])) $data->github_link = $_POST['github_link'];
        if (isset($_POST['live_link'])) $data->description = $_POST['live_link'];
        $portfolio = new PortfolioModel();
        $portfolio->title = $data->title;
        $portfolio->github_link = isset($data->github_link) ? trim($data->github_link) : null;
        $portfolio->live_link = isset($data->live_link) ? trim($data->live_link) : null;
        if (!is_dir(root . ds . 'uploads'))
            mkdir(root . ds . 'uploads');
        if (!is_dir(root . ds . 'uploads' . ds . 'images'))
            mkdir(root . ds . 'uploads' . ds . 'images');
        if ($data->image->error !== UPLOAD_ERR_OK) $this->send->json(["error" => "Error uploading image"]);
        $path = ds . 'uploads' . ds . 'images' . ds . time() . random_int(0, 2000) . $data->image->name;
        if (!move_uploaded_file($data->image->tmp_name, root . $path)) $this->send->json(["error" => "Error uploading image"]);
        $portfolio->image_link = $path;
        $portfolio->created_at = time();
        if (!$portfolio->save()) $this->send->json(["error" => "Error saving portfolio"]);
        $this->send->json([success => true]);
    }

    public function delete()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $data = $this->request->get();
        if (!isset($data->id)) $this->send->status(401);
        $portfolio = (new PortfolioModel())->findById($data->id);
        if (!$portfolio) $this->send->json(["error" => "Portfolio does not exist"]);
        if (!$portfolio->delete()) $this->send->json(["error" => "Error deleting portfolio"]);
        $this->send->json([success => true]);
    }
}

class Testimonial extends Controller
{

    public function index()
    {
        if (!$this->request->isGet()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $testimonials = array_map(function ($testimonial) {
            return [
                "id" => $testimonial->id,
                "name" => ucwords($testimonial->name),
                "description" => $testimonial->description,
                "image_link" => $testimonial->image_link
            ];
        }, (new TestimonialModel())->find());
        $this->send->json($testimonials);
    }

    public function new()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        if (
            !isset($_POST['name']) ||
            !isset($_POST['description']) ||
            !isset($_FILES['image'])
        ) $this->send->status(401);
        if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) $this->send->json(["error" => "Error uploading image"]);
        $testimonial = new TestimonialModel();
        $testimonial->name = $_POST['name'];
        $testimonial->description = $_POST['description'];
        if (!is_dir(root . ds . 'uploads'))
            mkdir(root . ds . 'uploads');
        if (!is_dir(root . ds . 'uploads' . ds . 'images'))
            mkdir(root . ds . 'uploads' . ds . 'images');
        $path = ds . 'uploads' . ds . 'images' . ds . time() . random_int(0, 2000) . $_FILES['image']['name'];
        if (!move_uploaded_file($_FILES['image']['tmp_name'], root . $path)) $this->send->json(["error" => "Error uploading image"]);
        $testimonial->image_link = $path;
        $testimonial->created_at = time();
        if (!$testimonial->save()) $this->send->json(["error" => "Error saving testimonial"]);
        $this->send->json([success => true]);
    }

    public function delete()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $data = $this->request->get();
        if (!isset($data->id)) $this->send->status(401);
        $testimonial = (new TestimonialModel())->findById($data->id);
        if (!$testimonial) $this->send->json(["error" => "Testimonial does not exist"]);
        if (!$testimonial->delete()) $this->send->json(["error" => "Error deleting testimonial"]);
        $this->send->json([success => true]);
    }
}

class Contact extends Controller
{
    public function index()
    {
        if (!$this->request->isGet()) $this->send->status(404);
        $contacts = array_map(function ($contact) {
            return [
                "id" => $contact->id,
                "name" => $contact->name,
                "email" => $contact->email,
                "message" => $contact->message,
                "created_at" => date("d-m-Y", $contact->created_at)
            ];
        }, (new ContactModel())->find([conditions => 'verified = ?', bind => ['1'], order => "id asc"]));
        $this->send->json($contacts);
    }

    public function delete()
    {
        if (!$this->request->isPost()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        $data = $this->request->get();
        if (!isset($data->id)) $this->send->status(401);
        $contact = (new ContactModel())->findById($data->id);
        if (!$contact) $this->send->json(["error" => "Contact does not exist"]);
        if (!$contact->delete()) $this->send->json(["error" => "Error deleting contact"]);
        $this->send->json([success => true]);
    }
}


class AdminController extends Controller
{
    //selected
    public function headerImageAction($params)
    {
        if (!$this->request->isGet() && !$this->request->isDelete() && !$this->request->isPost()) return $this->send->status(404);
        if ($this->auth->error()) return $this->send->status(401);
        $site_options = (new SiteOptionsModel())->findFirst([conditions => "name = 'header_image'", order => "id DESC"]);
        if ($this->request->isGet()) {
            if (!$site_options) return $this->send->json(['url' => null]);
            return $this->send->json(['url' => $site_options->option_value]);
        } elseif ($this->request->isDelete()) {
            if ($site_options) {
                if (file_exists(root . $site_options->option_value)) unlink(root . $site_options->option_value);
                $site_options->delete();
                return $this->send->json([success => true]);
            }
        } elseif ($this->request->isPost()) {
            $file = (object)$_FILES['file'];
            if ($file->error != 0) return $this->send->json([error => 'error uploading file']);
            if ($file->size > 5000000) return $this->send->json([error => 'File size is greater then 5 mb']);
            if (!is_dir(root . ds . 'uploads')) mkdir(root . ds . 'uploads');
            if (!is_dir(root . ds . 'uploads' . ds . 'images')) mkdir(root . ds . 'uploads' . ds . 'images');
            $new_name = 'uploads' . ds . 'images' . ds . time() . $file->name;
            try {
                move_uploaded_file($file->tmp_name, root . ds . $new_name);
            } catch (Exception $exception) {
                return $this->send->json([error => 'error uploading file.']);
            }
            if (!$site_options || !$site_options->option_value) {
                $site_options = new SiteOptionsModel();
            } else {
                $site_options->option_value = preg_replace('/\//', ds, $site_options->option_value);
                $site_options->option_value = root . ds . $site_options->option_value;
                unlink($site_options->option_value);
            }
            $site_options->name = 'header_image';
            $site_options->option_value = '/' . preg_replace('/\\' . ds . '/', '/', $new_name);
            $site_options->save();
            $this->send->json([success => true, 'url' => $site_options->option_value]);
        }
    }

    //selected
    public function aboutMeAction($p)
    {
        if (!count($p) || $p[0] === '' || $p[0] == 'index') {
            if (!$this->request->isGet() && !$this->request->isPost()) return $this->send->status(404);
            if ($this->auth->error()) return $this->send->status(401);
            if ($this->request->isGet()) {
                $clients = (new SiteOptionsModel())->findFirst([conditions => "name = 'clients'", order => 'id DESC']);
                if (!$clients) $clients = 0;
                else $clients = $clients->option_value;
                $experience = (new SiteOptionsModel())->findFirst([conditions => "name = 'experience'", order => 'id desc']);
                if (!$experience) $experience = 0;
                else $experience = $experience->option_value;
                $projects = (new SiteOptionsModel())->findFirst([conditions => "name = 'projects'", order => 'id desc']);
                if (!$projects) $projects = 0;
                else $projects = $projects->option_value;
                return $this->send->json(['clients' => $clients, 'experience' => $experience, 'projects' => $projects]);
            } elseif ($this->request->isPost()) {
                $data = $this->request->get();
                try {
                    if (gettype($data) !== 'object' || gettype($data->name) !== 'string' || gettype($data->value) !== 'string') return $this->send->status(401);
                } catch (Exception $exception) {
                    return $this->send->status(401);
                }
                $site_options = (new SiteOptionsModel())->findFirst([conditions => "name = ?", bind => [$data->name], order => 'id desc']);
                if (!$site_options) {
                    $site_options = new SiteOptionsModel();
                    $site_options->name = $data->name;
                }
                $site_options->option_value = $data->value;
                $site_options->save();
                $this->send->json([success => true]);
            }
        } elseif ($p[0] == 'image') {
            array_shift($p);
            if (!count($p) || $p[0] == '' || $p[0] == 'index') {
                if (!$this->request->isGet() && !$this->request->isPost() && !$this->request->isDelete()) return $this->send->status(404);
                if ($this->auth->error()) return $this->send->status(401);
                $site_options = (new SiteOptionsModel())->findFirst([conditions => "name = 'about_me_image'", order => 'id DESC']);
                if ($this->request->isGet()) {
                    if (!$site_options) return $this->send->json(['url' => null]);
                    return $this->send->json(['url' => $site_options->option_value]);
                } elseif ($this->request->isPost()) {
                    $file = (object)$_FILES['file'];
                    if ($file->error !== 0) return $this->send->json([error => 'error uploading file']);
                    if ($file->size > 5000000) return $this->send->json([error => 'max upload size']);
                    if (!is_dir(root . ds . 'uploads')) mkdir(root . ds . 'uploads');
                    if (!is_dir(root . ds . 'uploads' . ds . 'images')) mkdir(root . ds . 'uploads' . ds . 'images');
                    $new_name = 'uploads' . ds . 'images' . ds . time() . $file->name;
                    try {
                        move_uploaded_file($file->tmp_name, root . ds . $new_name);
                    } catch (Exception $exception) {
                        return $this->send->json([error => 'error uploading file.']);
                    }
                    if (!$site_options || !$site_options->option_value) {
                        $site_options = new SiteOptionsModel();
                    } else {
                        $site_options->option_value = preg_replace('/\//', ds, $site_options->option_value);
                        $site_options->option_value = root . ds . $site_options->option_value;
                        unlink($site_options->option_value);
                    }
                    $site_options->name = 'about_me_image';
                    $site_options->option_value = '/' . preg_replace('/\\' . ds . '/', '/', $new_name);
                    $site_options->save();
                    $this->send->json([success => true, 'url' => $site_options->option_value]);
                } elseif ($this->request->isDelete()) {
                    if ($site_options) {
                        if (file_exists(root . ds . $site_options->option_value)) unlink(root . ds . $site_options->option_value);
                        $site_options->delete();
                        $this->send->json([success => true]);
                    }
                }
            }
        }
    }

    //selected
    public function experiencesAction($p)
    {
        if (count($p) && $p[0] == 'index') array_shift($p);
        if (
            !$this->request->isGet() &&
            !$this->request->isDelete() &&
            !$this->request->isPost()
        ) return $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        if ($this->request->isGet()) {
            $experiences = (new ExperienceModel())->find([order => 'id desc']);
            $this->send->json($experiences);
        } elseif ($this->request->isDelete()) {
            $id = $p[0];
            $experiences = (new ExperienceModel())->findById($id);
            if (!$experiences) $this->send->json([success => true]);
            $experiences->delete();
            $this->send->json([success => true]);
        } elseif ($this->request->isPost()) {
            $data = $this->request->get();
            try {
                if (
                    gettype($data) !== 'object' ||
                    gettype($data->title) !== 'string' ||
                    $data->title === '' ||
                    gettype($data->experience) !== 'string' ||
                    $data->experience === '' ||
                    gettype($data->category) !== 'string' ||
                    !(
                        $data->category == 'frontend' ||
                        $data->category == 'backend'
                    )
                ) return $this->send->status(401);
            } catch (Exception $exception) {
                $this->send->status(401);
            }
            $experiences = new ExperienceModel();
            $experiences->title = $data->title;
            $experiences->experience = $data->experience;
            $experiences->category = $data->category;
            $experiences->save();
            $this->send->json([success => true]);
        }
    }

    //selected

    /**
     * @throws Exception
     */
    public function portfoliosAction($p)
    {
        if (count($p) && $p[0] == 'index') array_shift($p);
        if (
            !$this->request->isGet() &&
            !$this->request->isDelete() &&
            !$this->request->isPost()
        ) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        if ($this->request->isGet()) {
            $portfolios = (new PortfolioModel())->find([order => 'id desc']);
            $this->send->json($portfolios);
        } elseif ($this->request->isDelete()) {
            if (!count($p)) return $this->send->status(404);
            $id = $p[0];
            $portfolios = (new PortfolioModel())->findById($id);
            $portfolios->image_link = preg_replace('/\//', ds, $portfolios->image_link);
            if (file_exists(root . $portfolios->image_link)) unlink(root . $portfolios->image_link);
            $portfolios->delete();
            $this->send->json([success => true]);
        } elseif ($this->request->isPost()) {
            $image = (object)$_FILES['image'];
            $data = (object)$_POST;
            try {
                if (
                    gettype($data->title) !== 'string' ||
                    $data->title == ''
                ) $this->send->status(401);
            } catch (Exception $exception) {
                $this->send->status(401);
            }
            if ($image->error !== 0) $this->send->json([error => 'Error uploading image.']);
            if ($image->size > 5000000) $this->send->json([error => 'upload size exceeded.']);
            if (!is_dir(root . ds . 'uploads')) mkdir(root . ds . 'uploads');
            if (!is_dir(root . ds . 'uploads' . ds . 'images')) mkdir(root . ds . 'uploads' . ds . 'images');
            $new_name = ds . time() . ' ' . random_int(0, 999) . ' ' . $image->name;
            move_uploaded_file($image->tmp_name, root . $new_name);

            $portfolios = new PortfolioModel();
            $portfolios->image_link = preg_replace('/\\' . ds . '/', '/', $new_name);
            $portfolios->title = $data->title;
            $portfolios->github_link = $data->github_link;
            $portfolios->live_link = $data->live_link;

            $portfolios->save();

            $this->send->json([success => true]);
        }
    }

    //selected
    public function testimonialsAction($p)
    {
        if (count($p) && $p[0] == 'index') array_shift($p);
        if (!$this->request->isGet() && !$this->request->isDelete()) $this->send->status(404);
        if ($this->auth->error()) $this->send->status(401);
        if ($this->request->isGet()) {
            $testimonials = (new TestimonialModel())->find([order => 'id desc']);
            $this->send->json($testimonials);
        } elseif ($this->request->isDelete()) {
            if (!count($p)) $this->send->status(404);
            $id = $p[0];
            $testimonials = (new TestimonialModel())->findById($id);
            if ($testimonials) {
                if (file_exists(root.preg_replace('/\//', ds, $testimonials->image_link))) unlink(root.preg_replace('/\//', ds, $testimonials->image_link));
                $testimonials->delete();
            }
            $this->send->json([success => true]);
        }
    }

    public function testimonialAction($params)
    {
        $testimonial_controller = new Testimonial();
        if (!count($params) || $params[0] == '' || $params[0] == 'index') $testimonial_controller->index();
        elseif ($params[0] == 'new') $testimonial_controller->new();
        elseif ($params[0] == 'delete') $testimonial_controller->delete();
        $this->send->status(404);
    }

    public function contactAction($params)
    {
        $contact_controller = new Contact();
        if (!count($params) || $params[0] == '' || $params[0] == 'index') $contact_controller->index();
        elseif ($params[0] == 'delete') $contact_controller->delete();
    }
}
