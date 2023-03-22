# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "faker"
puts "Seeding data"

Employee.destroy_all
Invoice.destroy_all
Client.destroy_all
Product.destroy_all

Employee.create(
    name: "Allen Carrera",
    email: "allen@email.com",
    password: "test123",
    is_admin: true
)

Employee.create(
    name: "John Smith",
    email: "test@email.com",
    password: "test12345",
    is_admin: false
)

Employee.create(
    name: "Justin Gaethje",
    email: "justin@email.com",
    password: "justin123",
    is_admin: true
)

Employee.create(
    name: "Jon Snow",
    email: "john@email.com",
    password: "snow123",
    is_admin: true
)

Employee.create(
    name: "Jennifer Walker",
    email: "jennifer@email.com",
    password: "test12345",
    is_admin: false
)

Employee.create(
    name: "Tyler Clark",
    email: "Tyler@email.com",
    password: "test12345",
    is_admin: true
)

Employee.create(
    name: "Kris Johnson",
    email: "kris@email.com",
    password: "test12345",
    is_admin: true
)


Product.create(
    name: "Botox",
    product_type: "Neurotoxins",
    cost_price: 7,
    retail_price: 13

)

Product.create(
    name: "Kybella",
    product_type: "Fat Dissolvers",
    cost_price: 600,
    retail_price: 1200

)

Product.create(
    name: "Juvederm Ultra XC",
    product_type: "Juvederm",
    cost_price: 350,
    retail_price: 700

)

Product.create(
    name: "Juvederm Ultra Plus XC",
    product_type: "Juvederm",
    cost_price: 350,
    retail_price: 700

)

Product.create(
    name: "Voluma",
    product_type: "Juvederm",
    cost_price: 416,
    retail_price: 800

)

Product.create(
    name: "RHA2",
    product_type: "Revance",
    cost_price: 300,
    retail_price: 650

)

Product.create(
    name: "RHA3",
    product_type: "Revance",
    cost_price: 300,
    retail_price: 650

)
Product.create(
    name: "Redensity",
    product_type: "Revance",
    cost_price: 300,
    retail_price: 650

)

Product.create(
    name: "Versa",
    product_type: "Prollenium",
    cost_price: 250,
    retail_price: 600

)

Product.create(
    name: "Revenesse Lips",
    product_type: "Prollenium",
    cost_price: 250,
    retail_price: 600

)

Product.create(
    name: "Vit C 1500mg",
    product_type: "IV Boosters",
    cost_price: 3,
    retail_price: 25

)

Product.create(
    name: "Vit C 10000mg",
    product_type: "IV Boosters",
    cost_price: 21,
    retail_price: 75

)

15.times do
    Client.create(
        name: Faker::Books::Dune.character,
        employee_id: Employee.all.sample.id
    )
end

10.times do
    Invoice.create(
        employee_id: Employee.all.sample.id,
        product_id: Product.all.sample.id, 
        client_id: Client.all.sample.id,
        charge: Product.all.sample.retail_price 
    )
    end