class ChangeColumnDefaultInInvoices < ActiveRecord::Migration[7.0]
  def change
    change_column_default :invoices, :overhead_fee_type, nil
  end
end
