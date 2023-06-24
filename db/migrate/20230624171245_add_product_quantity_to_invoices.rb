class AddProductQuantityToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :products_quantities, :jsonb
  end
end
