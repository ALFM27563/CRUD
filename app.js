
const express=require('express')
const cors=require("cors");
const app=express()
//Si vamos a usar cualquier otra base de datos hay que descargarlo de la misma manera que "npn install mysql --save"
const mysql=require('mysql')
//Para parseo como en parseInt
var bodyParser=require('body-parser')
var con=mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'prueba'
    //La maestra descargó la extensión BlackBox porque Alan alto le dijo, pero creo que no les funcionó xd
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
//Le decimos al servidor que utilizamos public para archivos cliente
app.use(express.static('public'))
let output;
  
const setOutput = (rows) => {
    output = rows;
    console.log(output);
}

app.post('/agregarReceta',(req,res)=>{
    let nomR=req.body.nombreR
    let ingredientes=req.body.ingredientes
    let id=req.body.id
    con.query('Insert into receta (nom_receta, ing_receta,num_receta) values  ("'+nomR+'", "'+ingredientes+'","'+id+'")  ',(err,respuesta,fields)=>{
        if(err) return console.log('Error',err)
        return res.send('<h1>La receta ha sido agregada  perfectamente</h1> <br><br><a href="index.html"><button>Volver a Inicio</button></a>')

    })  
})
app.post('/eliminarReceta',(req,res)=>{
    let id=req.body.id
    console.log(id)
    con.query('DELETE FROM receta where num_receta="'+id+'";',(err,respuesta,fields)=>{
       if(err) return console.log('Error',err) 
        return res.send('<h1>La receta ha sido eliminada perfectamente</h1> <br><br><a href="index.html"><button>Volver a Inicio</button></a>')
    })  
})

app.get('/recetas',(req,res)=>{
    con.query('SELECT * FROM receta',(err,rows,fields)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err);
    })
});
/*app.get('/mReceta',(req,res)=>{
    let id=req.query.id;
    let id2=req.params.no;
    console.log("Este es el id "+id + id2)
    con.query('select * from receta where num_receta="' + id + '";',(err,rows,fields)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err);
        
    })
});*/
app.post('/mReceta2',(req,res)=>{
    let id=req.body.id;
    let nombre=req.body.nom
    let ingredientes=req.body.ing
    if(id==null || nombre==null) return("<h1>Debes poner elegir un elemento de la tabla </h1> <br><button> modificarR</button>")

    console.log("Este es el id "+id + " El nombre: " + nombre +" E ingredientes: " + ingredientes) 
    con.query('UPDATE receta set nom_receta="'+nombre+'", ing_receta="'+ingredientes+'" where num_receta="'+id+'";  ',(err,rows,fields)=>{
        if(!err)
        {
            console.log(rows)
            return res.send('<h1>La receta ha sido modificada perfectamente</h1> <br><br><a href="index.html"><button>Volver a Inicio</button></a>')
        }
        else
        console.log(err);
        
    })
});
app.listen(3000,()=>{
    console.log("Puerto escuchando en 3000")

})
//En el json ponemos "start":"node app.js"//