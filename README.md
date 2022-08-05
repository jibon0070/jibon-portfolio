# Jibon's Portfolio

---

This is a personal portfolio website for me.\
You can visit this site by clicking the link below.

#### [Link](http://devon.shonirakhra.com/)

if you want to use this design and functionality, you can follow the instructions below.

## Requirements

---

* [Node.js](https://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [Git](https://git-scm.com/)
* [Php7.4+](https://www.php.net/downloads.php)
* [MySQL](https://www.mysql.com/)
* [Composer](https://getcomposer.org/)

## Instructions

---

1. Clone the repository.
2. Install required software. (Skip if pre installed)
3. Open a terminal in the project directory.
4. ```bash
   # Skip if already installed Angular CLI globally
    npm install -g @angular/cli
5. ```bash
   cd app
   npm install
   cd ../server
   composer install
   cd ../
6. ```bash
    # Linux or Mac
    cp server/config/sample.config.php server/config/config.php
   ```
   ```bash
   # Windows
    copy server\config\sample.config.php server\config\config.php
    ```
7. Change `app/src/environments/environment.ts` and `app/src/environments/environment.prod.ts` as your need.
8. Give value to all the `const` in `server/config/config.php` file as you need.
9. ```bash
   cd app
   ng s
10. Customize the site as you need.
11. Deploy to server.
12. If you want to contact me, you can reach me at [A.R. Jibon](https://m.me/atiurrahaman.jibon/)
13. Enjoy your code `smiley emoji`