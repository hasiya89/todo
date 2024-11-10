import { expect } from "chai";
import fetch from 'node-fetch'
import { getToken, initializeTestDb, insertTestUser } from "./helper/test.js";


const base_url = 'http://localhost:3001'

describe('GET Tasks', () => {
    before(() => {
        initializeTestDb()
    })
    it ('should get all tasks', async()=> {
        const response = await fetch(base_url+'/')
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('array').that.is.not.empty
        expect(data[0]).to.include.all.keys('id', 'description')
    })
})

describe('POST Task', () => {
    const email = 'register@foo.com'
    const password = 'register123'
    insertTestUser(email, password)
    const token = getToken(email)
    it ('Should post a task', async()=> {
        const response= await fetch (base_url + '/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description': 'Task from unit test'})
        })

        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })

    it ('Should not post a task without description', async()=> {
        const response= await fetch (base_url + '/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description': null})
        })

        const data = await response.json()
        expect(response.status).to.equal(400, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })

    it ('should not post a task with zero length description', async()=> {
        const response = await fetch (base_url + '/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description': ''})
        })
        const data = await response.json()
        expect(response.status).to.equal(400, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })

})

describe('DELETE Task', () => {
    let taskId;
    let token;  // Declare the token variable

    before(async () => {
        // Step 1: Insert a task to ensure task exists before deleting it
        const response = await fetch(base_url + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Make sure the token is retrieved correctly
                Authorization: token
            },
            body: JSON.stringify({ description: 'Task to be deleted' })
        });

        const data = await response.json();
        taskId = data.id;  // Store the task ID for use in deletion test

        // Step 2: Get the token for authentication (Login)
        const email = 'register@foo.com';
        const password = 'register123';
        const loginResponse = await fetch(base_url + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const loginData = await loginResponse.json();
        token = loginData.token; // Store the token for later use
    });

    it('Should delete a task', async () => {
        const response = await fetch(base_url + `/delete/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token  // Send the token with the DELETE request
            }
        });

        const data = await response.json();
        expect(response.status).to.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id');
        expect(data.id).to.equal(taskId);
    });

    it('Should not delete a task with SQL injection', async () => {
        const response = await fetch(base_url + '/delete/id=0 or id >0', {
            method: 'DELETE',
        });

        const data = await response.json();
        expect(response.status).to.equal(500);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
    });
});



describe('POST register', () => {
    
    it('should not register a user with a password shorter than 8 characters', async () => {
        const email = 'register@foo.com';
        const password = 'short1';
        const response = await fetch(base_url + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        const data = await response.json();
        expect(response.status).to.equal(400,data.error); // Check for 400 status code
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
        expect(data.error).to.equal('Invalid password for user'); // Check error message
    });
    
})


describe('POST login', () => {
    const email = 'register@foo.com';
    const password = 'register123';
    insertTestUser(email, password);

    it('should login with valid credentials', async () => {
        const response = await fetch(base_url + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        // Check for successful response
        expect(response.status).to.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id', 'email', 'token');
    });
});

