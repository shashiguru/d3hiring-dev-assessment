import { Registration } from "../entity/registration";
import { DataSource } from "typeorm"
import { IStudentService } from "./student-service";
import { ITeacherService} from "./teacher-service";

export class RegistrationService implements IRegistrationService{

    constructor(private db: DataSource,
        private teacherService:ITeacherService,
        private studentService:IStudentService,) {
    }

    private async Register(studentEmailId:string, teacherEmailId:string):Promise<void>{
            let registration= new Registration();
            registration.studentEmail=studentEmailId;
            registration.teacherEmail=teacherEmailId;
            registration.createdDate= new Date();
            await this.db.manager.save(registration)
    }

    public async CreateRegistration(teacherEmailId:string, studentEmailIds:Array<string>):Promise<boolean>{
        await this.teacherService.CreateTeacher(teacherEmailId);
        studentEmailIds.forEach(async(studentEmailId)=>{
            await this.studentService.CreateStudent(studentEmailId);
            await this.Register(studentEmailId, teacherEmailId);
        });
        return true;
    }
}

export interface IRegistrationService{
    CreateRegistration(teacherEmailId:string, studentEmailIds:Array<string>):Promise<boolean>
}