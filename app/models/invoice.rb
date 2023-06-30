class Invoice < ApplicationRecord
  require 'prawn-html'

  belongs_to :employee
  belongs_to :client
  has_many :products_invoices, class_name: 'ProductInvoice'
  has_many :products, through: :products_invoices
  has_one_attached :document, dependent: :purge

  before_save :save_products_quantities
  before_update :revise_charge

  scope :finalized, -> { where(is_finalized: true) }
  scope :non_finalized, -> { where(is_finalized: false) }

  def save_pdf_and_send_mail(products, retail_products)
    products_hash["products"] = products
    products_hash["retail_products"] = retail_products

    save!
    SendNotificationPdfToAdminsMailer.with(invoice: self).send_mail.deliver
    update(products_quantities: products_quantities)
  end

  def finalize_and_send_pdf_mail
    if products_quantities && products_quantities.any?
      products_quantities.each do |product_quantity|
        emp_product_quantity = employee.employees_inventories.where(product: Product.find(product_quantity.keys)).first
        emp_product_quantity.update!(quantity: (emp_product_quantity.quantity - product_quantity.values.first.to_i))
      end
    end

    pdf = Prawn::Document.new(page_size: 'A4')

    table_data = []

    table_data << ["Invoice: #{id}", "Total: #{charge}"]
    table_data << ["Provider: #{employee.name}", "Client Name: #{client.name}", "Date of Service: #{date_of_service}"]
    table_data << ["Concierge Fee Paid:#{concierge_fee_paid ? 'Yes' : 'No'}", "GFE:#{gfe ? 'Yes' : 'No'}", "Paid By Client Cash:#{paid_by_client_cash}", "Paid By Client Credit:#{paid_by_client_credit}", "Total Paid by Credit:#{paid_by_client_cash.to_i + paid_by_client_credit.to_i if (paid_by_client_cash && paid_by_client_credit)}"]
    table_data << ["Personal Discount: #{personal_discount}", "Tip: #{tip}", "Comments: #{comments}"]

    pdf.table(table_data, position: :left)

    if products_hash["products"].any?
      product_heading = [["Products:   "]]
      pdf.table(product_heading, position: :left)

      product_table_data = []
      product_table_data << ["Products", "Quantity", "Price", "Total Price"]
      products_hash["products"]&.each do |product|
        product_table_data << [product&.first, product&.second, product&.third, (product.second.to_i * product.third.to_i)]
      end

      pdf.table(product_table_data, position: :left, :column_widths => [200, 100, 100, 100])
    end

    if products_hash["retail_products"].any?
      retail_product_heading = [["Retail Products:   "]]
      pdf.table(retail_product_heading, position: :left)

      retail_product_table_data = []
      retail_product_table_data << ["Products", "Quantity", "Price", "Total Price"]

      products_hash["retail_products"].each do |product|
        retail_product_table_data << [product&.first, product&.second, product&.third, (product.second.to_i * product.third.to_i)]
      end

      pdf.table(retail_product_table_data, :cell_style => { inline_format: true }, position: :left, :column_widths => [200, 100, 100, 100])
    end

    overhead_table_data = []
    overhead_table_data << ["Overhead:   "]
    overhead_table_data <<["Fee Type: #{overhead_fee_type.capitalize}", "Fee Value: #{overhead_fee_value}"]

    pdf.table(overhead_table_data, :cell_style => { inline_format: true }, position: :left, :column_widths => [200, 200])

    pdf_file = pdf.render_file("public/#{employee.name}-Invoice-#{id}.pdf")
    document.attach(io: File.open("public/#{employee.name}-Invoice-#{id}.pdf"), filename: "#{employee.name}-Invoice-#{id}.pdf", content_type: "application/pdf")

    update!(is_finalized: true)
    SendPdfToInvoiceMailer.with(invoice: self).send_mail.deliver
  end

  def send_reject_mail(feedback)
    if RejectInvoiceMailer.with(invoice: self, feedback: feedback).send_mail.deliver
      destroy!
    end
  end

  private
  def revise_charge
    if (overhead_fee_type && overhead_fee_type_changed?) || (overhead_fee_value && overhead_fee_value_changed?)
      self.charge -=  case overhead_fee_type
                      when "percentage"
                        (charge*overhead_fee_value/100)
                      when "fixed"
                        overhead_fee_value
                      end.round(2)
    end
  end

  def save_products_quantities
    products_quantities = products_hash.values&.map {|product| { Product.find_by(name: product.first[0]).id => product.first[1] } unless product.empty? }.compact
  end
end
