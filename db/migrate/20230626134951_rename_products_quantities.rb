class RenameProductsQuantities < ActiveRecord::Migration[7.0]
  def change
    rename_table :products_quantities, :employees_inventories
  end
end
