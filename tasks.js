const chalk = require('chalk');
const fs = require('fs');

//Add a task.
debugger
const addTask = (name) => {
    const tasks = loadTasks();
    const taskName = name.toString();
    const duplicateTasks = tasks.filter ((task) => task.name === taskName
        );
    if (duplicateTasks.length === 0) {
        tasks.push({
            name: taskName
        });
        saveTasks(tasks);
        console.log('new task added');
    }
    
    else {
        console.log(chalk.red.inverse('Task has been added previously!'));
    }

}

//Saves tasks.
const saveTasks = (tasks) => {
    const tasksJSON = JSON.stringify(tasks);
    fs.writeFileSync('tasks.json', tasksJSON);
};

//Load existing tasks.
const loadTasks = () => {
    try {
        const taskBuffer = fs.readFileSync('tasks.json');
        const tasks = taskBuffer.toString();
        return JSON.parse(tasks);

    } catch (e) {
        return [];
    }
}



//Delete a task.
const deleteTask = (name) => {
    const tasks = loadTasks();
    const remainingTasks = tasks.filter ((task) => {
        return task.name !== name;
    });
    if (remainingTasks.length === tasks.length) {
        console.log(chalk.inverse.red('task doesn\'t exist!'));
    } else {
        saveTasks(remainingTasks);
        console.log('task removed');
    }

}

//List incomplete tasks
const listTasks = () => {
    const tasks = loadTasks();
        tasks.forEach(task => {
            console.log(task.name);
        });
    
}


module.exports = {
    addTask: addTask,
    loadTasks: loadTasks,
    saveTasks: saveTasks,
    deleteTask: deleteTask,
    listTasks: listTasks,
};
