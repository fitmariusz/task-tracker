> This project runs a task tracker in the terminal using Node.js. Built with Node.js for everyone.

# Welcome
I am working on a small module to track tasks using Node.js, specifically designed to run in the terminal. This project will appeal to those who enjoy using Node.js and the terminal and prefer not to switch between the browser and the terminal. I am one of those people; working inside Neovim and the terminal, I like to spend as much time as possible there.

I would love to have a tracker that not only tracks what I am working on but also offers autocomplete and can be controlled using keybindings. This is both the reason and the goal for me.

Feel free to join me in working on this module. It is in the early stages, so please join me here  https://discord.gg/Rk3hME8rfq, and let's work together. I am so excited.

Later, I plan to synchronize this project with track.toggle.com, but we will see how it goes.

# Coming Features
- Ability to manage owners (add, view, update, delete).
- Ability to manage projects (add, view, update, delete, assign owner).
- Ability to manage tasks (add, view, update, delete).
- Start and stop tasks with detailed tracking.
- Display current tasks in progress.
- Display summary of tasks for the current day.
- Autocomplete for CLI commands for efficient navigation.
- Keybindings for common actions within the terminal.
- Synchronization with track.toggle.com for external time tracking.
- Unit tests for all models and features.
- Comprehensive documentation and usage guidelines.

# Tasks to work on
- [x] task-1: Create a schema.
- [x] task-2: Use knex.
- [x] task-3: Create Owner Schema.
- [x] task-4: Implement Owner Model with CRUD operations.
- [x] task-5: Add CLI commands for managing owners (e.g., add-owner, list-owners).
- [x] task-6: Create Project Schema.
- [x] task-7: Implement Project Model with CRUD operations.
- [x] task-8: Add CLI commands for managing projects (e.g., add-project, list-projects, assign-owner).
- [x] task-9: Create Task Schema.
- [x] Task-10: Create "Add Task" operation.
- [ ] Task-11: Add Yup validation to "Owner Create" and "Update" operations.
- [ ] Task-12: Add Yup validation to "Project Create" and "Update" operations.
- [x] Task-13: Create "Update Task" operation.
- [x] Task-14: Create operation to list all tasks.
- [x] Task-15: Add Yup validation to "Tasks Create" and "Update" operations.
- [w] Task-16: Add "Delete Project" operation, which will involve removing all tasks. Confirmation needed.
- [w] Task-17: Add "Delete Owner" operation, which will involve removing all tasks and projects. Confirmation needed.
- [w] Task-18: Add "Delete Task" operation

Task to be created
- [ ] task: Implement Task Model with CRUD operations.
- [ ] task: Add CLI commands for managing tasks (e.g., add-task, list-tasks, update-task).
- [ ] task: Implement start task functionality.
- [ ] task: Implement stop task functionality.
- [ ] task: Display in-progress tasks.
- [ ] task: Implement autocomplete for CLI commands.
- [ ] task: Add keybindings for common actions.
- [ ] task: Display daily summary report of completed tasks.
- [ ] task: Research and implement synchronization with track.toggle.com.
- [ ] task: Write unit tests for models and features.
- [ ] task: Update documentation in README.md.

## Legend
x-done 
w-working

# Joining and Setting Up the Project

Here’s a guide to help you get started.

## Prerequisites

1. **Fork the Project**: Start by forking the repository to your own GitHub account.
2. **Clone the Fork**: Clone the forked repository to your local machine.
3. **Install MySQL and Nodejs**: Ensure that MySQL and Nodejs is installed on your local machine. 
4. **Create a Database**: Run the SQL command `CREATE DATABASE <name>;` to create your local database.

## Project Setup

1. **Install Dependencies**: Navigate to your project directory and run `npm install` to install the necessary dependencies.
2. **Database Migration**: Set up the required database schema by running `npm run migrate`. Do it after you created data base.
3. **Start the Project**: You can start the project by running `node src/index.js` or `./src/index.js` from the project directory.

## Working on Tasks

1. **Choose a Task**: Tasks are detailed in the README.md under the tasks section. Pick one that you want to work on.
2. **Create a New Branch**: For each task, create a new branch from your fork, e.g., `git checkout -b task-2`.
3. **Development**: Work on the task in your branch. Commit changes as needed. If any question, please ask. 

## Using Knex.js

- Familiarize yourself with the basics of SQL as you will need to understand `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and how to use clauses like `WHERE` and operators like `AND`.
- Knex.js makes querying simpler, acting as a query builder. You don't need to dive deep into SQL.

## Submission and Review

1. **Pull Request**: Once you complete your task, push your branch to GitHub and create a pull request to the main branch of the original repository.
2. **Code Review**: Add me as a reviewer to your pull request.

## Need Help?

- If you encounter any issues during setup or development, please write on the dedicated project channel. 

Happy coding! 🙂


# Discord
Would you like to work with me? Join me on discord :-)
[Click here](https://discord.gg/Rk3hME8rfq)
