import * as inquirer from '@inquirer/prompts';

import projectModel from '../models/project.js';
import taskService from '../services/taskService.js';
import {isDateInvalid, isTaskInvalid} from '../../validation.js';
import {selectAllProjects} from './project.js';

const createTask = async () => {
  if (!(await projectModel.isProject())) return;
  const title = await inquirer.input({
    message: 'Insert task title',
    validate: input => {
      if (input.toLowerCase() === 'exit') {
        console.log('Exiting the process...');
        process.exit(); // TODO: add prpper handling when user what to stop action, whole app
      }
      let resp;
      if ((resp = isTaskInvalid(input))) return resp;

      return true;
    },
  });

  const projects = await selectAllProjects();

  const name = await inquirer.search({
    message: 'Select project',
    source: input => {
      const choices = projects
        .map(({name}) => name)
        .map(f => ({
          name: f,
          value: f,
        }))
        .concat({name: 'Stop', value: 'Stop'});

      if (!input) return choices;
      return choices.filter(choice =>
        choice.name.toLowerCase().includes(input.toLowerCase()),
      );
    },
  });

  if (name === 'Stop') return;

  const project = projects.find(c => c.name === name);

  // Get current date and time
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // format YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].slice(0, 5); // format HH:mm
  const startDefault = `${date} ${time}`;

  // Prompt for start and end dates with time
  const start = await inquirer.input({
    message: 'Enter start date and time (YYYY-MM-DD HH:mm)',
    default: startDefault,
    validate: input => {
      let resp;
      if ((resp = isDateInvalid(input)))
        return 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';

      return true;
    },
  });

  const end = await inquirer.input({
    message: 'Enter end date and time (YYYY-MM-DD HH:mm)',
    validate: input => {
      let resp;
      if ((resp = isDateInvalid(input)))
        return 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';

      if (new Date(input) <= new Date(start))
        return 'End date must be after the start date';

      return true;
    },
  });

  await taskService.create(start, end, title, project.id);
};

const editTask = async () => {
  const data = await taskService.selectAll();
  if (!data.length) return;

  const projects = await selectAllProjects();

  const taskTitle = await inquirer.search({
    message: 'Which one would you like to edit?',
    source: input => {
      const choices = data
        .map(t => ({
          ...t,
          projectName:
            projects.find(p => p.id === t.project_id).name || 'missing',
        }))
        .map(({title, projectName}) => ({
          name: `${title}:${projectName}`,
          value: `${title}:${projectName}`,
        }))
        .concat({name: 'Stop', value: 'Stop'});

      if (!input) return choices;
      return choices.filter(choice =>
        choice.name.toLowerCase().includes(input.toLowerCase()),
      );
    },
  });

  if (name === 'Stop') return;

  const task = data.find(d => d.title === taskTitle.split(':')[0]);

  const title = await inquirer.input({
    message: 'Insert task title',
    validate: input => {
      if (input.toLowerCase() === 'exit') {
        console.log('Exiting the process...');
        process.exit(); // TODO: add prpper handling when user what to stop action, whole app
      }
      let resp;
      if ((resp = isTaskInvalid(input))) return resp;

      return true;
    },
  });

  const name = await inquirer.search({
    message: 'Select project',
    source: input => {
      const choices = projects
        .map(({name}) => name)
        .map(f => ({
          name: f,
          value: f,
        }))
        .concat({name: 'Stop', value: 'Stop'});

      if (!input) return choices;
      return choices.filter(choice =>
        choice.name.toLowerCase().includes(input.toLowerCase()),
      );
    },
  });

  if (name === 'Stop') return;
  const project = projects.find(c => c.name === name);

  // Get current date and time
  const taskStart = new Date(task.start);
  const dateStart = taskStart.toISOString().split('T')[0]; // format YYYY-MM-DD
  const timeStart = taskStart.toTimeString().split(' ')[0].slice(0, 5); // format HH:mm
  const taskDefStart = `${dateStart} ${timeStart}`;

  const taskEnd = new Date(task.end);
  const dateEnd = taskEnd.toISOString().split('T')[0]; // format YYYY-MM-DD
  const timeEnd = taskEnd.toTimeString().split(' ')[0].slice(0, 5); // format HH:mm
  const taskDefEnd = `${dateEnd} ${timeEnd}`;

  // Prompt for start and end dates with time
  const start = await inquirer.input({
    message: 'Enter start date and time (YYYY-MM-DD HH:mm)',
    default: taskDefStart,
    validate: input => {
      let resp;
      if ((resp = isDateInvalid(input)))
        return 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';

      return true;
    },
  });

  const end = await inquirer.input({
    message: 'Enter end date and time (YYYY-MM-DD HH:mm)',
    default: taskDefEnd,
    validate: input => {
      let resp;
      if ((resp = isDateInvalid(input)))
        return 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';

      if (new Date(input) <= new Date(start))
        return 'End date must be after the start date';

      return true;
    },
  });

  await taskService.update(task.id, start, end, title, project.id);
};

const selectAllTasks = async () => {
  const tasks = await taskService.selectAll();
  console.log(tasks.map(d => d.title));
  return tasks;
};

const deleteTask = async () => {
  const data = await taskService.selectAll();

  if (!data.length) return;

  const projects = await selectAllProjects();

  const taskTitle = await inquirer.search({
    message: 'Which one would you like to edit?',
    source: input => {
      const choices = data
        .map(t => ({
          ...t,
          projectName:
            projects.find(p => p.id === t.project_id).name || 'missing',
        }))
        .map(({title, projectName}) => ({
          name: `${title}:${projectName}`,
          value: `${title}:${projectName}`,
        }))
        .concat({name: 'Stop', value: 'Stop'});

      if (!input) return choices;
      return choices.filter(choice =>
        choice.name.toLowerCase().includes(input.toLowerCase()),
      );
    },
  });

  if (taskTitle === 'Stop') return;

  const task = data.find(d => d.title === taskTitle.split(':')[0]);

  return taskService.delete(task.id);
};

export {createTask, editTask, selectAllTasks, deleteTask};
