const chalk = require('chalk');	
const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log(chalk.red('Title: ') + argv.title)
        console.log(chalk.red('Body: ') + argv.body)
        notes.addNote(argv.title, argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
    	title: {
    		describe: 'Note title',
            demandOption: true,
            type: 'string'
    	}
    },
    handler: function (argv) {
        console.log(chalk.yellow('Removing the note'));
        notes.removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
    	console.log('Listing out all notes');
    	notes.listNotes();
    }
})

// Create read command
yargs.command({
    command: 'search',
    describe: 'Search a note',
    handler: function (argv) {
        console.log('Searching a note');
        notes.searchNote(argv.title);
    }
})

yargs.parse()