# OC-13 Project

## Overview

This project is a student project, designed as part of an educational curriculum to apply and showcase the skills learned in the formation.

## Prerequisites

Before you can run this project locally, you need to have Docker installed on your machine. Docker will handle the creation and management of the containers needed to run the project.

Additionally, you need to have Git installed to clone the project repository.

## Cloning the Project

To clone the project and start working on it, follow these steps:

1. Open a terminal.
2. Run the following command to clone the project repository:
   ```bash
   git clone https://github.com/wilson-kbs/oc-13.git
   ```
3. Change the directory to the root of the project:
   ```bash
   cd oc-13
   ```

## Running the Project Locally

To run the project locally, follow these steps:

1. Ensure you are in the project's root directory where the `docker-compose.yml` file is located.
2. Run the following command to start the project in detached mode:
   ```bash
   docker-compose up -d
   ```
   This command will build and start the containers defined in the `docker-compose.yml` file.

## Accessing the Project

Once the project is running, you can access it by navigating to [http://localhost:3000](http://localhost:3000) in your web browser. This will take you to the homepage of the project running locally on your machine.
