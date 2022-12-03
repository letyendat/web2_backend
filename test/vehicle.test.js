import request from 'supertest'
import app from '../app'


test('get vehicles', async () => {
    const response = await request(app).get('/vehicles').auth("Admin1","admin1");
    console.log("get vehicle:",response._body);
    expect(response._body.status).toBe(true);
});

test('create new vehicle', async () => {
    const response=await request(app).post("/vehicles").auth("Admin1","admin1")
    .send({
        name:"Honda RSX",
        status:"new",
        description:"This is a new model of Honda RSX",
        purpose:0,
        type:0,
        price:30000000
    });

    console.log("create new vehicle:",response._body);
    expect(response._body.status).toBe(true);
});

describe("get vehicle by date",()=>{

    test('empty date', async () => { 
        const response=await request(app).get("/vehicles/date").auth("Admin1","admin1")
        .query(
            {
                dateTime:""
            });

        console.log("get vehicle empty date:",response._body);
        //expect(response._body.status).toBe(false);        
        expect(response._body).toMatchObject({ status: false, message: 'Can not get list vehicle on Date' });
    });

    test('invalid date format', async () => { 
        const response=await request(app).get("/vehicles/date").auth("Admin1","admin1")
        .query(
            {
                dateTime:"15062022"
            });
        console.log("get vehicle invalid date format:",response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Can not get list vehicle on Date' });    
    });

    test('non existing date', async () => { 
        const response=await request(app).get("/vehicles/date").auth("Admin1","admin1")
        .query(
            {
                dateTime:"29/02/2022"
            });
        console.log("get vehicle non existing date:",response._body);
        //expect(response._body.status).toBe(false);  
        expect(response._body).toMatchObject({ status: false, message: 'Can not get list vehicle on Date' });
    });


    test('valid date', async () => { 
        const response=await request(app).get("/vehicles/date").auth("Admin1","admin1")
        .query(
            {
                dateTime:""
            });
            console.log("get vehicle valid date:",response._body);
        expect(response._body.status).toBe(true);        
    });
});

describe('get vehicle by id', () => { 
    test('empty id', async () => { 
        const response=await request(app).get("/vehicles/getVehicleId").auth("Admin1","admin1")
        .query({
            _id:""
        })
        console.log("get vehicle empty id:",response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Can not get list vehicle with Id' });
    });

    test('invalid id', async () => { 
        const response=await request(app).get("/vehicles/getVehicleId").auth("Admin1","admin1")
        .query({
            _id:'62596d88a873344c9378ebd5'
        })
        console.log("get vehicle invalid id:",response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Can not get list vehicle with Id' });
    });

    test('valid id', async () => { 
        const response=await request(app).get("/vehicles/getVehicleId").auth("Admin1","admin1")
        .query({
            _id:"62596d88a873344c9378ebd4"
        })
        console.log("get vehicle valid id:",response._body);
        expect(response._body.status).toBe(true);
    });
});

describe('get vehicle by type', () => { 

    test('empty type', async () => { 
        const response=await request(app).get("/vehicles/getVehiclesType").auth("Admin1","admin1")
        .query({
            type:null
        });
        console.log("get vehicle empty type:",response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Can not  vehicle with Type' });
    });
    

    test('invalid type', async () => { 
        const response=await request(app).get("/vehicles/getVehiclesType").auth("Admin1","admin1")
        .query({
            type:"1"
        });
        console.log("get vehicle invalid type:",response._body);
        //expect(response._body.status).toBe(false);
        expect(response._body).toMatchObject({ status: false, message: 'Can not  vehicle with Type' });
    });

    test('valid type', async () => { 
        const response=await request(app).get("/vehicles/getVehiclesType").auth("Admin1","admin1")
        .query({
            type:0
        });
        console.log("get vehicle valid type:",response._body);
        expect(response._body.status).toBe(true);
    });
});


