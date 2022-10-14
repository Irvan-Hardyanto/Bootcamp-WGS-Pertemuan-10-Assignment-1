//Kode server yg bertugas menyimpan data form ke berkas .json / mendapatkan data form dari berkas .json
const express=require('express');
const fs = require('fs');
const cors = require('cors');
const { body,validationResult,check } = require('express-validator');
var corsOptions = {
    origin:'http://localhost:3000'
};

const app= express();
const port=3002;

//direktori dan nama file kontak.
const dirPath = 'data';
const dataPath = 'data/formData.json';


//periksa apakah folder 'data' sudah dibuat
if (!fs.existsSync(dirPath)) {
    //jika belum, maka buat folder data
    fs.mkdirSync(dirPath);
}

//periksa apakah berkas contacts.json sudah dibuat
if (!fs.existsSync(dataPath)) {
    //jika belum, maka buat file contacts.json
    fs.writeFileSync(dataPath, '[]');
}

//fungsi untuk membaca berkasjson
const loadFormData = () => {
    const file = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(file);
}

//fungsi untuk menyimpan data form ke berkas.json
const saveFormData = (formData) => {
    fs.writeFileSync(dataPath, JSON.stringify(formData));//tulis data yang baru ke dalam berkas .json
}

//untuk decode form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//url pada rest api itu biasanya kata benda
//tidak terlalu panjang
//huruf kecil semua
//sebisa mungkin gak pake spasi

app.options('/submissions', cors(corsOptions))
app.get('/submissions',[cors(corsOptions)],(req,res)=>{
	const submissions = loadFormData();
	res.status(200).send(submissions);
})

const submissionValidator=[
    check("firstName","Please insert your first name").not().isEmpty(),
    check("lastName","Please insert your last name").not().isEmpty(),
    check("employed","Please insert your employment status").not().isEmpty(),
    check("education","Please insert your education!").not().isEmpty(),
    check("expertises","Please insert your expertises!").not().isEmpty(),
    check("tech","Please insert your preffered Tech!").not().isEmpty(),
    check("notes","Please insert ypur notes!").not().isEmpty()
]

app.post('/submissions',[submissionValidator,cors(corsOptions)],(req,res)=>{
	let errorMessages =validationResult(req).array();
	if(!errorMessages.length>0){
		const prevSubmissions = loadFormData();
		prevSubmissions.push({
			id: req.body.id,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			employed: req.body.employed,
			education: req.body.education,
			expertises: req.body.expertises,
			tech: req.body.tech,
			notes: req.body.notes
		})
		saveFormData(prevSubmissions);
		res.sendStatus(200);
	}
})
//untuk preflight options dan mencegah error cors
app.options('/submissions/:name', cors(corsOptions))
app.delete('/submissions/:name',[cors(corsOptions)],(req,res)=>{
	const prevSubmissions = loadFormData();
	saveFormData(prevSubmissions.filter(submission=>submission.firstName!==req.params.name))
})
app.listen(port,()=>{
	console.log(`Example app listening on port ${port}`);
})