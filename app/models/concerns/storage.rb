# frozen_string_literal: true

module Storage
  extend ActiveSupport::Concern

  included do
    after_save :destroy_if_not_present

    belongs_to :product

    def destroy_if_not_present
      if quantity == 0
        destroy!
      end
    end
  end
end
