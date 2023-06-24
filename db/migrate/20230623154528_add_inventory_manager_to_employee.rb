class AddInventoryManagerToEmployee < ActiveRecord::Migration[7.0]
  def change
    add_column :employees, :is_inv_manager, :boolean
  end
end
