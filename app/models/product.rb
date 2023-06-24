class Product < ApplicationRecord
  has_many :products_invoices, class_name: 'ProductInvoice'
  has_many :invoices, through: :products_invoices
  has_many :products_quantities, class_name: 'ProductQuantity'
end
