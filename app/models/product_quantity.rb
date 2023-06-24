# frozen_string_literal: true

class ProductQuantity < ApplicationRecord
  self.table_name = "products_quantities"

  belongs_to :employee
  belongs_to :product

  after_save :check_quantity

  def check_quantity
    if quantity == 0
      destroy!
    end
  end
end
