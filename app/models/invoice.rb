class Invoice < ApplicationRecord
  require 'prawn-html'

  belongs_to :employee
  belongs_to :client
  has_many :products_invoices, class_name: 'ProductInvoice'
  has_many :products, through: :products_invoices
  has_one_attached :pdf, dependent: :purge

  def send_pdf_mail(products, retail_products)
    products_str = products&.map do |product|
      "<div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
          <h3>Products:</h5>
            <div class='border rounded-sm p-2 mb-4 products-used'>
                <table class='w-full'>
                    <thead>
                      <tr>
                        <th>Products Used        </th>
                        <th>Product Quantity        </th>
                        <th>Price        </th>
                        <th>Total Price        </th>
                      </tr>
                    </thead>
                    <br>
                    <tbody>
                      <tr>
                        <td>#{product&.first}        </td>
                        <td>#{product&.second}        </td>
                        <td>#{product&.third}        </td>
                        <td>#{product.present? ? (product.third) : 0}        </td>
                      </tr>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <br>"
    end.inject(:+) || ""

    retail_products_str = retail_products&.map do |product|
      "<div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
          <h3>Products:</h5>
            <div class='border rounded-sm p-2 mb-4 products-used'>
                <table class='w-full'>
                    <thead>
                      <tr>
                        <th>Products Used        </th>
                        <th>Product Quantity        </th>
                        <th>Price        </th>
                        <th>Total Price        </th>
                      </tr>
                    </thead>
                    <br>
                    <tbody>
                      <tr>
                        <td>#{product&.first}        </td>
                        <td>#{product&.second}        </td>
                        <td>#{product&.third}        </td>
                        <td>#{product.present? ? (product.third) : 0}        </td>
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

                          <br>" + products_str + retail_products_str +

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
    SendPdfToInvoiceMailer.with(invoice: self).send_mail.deliver
  end
end
