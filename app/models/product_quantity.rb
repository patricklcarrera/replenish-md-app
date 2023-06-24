# frozen_string_literal: true

class ProductQuantity < ApplicationRecord
  self.table_name = "products_quantities"

  belongs_to :employee
  belongs_to :product
end
