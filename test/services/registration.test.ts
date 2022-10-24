import { RegistrationService } from "../../src/services/registration-service";
import {expect, jest} from '@jest/globals';

describe("Regristration Service",function(){

    let teacherService;
    let studentService;
    let db;
    let subject;

    beforeEach(() => {
        teacherService = { CreateTeacher: jest.fn(() => Promise.resolve()) };
        studentService = {
            CreateStudent: jest.fn(() => Promise.resolve()),
            RetrieveforNotifications: jest.fn(),
            GetCommonStudents: jest.fn(),
            SuspendStudent: jest.fn(),
        }
        db = { manager: {
            save: jest.fn(() => Promise.resolve())
        } }
        subject = new RegistrationService(db, teacherService, studentService);
    });

    it("Create registration will create a teacher",async function(){

        // act
        let actual = await subject.CreateRegistration('teacher@mailid', []);

        //assert
        expect(teacherService.CreateTeacher.mock.calls.length).toBe(1);
        expect(teacherService.CreateTeacher.mock.calls[0][0]).toBe('teacher@mailid');
    });

    it("Create registration will create students",async function(){

        // Arrange
        let students = ['s1@gmail.com', 's2@gmail.com'];

        let actual = await subject.CreateRegistration('teacher@mailid', students);

        expect(studentService.CreateStudent.mock.calls.length).toBe(2);
        expect(studentService.CreateStudent.mock.calls[0][0]).toBe(students[0]);
        expect(studentService.CreateStudent.mock.calls[1][0]).toBe(students[1]);
    });

    it("Create registration will register students for teacher",async function(){

        // Arrange
        let teacher = 'teacher@mailid';
        let students = ['s1@gmail.com', 's2@gmail.com'];

        // Act
        let actual = await subject.CreateRegistration(teacher, students);

        // Assert
        expect(db.manager.save.mock.calls.length).toBe(2);
        expect(db.manager.save.mock.calls[0][0].studentEmail).toBe(students[0]);
        expect(db.manager.save.mock.calls[0][0].teacherEmail).toBe(teacher);
        expect(db.manager.save.mock.calls[1][0].studentEmail).toBe(students[1]);
        expect(db.manager.save.mock.calls[1][0].teacherEmail).toBe(teacher);
    });
    
});
  