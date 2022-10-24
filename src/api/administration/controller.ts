import {Request, Response} from "express";

export default class AdministrationController{

    public healthCheck=(req:Request, res:Response) => {
        res.status(200).json({
            message:"API is healthy!"
        })
    }
    
    public commonStudents = async (req:Request, res:Response) => {
        try {
            let response = await req.services["IStudentService"].GetCommonStudents(req.query.teacher);
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
            let response = req.services["IRegistrationService"].CreateRegitration(req.body.teacher, req.body.students);
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
            const response = req.services["IStudentService"].SuspendStudent(req.body.student);
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
           const response= await req.services["IStudentService"].RetrieveforNotifications(req.body.teacher, req.body.notification);
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

