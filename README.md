# Fluxus
An IDS based validator & standardization tool for BIM/ IFC models that enables full information sync between corrected IFC and BIM models, by integrating inputs from fine-tuned LLMs to guide users (i.e. future functionality).

## Description 
As an IDS validator, Fluxus extracts information from IFC and BIM models uploaded to Speckle via Speckle Stream. It validates the IFC information against the IFC IDS mapping file provided by the user. After validation, Fluxus offers detailed results, allowing users to make necessary adjustments to model parameters. These adjustments are then synchronized with the connected BIM model via Speckle Stream, ensuring that the Revit model's parameters are updated accordingly. This process significantly reduces the time and effort required to ensure compliance of IFC models with submission standards, particularly within the context of Singapore.

## Pre-Requisites 
- Please make sure your Speckle App allows the following permissions:
    - `streams:read`, `streams:write`, `profile:read`, `users:read`
- You will need to obtain the following APIs and include the requisite keys in the .env file to run the application: -
    - Speckle
- Refer to the .env development file for the desired format. 

## Application 
This application is split into 2 main parts: 
- Frontend     - This repository - for the user interface.
- Backend      - fluxus-server - Refer to [https://github.com/boblyx/fluxus-server](https://github.com/boblyx/fluxus-server) for the IDS validator and parameter update. 

## Flow 
#### 1. Login
Users login with their Speckle account. 

![Login Snapshot](https://github.com/yuj8fuj6/fluxus/assets/105143904/b9386182-985d-46ec-90e9-22940e00adba)

#### 2. Import Model Data 
Users import their model data via Speckle Stream for models already uploaded in the Speckle App. 

![Import Snapshot](https://github.com/yuj8fuj6/fluxus/assets/105143904/10495ce3-a731-4e32-81e7-5971b4b1ff00)

#### 3. Validation Check 
After uploading their IFC IDS mapping file to the application, the mapping file and the model data are sent to the backend where the data is fed to the validator, and non-compliant data is then filtered out for attention by the users. 

<img width="1728" alt="Check Snapshot" src="https://github.com/yuj8fuj6/fluxus/assets/105143904/fa6ff900-fd68-452d-8aed-65c9c3d0be1f">

#### 4. User Input 
The users will amend the non-compliant values. 

![Checker Snapshot](https://github.com/yuj8fuj6/fluxus/assets/105143904/d75a3de7-a748-4f80-b6cb-c6f7e78562b5)

#### 5. BIM Model Update
The amended values are sent to Speckle for updating the BIM model's parameters, ensuring synchronization. 

![Update Snapshot](https://github.com/yuj8fuj6/fluxus/assets/105143904/dc7f640c-1b32-48f9-bb12-7fd4c528f73c)

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

## Collaborators 
1. Fujinami Yuji Malcolm 
2. Bob YX Lee
