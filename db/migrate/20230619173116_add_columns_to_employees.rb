class AddColumnsToEmployees < ActiveRecord::Migration[7.0]
  def change
    add_column :employees, :gfe, :boolean
    add_column :employees, :percentage, :integer
  end
end
