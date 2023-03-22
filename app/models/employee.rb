class Employee < ApplicationRecord
    has_many :invoices
    has_many :products, through: :invoices
    has_many :clients
end
