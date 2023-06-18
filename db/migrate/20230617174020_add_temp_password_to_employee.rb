class AddTempPasswordToEmployee < ActiveRecord::Migration[7.0]
  def change
    add_column :employees, :temp_password, :string
  end
end
