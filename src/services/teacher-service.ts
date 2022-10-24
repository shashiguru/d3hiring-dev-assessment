import { Teacher } from "../entity/teacher";
import { AppDataSource } from "../infrastucture/data-source";

export class TeacherService{

    constructor() {
    }
    
    public async CreateTeacher(emailId: string): Promise<boolean>{
        let teacher = new Teacher();
        if((await AppDataSource.manager.find(Teacher)).filter(x => x.email == emailId).length == 0) {
            teacher.email = emailId;
            teacher.createdDate = new Date();
            teacher.updatedDate = new Date();
            await AppDataSource.manager.save(teacher).catch((err: any) => {
                console.log(err);
            });
        }
        return true;
    }
    
}

export interface ITeacherService{
    CreateTeacher(emailId: string): Promise<boolean>
}