import request from 'supertest'
import app from '../app'

describe('sign up', () => {
    it('sign up: empty userName', async () => {
        const response = await request(app).post('/admin/createAdmin').send(
            {
                userName: "",
                password: 'admin4'
            }
        );
        console.log('Result of sign up empty username:',response._body);
        expect(response._body.status).toBe(false);
               
    });

    it('sign up empty password', async () => {
        const response = await request(app).post('/admin/createAdmin').send(
            {
                userName: "",
                password: 'admin4'
            }
        );
        console.log('Result of sign up empty password:',response._body);
        expect(response._body.status).toBe(false);
        
    });

    it('sign up empty username & password', async () => {
        const response = await request(app).post('/admin/createAdmin').send(
            {
                userName: "",
                password: ''
            }
        );
        console.log('Result of sign up empty username & password:',response._body);
        expect(response._body.status).toBe(false);
        
    });

    it('sign up for new admin', async () => {
        const response = await request(app).post('/admin/createAdmin').send(
            {
                userName: "Admin4",
                password: 'admin4'
            }
        );
        console.log('Result of sign up new admin:',response._body);
        expect(response._body.status).toBe(true);
        
    });

    it('sign up for existing admin', async () => {
        const response = await request(app).post('/admin/createAdmin').send(
            {
                userName: "Admin1",
                password: 'admin1'
            }
        );
        console.log('Result of sign up existing admin:',response._body);
        //expect(request._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: ' User is exist' });
        
    });

});

describe('login admin', () => {
    it('log in: empty userName', async () => {
        const response = await request(app).post('/admin/login').send(
            {
                userName: "",
                password: 'admin4'
            }
        );
        console.log('Result of login empty username:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Invalid username or password' });
    });

    it('log in empty password', async () => {
        const response = await request(app).post('/admin/login').send(
            {
                userName: "",
                password: 'admin4'
            }
        );
        console.log('Result of login empty password:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({
            status: false,
            message: 'Email or password is incorrect',
        });
    });

    it('login empty username & password', async () => {
        const response = await request(app).post('/admin/login').send(
            {
                userName: "",
                password: ""
            }
        );
        console.log('Result of login empty username & password:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Invalid username or password' });
    });

    it('login incorrect username', async () => {
        const response = await request(app).post('/admin/login').send({
            userName:"Admin5",
            password:"admin1"
        });
        console.log('Result of login incorrect user:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Invalid username or password' });
    });

    it('login incorrect password', async () => {
        const response = await request(app).post('/admin/login').send({
            userName:"Admin1",
            password:"admin3"
        });
        console.log('Result of login incorrect password:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({
            status: false,
            message: 'Email or password is incorrect',
        });
        
    });

    it('login incorrect password & username', async () => {
        const response = await request(app).post('/admin/login').send({
            userName:"admin123",
            password:"abc123"
        });
        console.log('Result of login incorrect username & password:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Invalid username or password' });
    });

    it('login correct username & password', async () => {
        const response = await request(app).post('/admin/login').send({
            userName:"Admin1",
            password:"admin1"
        });
        console.log('Result of login correct username & password:',response._body);
        expect(response._body.status).toBe(true);
        //expect(response._body).toMatchObject({ status: false, message: 'secretOrPrivateKey must have a value' });
        
    });
    
});

describe('refresh token', () => {
    it('refresh token empty userID', async () => { 
        const response=await request(app).put("/admin/refreshToken").send({
            userId:"",
            refreshToken:"abc123"
        });
        console.log('Result of refresh token empty userId:',response._body);
        expect(response._body.status).toBe(false);
        
        
     });

     it('refresh token empty token', async () => { 
        const response=await request(app).put("/admin/refreshToken").send({
            userId:"62596d88a873344c9378ebd4",
            refreshToken:""
        });
        console.log('Result of refresh token empty token:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'refresh token is  undefined' });
        
     });

     it('refresh token empty all', async () => { 
        const response=await request(app).put("/admin/refreshToken").send({
            userId:"",
            refreshToken:""
        });
        console.log('Result of refresh token empty all:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'refresh token is  undefined' });
     });
    
    it('refresh token invalid userID', async () => { 
        const response=await request(app).put("/admin/refreshToken").send({
            userId:"123",
            refreshToken:"abc123"
        });
        console.log('Result of refresh token invalid userId:',response._body);
        expect(response._body.status).toBe(false);
        
        
     });

    it('refresh token invalid refreshToken', async () => { 
        const response=await request(app).put("/admin/refreshToken").send({
            userId:"62596d88a873344c9378ebd4",
            refreshToken:"assjdjdf"
        });
        console.log('Result of refresh token invalid token:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: ' refresh Token not found' });
    });

    it('refresh token invalid all', async () => { 
        const response=await request(app).put("/admin/refreshToken").send({
            userId:"abc123",
            refreshToken:"assjdjdf"
        });
        console.log('Result of refresh token invalid token:',response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: ' refresh Token not found' });
        
    });

    it('refresh token valid all', async () => { 
        const response=await request(app).put("/admin/refreshToken").send({
            userId:"62596d88a873344c9378ebd4",
            refreshToken:"trnsbxdevuatprod"
        });
        console.log('Result of refresh token valid all:',response._body);
        expect(response._body.status).toBe(true);
        
    });
});
