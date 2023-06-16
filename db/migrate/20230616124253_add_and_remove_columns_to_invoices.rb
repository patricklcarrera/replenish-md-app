class AddAndRemoveColumnsToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :date_of_service, :date
    add_column :invoices, :paid_by_client_cash, :integer
    add_column :invoices, :paid_by_client_credit, :integer
    add_column :invoices, :comments, :text
    add_column :invoices, :personal_discount, :integer
    add_column :invoices, :tip, :integer
    add_column :invoices, :concierge_fee_paid, :boolean
    add_column :invoices, :gfe, :boolean
    add_column :invoices, :overhead_fee_type, :string
    add_column :invoices, :overhead_fee_value, :integer

    remove_column :invoices, :product_id, :integer
  end
end
