import { StudentService } from "../../src/services/student-service";
import { expect, jest } from '@jest/globals';

describe("Student Service", function () {

    let db;
    let repository;
    let subject;

    beforeEach(() => {
        db = {
            manager: {
                save: jest.fn(() => Promise.resolve()),
                find: jest.fn(() => Promise.resolve())
            },
            getRepository: jest.fn<() => any>()
        }
        repository = { 
            findOneBy: jest.fn(() => Promise.resolve()), 
            save: jest.fn(() => Promise.resolve())
        }
        subject = new StudentService(db);
    });

    it("Create student will save student details", async function () {

        // Arrange
        db.manager.find.mockResolvedValue([{ email: '' }]);
        // act
        let actual = await subject.CreateStudent('student@mailid');

        //assert
        expect(db.manager.save.mock.calls.length).toBe(1);
        expect(db.manager.save.mock.calls[0][0].email).toBe('student@mailid');
    });

    it("Create student will not create if already exists", async function () {

        // Arrange
        db.manager.find.mockResolvedValue([{ email: 'student@mailid' }]);
        // act
        let actual = await subject.CreateStudent('student@mailid');

        //assert
        expect(db.manager.save.mock.calls.length).toBe(0);
    });

    it("Suspend student will update student status to false", async function () {

        // Arrange
        let student = { email: 'student@mailid', id: 11, status: true};
        repository.findOneBy.mockResolvedValue(student);
        db.getRepository.mockReturnValue(repository);
        
        // act
        let actual = await subject.SuspendStudent('student@mailid');

        //assert
        expect(repository.save.mock.calls.length).toBe(1);
        expect(repository.save.mock.calls[0][0].status).toBe(false);
    });

});
