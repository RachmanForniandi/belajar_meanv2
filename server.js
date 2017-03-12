var express=require('express');
var app = express();
var http = require('http').Server(app);
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

app.use(bodyParser.json()); 
mongoose.connect('mongodb://localhost/belajar_meanv2');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
http.listen('3000');
app.get('/',function(req,res){
	res.send('Hello World');
});

var Barang = mongoose.model('barang',{
	namabarang:{type:String},
	stok:{type:String},
	status:{type:String,default:''}
});

app.get("/data/api",function(req,res){
	Barang.find().exec().then(function(docs,err){
		res.json(docs);
	})
})

app.post("/data/api",function(req,res){
	var Barangbaru = new Barang();
	Barangbaru.namabarang = req.body.namabarang;
	Barangbaru.stok = req.body.stok;
	Barangbaru.status = req.body.status;
	Barangbaru.save(function(){
		res.end()
	})
});

app.put("/data/api",function(req,res){
	var namabarang = req.body.namabarang;
	var stok = req.body.stok;
	var status = req.body.status;
	var id = req.body.id;
	Barang.update({_id:id},{$set:{
		namabarang:namabarang,
		stok:stok,
		status:status
	}},function(){
		res.end();
	})
});

app.delete("/data/api/:id",function(req,res){
	var id = req.params.id;
	Barang.remove({_id:id},function(err,docs){
	res.end();
	})
})

