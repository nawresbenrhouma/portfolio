import Foundation
import PDFKit
import AppKit
let args = CommandLine.arguments
let doc = PDFDocument(url: URL(fileURLWithPath: args[1]))!
for i in 0..<doc.pageCount {
  let page = doc.page(at: i)!
  let bounds = page.bounds(for: .mediaBox)
  let size = NSSize(width: bounds.width * 2, height: bounds.height * 2)
  let img = page.thumbnail(of: size, for: .mediaBox)
  let tiff = img.tiffRepresentation!
  let rep = NSBitmapImageRep(data: tiff)!
  let png = rep.representation(using: .png, properties: [:])!
  let out = "\(args[2])-page\(i+1).png"
  try! png.write(to: URL(fileURLWithPath: out))
  print("wrote \(out)")
}
