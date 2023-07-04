class RemoveColumnFromInvoices < ActiveRecord::Migration[7.0]
  def change
    remove_column :invoices, :products_quantities, :jsonb
  end
end
