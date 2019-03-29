const fs = require('fs');
const chalk = require('chalk');

const addNote = function(title,body){
	const alreadydata = loadNotes();	//load all data as objects
	const data = {
		title: title,
		body: body
	}

	const isRepeated = alreadydata.filter(function(note){	//check if title is repeated
		return note.title === title;
	});

	if(isRepeated.length == 0)
	{
		alreadydata.push(data);
	}
	else
	{
		console.log('title already exists');
	}
	
	saveNote(alreadydata);	//overwrite the notes.json file
}

const saveNote = function(dataarr){
	strdata = JSON.stringify(dataarr);	//dataarr to a string
	fs.writeFileSync('notes.json',strdata);
}

const loadNotes = function(){
	try{
		const bin_data = fs.readFileSync('notes.json');
		const data = bin_data.toString();
		return JSON.parse(data);	// convert string to object
	} catch(e){
		return [];
	}
}

const removeNote = function(title){
	const alreadydata = loadNotes();
	const newarr = alreadydata.filter(function(note){
		return note.title !== title;
	});

	if(newarr.length > 0)
	{
		saveNote(newarr);	
	}
	else
	{
		console.log(chalk.green('All removed'));
	}
}

const listNotes = function(){
	const data = loadNotes();
	data.forEach((x) => { console.log(chalk.red(x.title) + " - " + chalk.blue(x.body) ) });
}

const searchNote = function(title){
	const alreadydata = loadNotes();
	const chk = alreadydata.find(function(note){
		return note.title === title;
	});

	if(chk)
	{
		console.log(chalk.green('Found !!!'));	
	}
	else
	{
		console.log(chalk.red('Not Found !!!'));
	}
}

module.exports = {
	addNote: addNote,
	saveNote: saveNote,
	removeNote: removeNote,
	listNotes: listNotes,
	searchNote: searchNote
}