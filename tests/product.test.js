const request = require(`supertest`)
const app = require(`../app`)
const {sequelize, Product} = require(`../models/index`)
let token = ``
let wrongToken = ``
let newId
const jwt = require(`jsonwebtoken`)

beforeAll((done)=>{
  sequelize.queryInterface.bulkDelete("Products", null, {})
  .then(()=>{
    try {
      token = jwt.sign({
        email:"admin@mail.com"
      }, "LULUS")
      wrongToken = jwt.sign({
        email:"wrong@mail.com"
      }, "LULUS")
      Product.create({name: "Baju untuk Test", image_url: "www.google.com", price:50000, stock:50}, {returning:true})
      .then(data=>{
        newId = data.id
        console.log(newId);
        done()
      })
      .catch(err=>{
            console.log(err);
          })
    } catch (error) {
        done(error)
    }
  })
  .catch(err =>{
    done(error)
  })
})

// afterAll((done) => {
//   sequelize.queryInterface.bulkDelete("Products", null, {})
//   done()
// });

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
    it(`success case post product`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", token)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:50000, stock:50}
        )
        .then(response=>{
            expect(response.status).toBe(201)
            // expect(response.body).toEqual(
            //     expect.any(Object))
            expect(response.body).toHaveProperty(`name`, "Baju Tidur")
            expect(response.body).toHaveProperty(`image_url`, "www.google.com")
            expect(response.body).toHaveProperty(`price`, 50000)
            expect(response.body).toHaveProperty(`stock`, 50)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post product - No Token`, function(done){
        request(app)
        .post(`/products`)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:50000, stock:50}
        )
        .then(response=>{
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty(`message`, "Authentication Failed")
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post product - Not Admin`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", wrongToken)
        .send(
            {name: "Baju Tidur", image_url: "www.google.com", price:50000, stock:50}
        )
        .then(response=>{
          // console.log(response.body);
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty(`message`, "Authorization Failed")
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it(`failed case post product - Required Field not received`, function(done){
        request(app)
        .post(`/products`)
        .set("access_token", token)
        .send(
            {name: "Baju Tidur"}
        )
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty(`message`, "Sequelize Error")
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
            expect(response.body).toHaveProperty(`message`, "Price and Stock has to be NUMBER >= 0")
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
            expect(response.body).toHaveProperty(`message`, "Price and Stock has to be NUMBER >= 0")
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it.only(`failed case post propduct - Wrong datatypes`, function(done){
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

describe('PUT /products', function() {
  it('success case put product', function(done) {
    // console.log(newId);
    request(app)
      .put(`/products/${newId}`)
      .set('access_token', token)
      .send(
        {name: "Baju Tidur SUPERMAN", image_url: "www.google.com", price:1000000, stock:50}
      )
      .then(response=>{
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.arrayContaining([1]))
        done()
    })
    .catch(err=>{
        done(err)
    })
  });

  it(`failed case put propduct - No Token`, function(done ){
    request(app)
    .put(`/products/${newId}`)
    .send(
      {name: "Baju Tidur SUPERMAN", image_url: "www.google.com", price:1000000, stock:50}
    )
    .then(response=>{
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty(`message`, "Authentication Failed")
        done()
    })
    .catch(err=>{
        done(err)
    })
  })

  it(`failed case put propduct - Not Admin`, function(done){
    request(app)
    .put(`/products/${newId}`)
    .set("access_token", wrongToken)
    .send(
      {name: "Baju Tidur SUPERMAN", image_url: "www.google.com", price:1000000, stock:50}
    )
    .then(response=>{
      // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty(`message`, "Authorization Failed")
        done()
    })
    .catch(err=>{
        done(err)
    })
})

  it(`failed case put propduct - Stock Minus`, function(done ){
    request(app)
    .put(`/products/${newId}`)
    .set('access_token', token)
    .send(
      {name: "Baju Tidur SUPERMAN", image_url: "www.google.com", price:1000000, stock:-50}
    )
    .then(response=>{
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty(`message`, "Price and Stock has to be NUMBER >= 0")
        done()
    })
    .catch(err=>{
        done(err)
    })
  })

  it(`failed case put propduct - Price Minus`, function(done ){
    request(app)
    .put(`/products/${newId}`)
    .set('access_token', token)
    .send(
      {name: "Baju Tidur SUPERMAN", image_url: "www.google.com", price:-1000000, stock:50}
    )
    .then(response=>{
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty(`message`, "Price and Stock has to be NUMBER >= 0")
        done()
    })
    .catch(err=>{
        done(err)
    })
  })

  it(`failed case put propduct - Wrong datatypes`, function(done ){
    request(app)
    .put(`/products/${newId}`)
    .set('access_token', token)
    .send(
      {name: "Baju Tidur SUPERMAN", image_url: "www.google.com", price:"Hahaha", stock:50}
    )
    .then(response=>{
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty(`message`, "Price and Stock has to be NUMBER >= 0")
        done()
    })
    .catch(err=>{
        done(err)
    })
  })

});

describe('DELETE /products', function() {
  it('success case delete product', function(done) {
    // console.log(newId);
    request(app)
      .delete(`/products/${newId}`)
      .set('access_token', token)
      .then(response=>{
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.any(Object))
        done()
    })
    .catch(err=>{
        done(err)
    })
  });

  it('failed case delete product - No Token', function(done) {
    // console.log(newId);
    request(app)
      .delete(`/products/${newId}`)
      .then(response=>{
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty(`message`, "Authentication Failed")
        done()
    })
    .catch(err=>{
        done(err)
    })
  });

  it('failed case delete product - Not Admin', function(done) {
    // console.log(newId);
    request(app)
      .delete(`/products/${newId}`)
      .set('access_token', wrongToken)
      .then(response=>{
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty(`message`, "Authorization Failed")
        done()
    })
    .catch(err=>{
        done(err)
    })
  });
})

