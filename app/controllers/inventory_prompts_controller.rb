class InventoryPromptsController < ApplicationController
  before_action :find_inventory_prompt

  def accept
    if @inventory_prompt.accept!
      render json: @inventory, status: :ok
    else
      render json: { 'error' => 'Error while accepting the prompt '} , status: :bad_request
    end
  end

  def reject
    if @inventory_prompt.reject!
      render json: { 'success' => 'Prompt Destroyed Successfully!'} , status: :ok
    else
      render json: { 'error' => 'Error while destroying the prompt '} , status: :bad_request
    end
  end

  private

  def find_inventory_prompt
    @inventory_prompt = InventoryPrompt.find_by(id: params[:id])
  end
end
