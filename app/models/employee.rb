class Employee < ApplicationRecord
    has_many :invoices
    has_many :products
    has_many :clients

    has_secure_password
end
