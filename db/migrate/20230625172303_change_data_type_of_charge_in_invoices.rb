class ChangeDataTypeOfChargeInInvoices < ActiveRecord::Migration[7.0]
  def change
    change_column :invoices, :charge, :float
  end
end
