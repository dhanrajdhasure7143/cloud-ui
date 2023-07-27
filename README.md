# RPA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).




Cloud UI  Setup Guide

Prerequisites

Before you run Cloud UI, make sure you have the following software installed on your system:

Node.js
Version: 14.16.7 (LTS recommended)
Download Node.js from the official website.
Angular CLI
Version: 7.3.8
Installation: Open a terminal or command prompt and run the following command:

npm install -g @angular/cli@7.3.8
 
Project Setup Instructions

After cloning Cloud UI from GitLab to your local machine, follow these steps to set up the project and run it locally:

Step 1: Navigate to the Project Directory

Open your terminal or command prompt and navigate to the directory where you want to clone your project. You can use the cd command to change directories.

Example:

cd /path/to/your/cloned/project
 

Step 2: Install Dependencies

Once you are in the project directory, you need to install the project's dependencies, which are defined in the package.json file. Use the following command to install the required packages:

npm install
 
This command will download and install all the necessary dependencies specified in the package.json file.

Step 3: Run the Angular Application

After installing the dependencies, you can start the Angular development server to run the application. Use the following command:

ng serve

or

ng start
 
or

 set NODE_OPTIONS=--max_old_space_size=8192 & ng serve --open
 

This command will compile the application and start the development server. You can access your application by opening a web browser and going to http://localhost:4200. The app will automatically reload whenever you make changes to the code.

Step 4: Access the Angular App

Open your web browser and go to http://localhost:4200 to see your Angular app in action. Now, you should be able to interact with the application locally.

That's it! You have successfully cloned your project and set it up on your local machine. You can now start working on the project, making changes, and testing it locally. Happy coding!