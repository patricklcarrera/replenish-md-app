class Invoice < ApplicationRecord
  belongs_to :employee
  belongs_to :client
  belongs_to :product

  def send_pdf_mail
    pdf_file = Prawn::Document.generate("Invoice-#{self.employee.name}.pdf") do |pdf|
      pdf.text 'Employee', style: :bold
      pdf.text self.employee.name

      pdf.text 'Product', style: :bold
      pdf.text self.product.name

      pdf.text 'Client', style: :bold
      pdf.text self.client.name

      pdf.text 'Charge', style: :bold
      pdf.text self.charge.to_s
    end
    
    SendPdfToInvoiceMailer.with(invoice: self, pdf_file: pdf_file).send_mail.deliver
  end
end
