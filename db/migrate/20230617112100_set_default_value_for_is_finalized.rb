class SetDefaultValueForIsFinalized < ActiveRecord::Migration[7.0]
  def change
    change_column :invoices, :is_finalized, :boolean, default: false
  end
end
