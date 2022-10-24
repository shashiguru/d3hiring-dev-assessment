import { Teacher } from "../entity/teacher";
import { DataSource } from "typeorm"

export class TeacherService implements ITeacherService{

    constructor(private db: DataSource) {
    }
    
    public async CreateTeacher(emailId: string): Promise<boolean>{
        let teacher = new Teacher();
        if((await this.db.manager.find(Teacher)).filter(x => x.email == emailId).length == 0) {
            teacher.email = emailId;
            teacher.createdDate = new Date();
            teacher.updatedDate = new Date();
            await this.db.manager.save(teacher).catch((err: any) => {
                console.log(err);
            });
        }
        return true;
    }
    
}

export interface ITeacherService{
    CreateTeacher(emailId: string): Promise<boolean>
}