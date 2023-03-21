class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.string :employee_id
      t.integer :product_id
      t.integer :client_id
      t.integer :charge
      t.boolean :is_finalized

      t.timestamps
    end
  end
end
