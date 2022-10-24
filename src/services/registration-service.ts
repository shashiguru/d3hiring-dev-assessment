import { Registration } from "../entity/registration";
import { AppDataSource } from "../infrastucture/data-source";
import StudentService from "./student-service";
import TeacherService from "./teacher-service";

export default class Registrtionservice{

    teacherService:TeacherService;
    studentService:StudentService;
    constructor() {
        this.teacherService= new TeacherService();
        this.studentService= new StudentService();
    }

    private async Register(studentEmailId:string, teacherEmailId:string):Promise<void>{
            let registration= new Registration();
            registration.studentEmail=studentEmailId;
            registration.teacherEmail=teacherEmailId;
            registration.createdDate= new Date();
            await AppDataSource.manager.save(registration)
    }

    public async CreateRegitration(teacherEmailId:string, studentEmailIds:Array<string>):Promise<boolean>{
        await this.teacherService.CreateTeacher(teacherEmailId);
        studentEmailIds.forEach(async(studentEmailId)=>{
            await this.studentService.CreateStudent(studentEmailId);
            await this.Register(studentEmailId, teacherEmailId);
        });
        return true;
    }
}