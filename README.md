# Fluxus
An IDS based validator & standardization tool for BIM/ IFC models that enables full information sync between corrected IFC and BIM models, by integrating inputs from fine-tuned LLMs to guide users.

## Pre-Requisites 
- Please make sure your Speckle App allows the following permissions:
    - `streams:read`, `streams:write`, `profile:read`, `users:read`
- You will need to obtain the following APIs and include the requisite keys in the .env file to run the application: -
    - Speckle
- Refer to the .env samples files for the desired formats. 

## Application 
This application is split into 2 main parts: 
- Frontend     - This repository - for the user interface.
- Backend      - fluxus-server - Refer to [https://github.com/boblyx/fluxus-server](https://github.com/boblyx/fluxus-server) for the IDS validator and parameter update. 

## Description
1. Speckle 
2. React JS
3. Tailwind CSS

## Built with
1. Speckle 
2. React JS
3. Tailwind CSS

## Installation
In the project directory, you can run:

### `npm i`
Once you have forked both the frontend and backend repos, run "npm i" in the respective terminals to download all the relevant dependencies.

## Starting the Application
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

