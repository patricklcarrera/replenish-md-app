class Invoice < ApplicationRecord
    belongs_to :employee
    belongs_to :client
    belongs_to :product
end
