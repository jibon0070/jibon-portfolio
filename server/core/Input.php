<?php

declare(strict_types=1);

class Input
{
    /**
     * @return bool
     */
    public function isPost(): bool
    {
        return $this->getRequestMethod() === 'POST';
    }

    /**
     * @return bool
     */
    public function isPut(): bool
    {
        return $this->getRequestMethod() === 'PUT';
    }

    /**
     * @return bool
     */
    public function isGet(): bool
    {
        return $this->getRequestMethod() === 'GET' || $this->getRequestMethod() === 'OPTIONS';
    }

    /**
     * @return bool
     */
    public function isOptions(): bool
    {
        return $this->getRequestMethod() === 'OPTIONS';
    }

    /**
     * @return string
     */
    public function getRequestMethod(): string
    {
        return strtoupper($_SERVER['REQUEST_METHOD']);
    }

    /**
     * @param bool $input
     * @return array|string
     */
    public function specialGet($input = false)
    {
        if (!$input) {
            //return entire request and sanitize it
            $data = [];
            foreach ($_REQUEST as $field => $value) {
                $data[$field] = Helpers::sanitize($value);
            }
            return $data;
        }
        return Helpers::sanitize($_REQUEST[$input]);
    }

    /**
     * @return mixed
     */
    public function get()
    {
        return json_decode(file_get_contents('php://input'));
    }

    /**
     * @param array $file
     * @param string[] $allowed
     * @param string $path
     * @param int $maxSizeMb
     * @param bool $debug
     * @return array
     */
    public function upload(array $file, $allowed, string $path, int $maxSizeMb, bool $debug = false): array
    {
        $fileName = $file['name'];
        $fileError = $file['error'];
        $fileSize = $file['size'];
        $fileTemp = $file['tmp_name'];
        $fileExt = explode('.', $fileName);
        $count = count($fileExt) - 1;
        $fileExt = strtolower($fileExt[$count]);
        $maxSizeByte = $maxSizeMb * 1000000;

        if (in_array($fileExt, $allowed)) {
            if ($fileSize < $maxSizeByte) {
                if ($fileError === 0) {
                    $fileNameNew = uniqid('', true) . '.' . $fileExt;
                    $destination = $path . $fileNameNew;
                    if (!$debug) {
                        move_uploaded_file($fileTemp, $destination);
                    }
                    return [success => $destination];
                    // $this->status(200)->json('uploaded');
                } else {
                    return [
                        'error' => 'File corrupted'
                    ];
                }
            } else {
                return [
                    'error' => 'File size must be under ' . $maxSizeMb . ' mega byte'
                ];
            }
        } else {
            return [
                'error' => 'File extension ".' . $fileExt . '" is not allowed'
            ];
        }
    }
}
