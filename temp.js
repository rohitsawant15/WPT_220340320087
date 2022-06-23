
const express = require('express');
const app = express();
const mysql = require('mysql2');
// app.use(cors());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
});

app.get("/getbook",(req,res)=>{
	let id= req.query.id;
	let output = {status: false, detail:{id:0,name:'',price:0}}
	connection.query('select * from book where bookid=?',[id],(error,rows)=>{
		if(error){
			console.log("Error");
		}else{if(rows.length>0){
				output.status = true;
				output.detail.id=rows[0].bookid;
				output.detail.name=rows[0].bokname;
				output.detail.price=rows[0].price;
		}else{
			console.log("No book");
		}
			
		}
		res.send(output);
	})
})

app.get("/addb",(req,res)=>{
	let bookid= req.query.id;
	let bookname= req.query.bookname;
	let price= req.query.price;
	let output = {status: false, detail:{id:0,name:'',price:0}}
	connection.query('select * from book where bookid=?',[id],(error,rows)=>{
		if(error){
			console.log("Error");
		}else{if(rows.length>0){
				output.status = true;
				output.detail.id=rows[0].bookid;
				output.detail.name=rows[0].bokname;
				output.detail.price=rows[0].price;
		}else{
			console.log("No book");
		}
			
		}
		res.send(output);
	})
})

const bodyParser = require('body-parser');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;
//add books
app.post('/addbook', function (req, res) {
		let input = {
			bookid: req.query.bookid,
			bookname: req.query.bookname,
			price: req.query.price,

		}

		console.log(input);
		// let output=false;
		console.log("reading input bookid " + req.query.bookid +  "  bookname " + req.query.bookname+ " price ")
		connection.query("insert into book (bookid,bookname,price) values (?,?,?)", [input.bookid,input.bookname,input.price], (err, res1) => {
			if (err) {
				result = err;
				console.log("trouble " + err);
			} else {
				result = res1;
				console.log("success" + result)
			}
			
			console.log("Adding" + result);
			res.send(result);
		});
    	var xyz ={ bookid:"", bookname:"", price:""};
        res.send(xyz);
    });

//get Elements
app.get('/poc2', function (req, res) {
    connection.query("select * from book", [], (err, res1) => {
		console.log(res1);
        if (err) {
            result = err;
			console.log("trouble " + err);
        } else {
            result = res1;
			console.log("success" + result)
        }
		
		// console.log("38 " + );
        res.send(result);
    });
	
        console.log("reading input " + req.query.xyz);
		
    	var xyz ={ bookid :37, bookname:35, price:""};

		res.send(xyz);

		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});