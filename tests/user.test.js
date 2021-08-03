const request = require(`supertest`)
const app = require(`../app`)
const {sequelize} = require(`../models/index`)
const {user} = require(`../seeders/20210726044818-add_admin_to_database`)

beforeAll((done) =>{
    sequelize.queryInterface.bulkDelete("Users", {})
        .then(()=>{
          sequelize.queryInterface.bulkInsert("Users", user, {})
        })
        .then(()=>{
          done()
        })
        .catch(err => done(err))
})

describe(`POST /login`, function(){
    it(`success case`, function (done) {
        request(app)
            .post(`/login`)
            .send({
                email: "admin@mail.com",
                password: "1234"
            })
            .then(response=>{
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty(`access_token`, expect.any(String))
                done()
            })
            .catch(err=>{
                done(err)
            })
    })

    it(`Email ada Password Salah`, function (done) {
        request(app)
            .post(`/login`)
            .send({
                email: "admin@mail.com",
                password: "12"
            })
            .then(response=>{
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty(`message`, "Username/Password Salah")
                done()
            })
            .catch(err=>{
                done(err)
            })
    })

    it(`Email tidak ada di db`, function (done) {
        request(app)
            .post(`/login`)
            .send({
                email: "aa@mail.com",
                password: "12"
            })
            .then(response=>{
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty(`message`, "Username/Password Salah")
                done()
            })
            .catch(err=>{
                done(err)
            })
    })

    it(`tidak ada input email dan password`, function (done) {
        request(app)
            .post(`/login`)
            .send({
                email: "",
                password: ""
            })
            .then(response=>{
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty(`message`, "Username/Password Salah")
                done()
            })
            .catch(err=>{
                done(err)
            })
    })
})