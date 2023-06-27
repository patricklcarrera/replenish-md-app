class CreateInventoryPrompts < ActiveRecord::Migration[7.0]
  def change
    create_table :inventory_prompts do |t|
      t.integer :employee_id
      t.integer :product_id
      t.integer :quantity
      t.string  :assigned_by, default: "Inventory Manager"
      t.boolean :is_accepted, default: false

      t.timestamps
    end
  end
end
