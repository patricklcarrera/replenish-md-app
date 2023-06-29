class AddAllProductsInInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :products_hash, :jsonb, default: {}
  end
end
