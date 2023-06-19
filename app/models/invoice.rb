class Invoice < ApplicationRecord
  require 'prawn-html'

  belongs_to :employee
  belongs_to :client
  has_many :products_invoices, class_name: 'ProductInvoice'
  has_many :products, through: :products_invoices
  has_one_attached :document, dependent: :purge

  scope :finalized, -> { where(is_finalized: true) }
  scope :non_finalized, -> { where(is_finalized: false) }

  def save_pdf_and_send_mail(products, retail_products)
    products_str = products&.map do |product|
                    "<tbody>
                      <tr>
                        <td>#{product&.first}       </td>
                        <td>#{product&.second}        </td>
                        <td>#{product&.third}        </td>
                        <td>#{product.present? ? (product.second.to_i * product.third.to_i) : 0}        </td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <br>"
    end.inject(:+) || ""

    retail_products_str = retail_products&.map do |product|
                    "<tbody>
                      <tr>
                        <td>#{product&.first}        </td>
                        <td>#{product&.second}        </td>
                        <td>#{product&.third}        </td>
                        <td>#{product.present? ? (product.second.to_i * product.third.to_i) : 0}        </td>
                      </tr>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <br>"
    end.inject(:+) || ""

    pdf = Prawn::Document.new(page_size: 'A4')
    phtml = PrawnHtml::Instance.new(pdf)
    css = <<~CSS
      h3{
        font-style: bold;
        background-color: black
      }
      table {
        border-spacing: 30px;
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: ;
      }
    CSS

    phtml.append(css: css)
    phtml.append(html: "
                        <h2>Invoice: #{id}</h2>
                        <br>
                        <h3>Total: #{charge}</h3>
                        <br>
                        <form class='max-w-4xl mx-auto bg-white p-4 rounded-md'>
                          <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                            <div>
                              <h4>Provider:</h4>
                              <div>#{employee.name}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Client Name:</h4>
                              <div>#{client.name}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Date of Service:</h4>
                              <div>#{date_of_service}</div>
                            </div>
                          </div>
                          <br>

                          <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                            <div>
                              <h4>Concierge Fee Paid:</h4>
                              <div>#{concierge_fee_paid ? 'Yes' : 'No'}</div>
                            </div>
                            <br>
                            <div>
                              <h4>GFE:</h4>
                              <div>#{gfe ? 'Yes' : 'No'}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Paid By Client Cash:</h4>
                              <div>#{paid_by_client_cash}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Paid By Client Credit:</h4>
                              <div>#{paid_by_client_credit}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Total Paid by Credit:</h4>
                              <div>#{paid_by_client_cash.to_i + paid_by_client_credit.to_i if (paid_by_client_cash && paid_by_client_credit)}</div>
                            </div>
                          </div>

                          <br>

                          <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                            <div>
                              <h4>Personal Discount:</h4>
                              <div>#{personal_discount}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Tip:</h4>
                              <div>#{tip}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Comments:</h4>
                              <div>#{comments}</div>
                            </div>
                          </div>

                          <br>
                          <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                            <h3>Products:</h5>
                              <div class='border rounded-sm p-2 mb-4 products-used'>
                                  <table class='w-full'>
                                      <thead>
                                        <tr>
                                          <th>Products Used  </th>
                                          <th>Quantity        </th>
                                          <th>Price        </th>
                                          <th>Total Price        </th>
                                        </tr>
                                      </thead>
                                      <br>" + products_str + 

                            "<div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                              <h3>Retail Products:</h5>
                                <div class='border rounded-sm p-2 mb-4 products-used'>
                                    <table class='w-full'>
                                        <thead>
                                          <tr>
                                            <th>Products Used  </th>
                                            <th>Quantity        </th>
                                            <th>Price        </th>
                                            <th>Total Price        </th>
                                          </tr>
                                        </thead>
                                        <br>" + retail_products_str +

                          "<div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                            <div>
                              <h4>Overhead:</h4>
                            </div>
                            <br>
                            <div>
                              <h4>Fee Type:</h4>
                              <div>#{overhead_fee_type}</div>
                            </div>
                            <br>
                            <div>
                              <h4>Fee Value:</h4>
                              <div>#{overhead_fee_value}</div>
                            </div>
                          </div>
                        </form>")
    pdf_file = pdf.render_file("public/#{employee.name}-Invoice-#{id}.pdf")
    document.attach(io: File.open("public/#{employee.name}-Invoice-#{id}.pdf"), filename: "#{employee.name}-Invoice-#{id}.pdf", content_type: "application/pdf")
    save!

    SendNotificationPdfToAdminsMailer.with(invoice: self).send_mail.deliver
  end

  def finalize_and_send_pdf_mail
    update!(is_finalized: true)
    SendPdfToInvoiceMailer.with(invoice: self).send_mail.deliver
  end
end
