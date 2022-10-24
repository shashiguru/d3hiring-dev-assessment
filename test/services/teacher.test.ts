import { TeacherService } from "../../src/services/teacher-service";
import {expect, jest} from '@jest/globals';

describe("Teacher Service",function(){

    let db;
    let subject;

    beforeEach(() => {
        db = { manager: {
            save: jest.fn(() => Promise.resolve()),
            find: jest.fn(() => Promise.resolve())
        } }
        subject = new TeacherService(db);
    });

    it("Create teacher will save teacher details",async function(){

        // Arrange
        db.manager.find.mockResolvedValue([{email: ''}]);
        // act
        let actual = await subject.CreateTeacher('teacher@mailid');

        //assert
        expect(db.manager.save.mock.calls.length).toBe(1);
        expect(db.manager.save.mock.calls[0][0].email).toBe('teacher@mailid');
    });

    it("Create teacher will not create if already exists",async function(){

        // Arrange
        db.manager.find.mockResolvedValue([{email: 'teacher@mailid'}]);
        // act
        let actual = await subject.CreateTeacher('teacher@mailid');

        //assert
        expect(db.manager.save.mock.calls.length).toBe(0);
    });
    
});
  