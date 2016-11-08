var express = require ("express");
var bodyparser = require ("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(express.static("public"));

var inputTitle, inputAuthor, searchTitle, searchAuthor;

mongoose.connect("mongodb://test:test@ds053156.mlab.com:53156/mongodb-test-valentino", function (err) {
	
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
		mongoose.disconnect();
		return;
	}
	
	else {
		console.log('Connection established');
	}
});

mongoose.connection.once("open", function(err){

	if(err){
		console.log(err);
		mongoose.disconnect();
		return;
	}
	
	else{
		
		var bookSchema = mongoose.Schema({
			
			title: {type: String, unique:true},
			author: {type: String, unique:true}
			
		});
		
		var Book = mongoose.model("Book", bookSchema);
		
	}

	app.post("/submit", function(req, res){
	
		inputTitle = req.body.title;
		inputAuthor = req.body.author;
		console.log(inputTitle, inputAuthor);
	
		Book.create({title:inputTitle, author: inputAuthor}, function(err, snippet){
		
			if(err||!snippet){
				console.log(err);
				return;
			}
		
		});
	
	});

	app.post("/title", function(req, res){
		
		searchTitle = req.body.titles;
		console.log(searchTitle);
		
		Book.findOne({title:searchTitle}, function(err, result){
			
			if(err || !result ){
				console.log(err);
				return;
			}
			
			res.json({title:result.title, author:result.author});
			console.log(result);
			
		});
		
	});
	
	app.post("/author", function(req, res){
		
		searchAuthor = req.body.authors;
		console.log(searchAuthor);
		
		Book.findOne({author: searchAuthor}, function(err, result){
			
			if(err || !result){
				console.log(err);
				return;
			}
			
			res.json({title:result.title, author:result.author});
			console.log(result);
			
		});
		
	});

});

app.listen(process.env.PORT||8080);