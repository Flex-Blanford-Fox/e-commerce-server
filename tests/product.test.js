const request = require(`supertest`)
const app = require(`../app`)
const {sequelize} = require(`../models/index`)
let token = ``
const jwt = require(`jsonwebtoken`)

beforeAll((done)=>{
    try {
        token = jwt.sign({
            email:"admin@mail.com"
        }, "LULUS")
        done()
    } catch (error) {
        done(error)
    }
})

describe(`GET /products`, function(){
    it(`success case get products`, function (done) {
        request(app)
            .get(`/products`)
            .set("access_token", token)
            
            .then(response=>{
                expect(response.status).toBe(200)
                expect(response.body).toEqual(
                    expect.any(Array))
                done()
            })
            .catch(err=>{
                done(err)
            })
    })
})

describe(`POST /products`, function(){
    it(`success case post propduct`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", token)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:50000, stock:50}
        )
        .then(response=>{
            expect(response.status).toBe(201)
            expect(response.body).toEqual(
                expect.any(Object))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post propduct - No Token`, function(done){
        request(app)
        .post(`/products`)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:50000, stock:50}
        )
        .then(response=>{
            expect(response.status).toBe(401)
            expect(response.body).toEqual(
                expect.any(Object))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post propduct - Not Admin`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", "wefpiouwyefiuwhefiouwehf")
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:50000, stock:50}
        )
        .then(response=>{
            expect(response.status).toBe(401)
            expect(response.body).toEqual(
                expect.any(Object))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post propduct - Required Field not received`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", token)
        .send(
            {name: "Baju Tidur"}
        )
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body).toEqual(
                expect.any(Object))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post propduct - Stock Minus`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", token)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:50000, stock:-50}
        )
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body).toEqual(
                expect.any(Object))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post propduct - Price Minus`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", token)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:-50000, stock:50}
        )
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body).toEqual(
                expect.any(Object))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post propduct - Wrong datatypes`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", token)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:"haha", stock:50}
        )
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body).toEqual(
                expect.any(Object))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})