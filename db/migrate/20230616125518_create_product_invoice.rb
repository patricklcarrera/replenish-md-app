class CreateProductInvoice < ActiveRecord::Migration[7.0]
  def change
    create_table :products_invoices do |t|
      t.integer :invoice_id
      t.integer :product_id

      t.timestamps
    end
  end
end
