class Product < ApplicationRecord
  validates_uniqueness_of :name  
  has_many :products_invoices, class_name: 'ProductInvoice'
  has_many :invoices, through: :products_invoices
  has_one  :inventory, class_name: 'Inventory'
  has_many :inventory_prompts, class_name: 'InventoryPrompt'
  has_many :employees_inventories, class_name: 'EmployeeInventory'
end
