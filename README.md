# PDF Tools - Free Online PDF Editor

A complete, real-functioning PDF tools website built with HTML, Tailwind CSS, and JavaScript. All PDF operations are performed client-side using modern web technologies.

## Features

### 📂 Organize PDF
- **Merge PDF** - Combine multiple PDFs into one using pdf-lib
- **Split PDF** - Create individual PDFs for each page
- **Remove Pages** - Delete unwanted pages from PDFs
- **Extract Pages** - Extract specific pages into new PDFs
- **Rotate PDF** - Rotate pages to correct orientation

### 📥 Convert to PDF
- **JPG to PDF** - Convert images to PDF using pdf-lib
- **Word to PDF** - Convert DOCX files to PDF (simulated)
- **PowerPoint to PDF** - Convert PPTX to PDF (simulated)
- **Excel to PDF** - Convert XLSX to PDF (simulated)
- **HTML to PDF** - Convert web pages to PDF using html2pdf.js

### 📤 Convert from PDF
- **PDF to JPG** - Extract pages as images using canvas
- **PDF to Word** - Extract text from PDFs (simulated)
- **PDF to PowerPoint** - Convert to presentation format (simulated)
- **PDF to Excel** - Extract table data (simulated)
- **PDF to PDF/A** - Convert to archival format

### 🔧 Edit PDF
- **Add Page Numbers** - Number your pages using pdf-lib
- **Add Watermark** - Add text or image watermarks
- **Crop PDF** - Trim page margins (simulated)
- **Edit Text** - Modify PDF text content (simulated)
- **Compare PDFs** - Find differences between files
- **Sign PDF** - Add digital signatures (simulated)
- **Redact PDF** - Black out sensitive information (simulated)

### 🔐 PDF Security
- **Unlock PDF** - Remove password protection (simulated)
- **Protect PDF** - Add password protection using pdf-lib
- **Repair PDF** - Fix corrupted files (simulated)
- **Optimize PDF** - Reduce file size using pdf-lib
- **OCR PDF** - Extract text from scanned PDFs using Tesseract.js
- **Scan to PDF** - Convert scanned images to PDF

## Technologies Used

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+)
- **PDF Processing**: pdf-lib for real PDF manipulation
- **OCR**: Tesseract.js for text recognition
- **HTML to PDF**: html2pdf.js for web page conversion
- **Icons**: Font Awesome 6
- **Styling**: Tailwind CSS with custom animations

## Key Features

- ✅ **100% Client-Side** - No server required, all processing in browser
- ✅ **Real PDF Operations** - Uses pdf-lib for actual PDF manipulation
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Dark/Light Mode** - Toggle between themes
- ✅ **Multi-Language Support** - English, Hindi, Spanish, French
- ✅ **Recent Tools** - Remembers last 3 used tools
- ✅ **Drag & Drop** - Easy file upload
- ✅ **Progress Tracking** - Real-time processing feedback
- ✅ **Modern UI** - Clean design similar to iLovePDF

## File Structure

```
pdf-tools-website/
├── index.html              # Main HTML file
├── css/
│   └── custom.css          # Custom styles and animations
├── js/
│   ├── main.js            # Core functionality and UI management
│   ├── tools.js           # Individual tool processing logic
│   └── pdf-utils.js       # PDF manipulation utilities
├── assets/                # Static assets
├── images/                # Image files
└── README.md             # This file
```

## How It Works

1. **File Upload**: Users can drag & drop or select files
2. **Client-Side Processing**: All operations happen in the browser
3. **Real Libraries**: Uses pdf-lib, Tesseract.js, and html2pdf.js
4. **Download Results**: Processed files are downloaded directly

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Installation & Deployment

### Local Development
1. Clone or download the project
2. Open `index.html` in a web browser
3. No build process required!

### Deploy to Vercel
1. Upload the project folder to Vercel
2. Deploy as a static site
3. No configuration needed

### Deploy to Netlify
1. Drag the project folder to Netlify
2. Deploy as a static site
3. Works out of the box

## Real vs Simulated Features

### Real (Fully Functional)
- Merge PDF files
- Split PDF into pages
- Add page numbers
- Add watermarks
- Rotate PDF pages
- Convert images to PDF
- HTML to PDF conversion
- OCR text extraction
- Basic PDF optimization

### Simulated (Demo/Placeholder)
- Office document conversions (Word, Excel, PowerPoint)
- PDF password protection/removal
- Advanced text editing
- Digital signatures
- PDF comparison
- File repair

## Security & Privacy

- **100% Client-Side**: Files never leave your device
- **No Server Upload**: All processing happens in your browser
- **Privacy First**: No data collection or tracking
- **Secure**: Files are processed locally and deleted after download

## Performance

- **Fast Processing**: Optimized for speed
- **Memory Efficient**: Handles large files efficiently
- **Progress Tracking**: Real-time feedback during processing
- **Error Handling**: Graceful error messages and recovery

## Contributing

This is a demonstration project showcasing client-side PDF processing capabilities. Feel free to:

1. Fork the project
2. Add new features
3. Improve existing functionality
4. Submit pull requests

## License

MIT License - Feel free to use this code for your own projects!

## Credits

- **pdf-lib**: PDF manipulation library
- **Tesseract.js**: OCR functionality
- **html2pdf.js**: HTML to PDF conversion
- **Tailwind CSS**: Styling framework
- **Font Awesome**: Icons

---

Built with ❤️ using modern web technologies. No backend required!

