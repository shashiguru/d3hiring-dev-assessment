import { Registration } from "../entity/registration";
import { Student } from "../entity/student";
import { DataSource } from "typeorm"

export class StudentService implements IStudentService {

    constructor(private db: DataSource) {
    }

    public async CreateStudent(studentEmailId: string): Promise<void> {
        let student = new Student();
        if ((await this.db.manager.find(Student)).filter(x => x.email == studentEmailId).length == 0) {
            student.email = studentEmailId;
            student.status = true;
            student.createdDate = new Date();
            student.updatedDate = new Date();
            await this.db.manager.save(student);
        }
    }

    public async SuspendStudent(emailId: string): Promise<boolean> {
        const studentRepo = this.db.getRepository(Student);
        const student = await studentRepo.findOneBy({ email: emailId })
        student.status = false;
        await studentRepo.save(student);
        return true;
    }

    public async GetCommonStudents(emailIds:any):Promise<Array<string>>{
        let Ids=[];
        typeof(emailIds)=='string'?Ids.push(emailIds):Ids=emailIds;
        let commoStudents=[];
        const students= await this.db.getRepository(Registration)
        .createQueryBuilder("registration")
        .select("COUNT(registration.studentEmail) AS cnt, registration.studentEmail ")
        .where("registration.teacherEmail IN (:...ids)", { ids: Ids })
        .groupBy("registration.studentEmail").getRawMany();
        let common=students.filter(x=>x.cnt==Ids.length);
        if(common.length>0){
            common.map(student=>{
                commoStudents.push(student.studentEmail);
            })
        }
        return commoStudents;
    }

    public async RetrieveforNotifications(teacher:string, notification:string): Promise<Array<string>>{
        let notifiedstudents= new Array<string>();
        if(notification.split(' @').length>1){
            for(var i=1; i<notification.split(' @').length;i++){
                notifiedstudents.push(notification.split(' @')[i]);
            }
        }
        let studentsRegistrations=(await this.db.manager.find(Registration)).filter(x => x.teacherEmail == teacher);
        let studentsData= await this.db.manager.find(Student);
        studentsRegistrations.map(async(student)=>{
                   if(studentsData.filter(x=>x.email==student.studentEmail)[0].status) 
                   {
                    notifiedstudents.push(student.studentEmail);
                   }
                })
        return notifiedstudents;
    }

}

export interface IStudentService{
    RetrieveforNotifications(teacher:string, notification:string): Promise<Array<string>>
    GetCommonStudents(emailIds:any):Promise<Array<string>>
    SuspendStudent(emailId: string): Promise<boolean>
    CreateStudent(studentEmailId: string): Promise<void>
}