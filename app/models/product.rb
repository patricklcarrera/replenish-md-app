class Product < ApplicationRecord
    has_many :invoices
    # validates :name, presence: true
    # validates :cost_price, numericality: { greater_than_or_equal_to: 29, message: "must be greater than or equal to 29" }
    # validates :retail_price, numericality: { greater_than_or_equal_to: 49,  message: "must be greater than or equal to 49" }
end
