import { describe, it, expect, jest} from '@jest/globals'
import { Registrtionservice } from '../../src/services/registration-service';
import { IStudentService }from '../../src/services/student-service';
import { ITeacherService } from '../../src/services/teacher-service';

describe("Regristration Service",function(){

    let teacherService = { CreateTeacher: jest.fn(e => null) }
    let studentService = {
        CreateStudent: jest.fn(e => null),
        RetrieveforNotifications: jest.fn(e => null),
        GetCommonStudents: jest.fn(e => null),
        SuspendStudent: jest.fn(e => null),
    }
    it("Create registration will create a teacher",function(done){

        let subject = new Registrtionservice(teacherService, studentService);

        let actual = subject.CreateRegitration('', []);

        expect(teacherService.CreateTeacher).toBeCalled();
        
    });
});
  