class CreateProductsQuantities < ActiveRecord::Migration[7.0]
  def change
    create_table :products_quantities do |t|
      t.integer :employee_id
      t.integer :product_id
      t.integer :quantity

      t.timestamps
    end
  end
end
