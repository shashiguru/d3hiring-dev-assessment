import {Request, Response} from "express";
import StudentService from "../../services/student-service";
import TeacherService from "../../services/teacher-service";
import Registrtionservice from "../../services/registration-service";


export default class AdministrationController{
    studentService:StudentService;
    teacherService:TeacherService;
    registrationService:Registrtionservice;
    constructor() {
        this.studentService= new StudentService();
        this.teacherService= new TeacherService();
        this.registrationService= new Registrtionservice();
    }
    public healthCheck=(req:Request, res:Response) => {
        res.status(200).json({
            message:"API is healthy!"
        })
    }
    
    public commonStudents = async (req:Request, res:Response) => {
        try {
            let response = await this.studentService.GetCommonStudents(req.query.teacher);
            if(response){
                res.status(200).json({
                    "students":response
                });
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
       
    }
    
    public register = (req:Request, res:Response) => {
        try{
            let response =this.registrationService.CreateRegitration(req.body.teacher, req.body.students);
            if (response) {
                res.status(204).json({
                    message: response
                })
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
        //201 - created suitable for this
    }
    
    public suspend = (req:Request, res:Response) => {
        try{
            const response=this.studentService.SuspendStudent(req.body.student);
                if (response) {
                    res.status(204).json({
                        message: response
                    })
                }
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
        //202 - accepted suitable for this
    }
    
    public notifications = async (req:Request, res:Response) => {
        try{
           const response= await this.studentService.RetrieveforNotifications(req.body.teacher, req.body.notification);
                    if (response) {
                        res.status(200).json({
                            "recipients": response
                        })
                    }
        }
        catch(error){
            console.log(error)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

}

