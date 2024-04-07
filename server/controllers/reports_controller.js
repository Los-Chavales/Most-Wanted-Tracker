const ReportsModel = require("../models/reports_model");
const FormValidations = require("../middlewares/formValidation")

class ReportsController{
  async registerReport(req, res) {

    let validationRes = FormValidations(req.body, req.file)
    if(validationRes.length !== 0){
      console.log(validationRes)
      return res.status(400).json({status:false,errors:validationRes});
    }

    const {name, reported_name, email, date_sighting, phone, state, description} = req.body
    const photo = req.file.filename

    try {      
      const saveReport = new ReportsModel({
        name, 
        reported_name,
        email, 
        date_sighting, 
        phone, 
        state, 
        description,
        photo
      });
      await saveReport.save();
      console.log("Registrado con éxito")
      res.status(200).send("Registrado con éxito")

    } catch (error) {
      console.log(error)
      res.status(500).send("Error al registrar")
    }
  }   
}

module.exports = new ReportsController();