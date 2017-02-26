var express=require('express');
var app = express();
var http = require('http').Server(app);
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
mongoose.connect('mongodb://localhost/belajar_meanv2');
http.listen('3000');
app.get('/',function(req,res){
	res.send('Hello World');
});
//parser application json
app.use(bodyParser.json());

// parse application
app.use(bodyParser.urlencoded({extended: true}));
var barang = mongoose.model('barang',{
	namabarang:{type:String},
	stok:{type:String},
	status:{type:String,default:''}
});
app.get("/getdatabarang",function(req,res){
	barang.find().exec().then(function(docs,err){
		res.json(docs);
	})
})

