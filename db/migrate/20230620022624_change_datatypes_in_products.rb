class ChangeDatatypesInProducts < ActiveRecord::Migration[7.0]
  def change
    change_column :products, :cost_price, :float
    change_column :products, :retail_price, :float
  end
end
