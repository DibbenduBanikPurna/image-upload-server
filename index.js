const express=require('express')
const fileUpload=require('express-fileupload')
const cors=require('cors')

const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hi")
})

app.post('/',  (req,res)=>{
    
        if(req.files.file===null){
            res.status(400).json({
                error:"file not uploaded"
            })
        }
            const file=req.files.avatar

          
            
             file.mv(`${__dirname}/../client/public/uploads/${file.name}`,(err)=>{
                 if(err){
                    console.log(err.message)
                    res.status(500).json({
                        error:err.message
                 
                

                      })
                    }
                    else{
                        
                        res.status(200).json({
                            fileName:file.name,
                            filePath: `/uploads/${file.name}`
                        })
                    }
             })
               
                
                  
                
       
    
    

 
        
   
      

    

})


app.use((err,req,res,next)=>{
    console.log(err.message)
    res.send(err.message)
})

app.listen(4000,()=>{
    console.log("server start")
})