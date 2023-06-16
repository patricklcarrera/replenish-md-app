# frozen_string_literal: true

class PdfMaker
	require 'prawn'

	pdf = Prawn::Document.new
	pdf.text("Prawn Rocks")
	pdf.render_file('prawn.pdf')
end
