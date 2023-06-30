class RenameAndAddPercentageToEmployees < ActiveRecord::Migration[7.0]
  def change
    rename_column :employees, :percentage, :service_percentage
    add_column :employees, :retail_percentage, :integer, default: 0
  end
end
