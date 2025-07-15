// PDF Utilities - Core PDF manipulation functions using pdf-lib, Tesseract.js, and other libraries
// This file contains all the actual PDF processing logic

// Global variables for PDF processing
let currentPdfDoc = null;
let currentPdfBytes = null;

// Initialize PDF-lib
const { PDFDocument, rgb, degrees, StandardFonts } = PDFLib;

/**
 * Utility function to read file as ArrayBuffer
 */
async function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Utility function to read file as Data URL
 */
async function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Create a download link for a file
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Merge multiple PDF files into one
 */
async function mergePDFs(files, options = {}) {
    try {
        const mergedPdf = await PDFDocument.create();
        
        for (let i = 0; i < files.length; i++) {
            updateProgress(Math.round((i / files.length) * 50));
            
            const fileBuffer = await readFileAsArrayBuffer(files[i]);
            const pdf = await PDFDocument.load(fileBuffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            
            pages.forEach((page) => mergedPdf.addPage(page));
        }
        
        updateProgress(75);
        const pdfBytes = await mergedPdf.save();
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'merged-document.pdf' };
    } catch (error) {
        console.error('Error merging PDFs:', error);
        throw new Error('Failed to merge PDF files');
    }
}

/**
 * Split PDF into individual pages
 */
async function splitPDF(file) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        const pageCount = pdf.getPageCount();
        
        const results = [];
        
        for (let i = 0; i < pageCount; i++) {
            updateProgress(Math.round((i / pageCount) * 100));
            
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdf, [i]);
            newPdf.addPage(page);
            
            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            results.push({
                blob,
                filename: `page-${i + 1}.pdf`
            });
        }
        
        return results;
    } catch (error) {
        console.error('Error splitting PDF:', error);
        throw new Error('Failed to split PDF file');
    }
}

/**
 * Remove specific pages from PDF
 */
async function removePages(file, pagesToRemove) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        const pageCount = pdf.getPageCount();
        
        // Convert 1-based page numbers to 0-based indices
        const indicesToKeep = [];
        for (let i = 0; i < pageCount; i++) {
            if (!pagesToRemove.includes(i + 1)) {
                indicesToKeep.push(i);
            }
        }
        
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdf, indicesToKeep);
        pages.forEach((page) => newPdf.addPage(page));
        
        updateProgress(75);
        const pdfBytes = await newPdf.save();
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'pages-removed.pdf' };
    } catch (error) {
        console.error('Error removing pages:', error);
        throw new Error('Failed to remove pages from PDF');
    }
}

/**
 * Extract specific pages from PDF
 */
async function extractPages(file, pagesToExtract) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        
        // Convert 1-based page numbers to 0-based indices
        const indicesToExtract = pagesToExtract.map(page => page - 1);
        
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdf, indicesToExtract);
        pages.forEach((page) => newPdf.addPage(page));
        
        updateProgress(75);
        const pdfBytes = await newPdf.save();
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'extracted-pages.pdf' };
    } catch (error) {
        console.error('Error extracting pages:', error);
        throw new Error('Failed to extract pages from PDF');
    }
}

/**
 * Rotate PDF pages
 */
async function rotatePDF(file, rotation = 90) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        const pages = pdf.getPages();
        
        pages.forEach((page, index) => {
            updateProgress(Math.round((index / pages.length) * 80));
            page.setRotation(degrees(rotation));
        });
        
        updateProgress(90);
        const pdfBytes = await pdf.save();
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'rotated-document.pdf' };
    } catch (error) {
        console.error('Error rotating PDF:', error);
        throw new Error('Failed to rotate PDF');
    }
}

/**
 * Convert images to PDF
 */
async function imagesToPDF(files) {
    try {
        const pdf = await PDFDocument.create();
        
        for (let i = 0; i < files.length; i++) {
            updateProgress(Math.round((i / files.length) * 80));
            
            const imageBytes = await readFileAsArrayBuffer(files[i]);
            let image;
            
            if (files[i].type.includes('png')) {
                image = await pdf.embedPng(imageBytes);
            } else {
                image = await pdf.embedJpg(imageBytes);
            }
            
            const page = pdf.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });
        }
        
        updateProgress(90);
        const pdfBytes = await pdf.save();
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'images-to-pdf.pdf' };
    } catch (error) {
        console.error('Error converting images to PDF:', error);
        throw new Error('Failed to convert images to PDF');
    }
}

/**
 * Convert PDF pages to images
 */
async function pdfToImages(file) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        const pageCount = pdf.getPageCount();
        
        const results = [];
        
        for (let i = 0; i < pageCount; i++) {
            updateProgress(Math.round((i / pageCount) * 100));
            
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdf, [i]);
            newPdf.addPage(page);
            const pdfBytes = await newPdf.save();

            const loadingTask = pdfjsLib.getDocument({data: pdfBytes});
            const pdfDoc = await loadingTask.promise;
            const pageDoc = await pdfDoc.getPage(1);

            const viewport = pageDoc.getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            await pageDoc.render(renderContext).promise;
            
            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/jpeg', 0.9);
            });
            
            results.push({
                blob,
                filename: `page-${i + 1}.jpg`
            });
        }
        
        return results;
    } catch (error) {
        console.error('Error converting PDF to images:', error);
        throw new Error('Failed to convert PDF to images');
    }
}

/**
 * Add page numbers to PDF
 */
async function addPageNumbers(file, options = {}) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        const pages = pdf.getPages();
        const font = await pdf.embedFont(StandardFonts.Helvetica);
        
        const {
            position = 'bottom-right',
            fontSize = 12,
            color = rgb(0, 0, 0),
            startFrom = 1
        } = options;
        
        pages.forEach((page, index) => {
            updateProgress(Math.round((index / pages.length) * 90));
            
            const { width, height } = page.getSize();
            const pageNumber = startFrom + index;
            const text = pageNumber.toString();
            
            let x, y;
            switch (position) {
                case 'top-left':
                    x = 50;
                    y = height - 50;
                    break;
                case 'top-right':
                    x = width - 50;
                    y = height - 50;
                    break;
                case 'bottom-left':
                    x = 50;
                    y = 50;
                    break;
                case 'bottom-right':
                default:
                    x = width - 50;
                    y = 50;
                    break;
            }
            
            page.drawText(text, {
                x,
                y,
                size: fontSize,
                font,
                color
            });
        });
        
        updateProgress(95);
        const pdfBytes = await pdf.save();
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'numbered-document.pdf' };
    } catch (error) {
        console.error('Error adding page numbers:', error);
        throw new Error('Failed to add page numbers');
    }
}

/**
 * Add watermark to PDF
 */
async function addWatermark(file, watermarkText, options = {}) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        const pages = pdf.getPages();
        const font = await pdf.embedFont(StandardFonts.HelveticaBold);
        
        const {
            position = 'center',
            fontSize = 48,
            opacity = 0.5,
            rotation = 45
        } = options;
        
        pages.forEach((page, index) => {
            updateProgress(Math.round((index / pages.length) * 90));
            
            const { width, height } = page.getSize();
            
            let x, y;
            switch (position) {
                case 'top-left':
                    x = 100;
                    y = height - 100;
                    break;
                case 'top-right':
                    x = width - 100;
                    y = height - 100;
                    break;
                case 'bottom-left':
                    x = 100;
                    y = 100;
                    break;
                case 'bottom-right':
                    x = width - 100;
                    y = 100;
                    break;
                case 'center':
                default:
                    x = width / 2;
                    y = height / 2;
                    break;
            }
            
            page.drawText(watermarkText, {
                x,
                y,
                size: fontSize,
                font,
                color: rgb(0.5, 0.5, 0.5),
                opacity,
                rotate: degrees(rotation)
            });
        });
        
        updateProgress(95);
        const pdfBytes = await pdf.save();
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'watermarked-document.pdf' };
    } catch (error) {
        console.error('Error adding watermark:', error);
        throw new Error('Failed to add watermark');
    }
}

/**
 * Protect PDF with password
 */
async function protectPDF(file, password, permissions = {}) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        
        updateProgress(50);
        
        const options = {
            userPassword: password,
            ownerPassword: password, // Use same password for owner for simplicity
            permissions: {
                printing: permissions.allowPrinting ? 'highResolution' : 'notAllowed',
                copying: permissions.allowCopying,
                modifying: permissions.allowModifying,
            }
        };

        const pdfBytes = await pdf.save(options);
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'protected-document.pdf' };
    } catch (error) {
        console.error('Error protecting PDF:', error);
        throw new Error('Failed to protect PDF');
    }
}

/**
 * Optimize PDF (reduce file size)
 */
async function optimizePDF(file) {
    try {
        const fileBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(fileBuffer);
        
        updateProgress(50);
        
        // This is a basic optimization. For more advanced optimization,
        // you would need to implement image compression, font subsetting, etc.
        const pdfBytes = await pdf.save({ useObjectStreams: false });
        updateProgress(100);
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return { blob, filename: 'optimized-document.pdf' };
    } catch (error) {
        console.error('Error optimizing PDF:', error);
        throw new Error('Failed to optimize PDF');
    }
}

/**
 * OCR PDF using Tesseract.js
 */
async function ocrPDF(file) {
    try {
        // First convert PDF to images, then run OCR on each image
        const images = await pdfToImages(file);
        let extractedText = '';
        
        for (let i = 0; i < images.length; i++) {
            updateProgress(Math.round((i / images.length) * 90));
            
            // Create image URL from blob
            const imageUrl = URL.createObjectURL(images[i].blob);
            
            // Run OCR on the image
            const { data: { text } } = await Tesseract.recognize(imageUrl, 'eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const progress = Math.round((i / images.length) * 90 + (m.progress * 10));
                        updateProgress(progress);
                    }
                }
            });
            
            extractedText += `\n--- Page ${i + 1} ---\n${text}\n`;
            
            // Clean up URL
            URL.revokeObjectURL(imageUrl);
        }
        
        updateProgress(100);
        
        // Create text file with extracted text
        const blob = new Blob([extractedText], { type: 'text/plain' });
        return { blob, filename: 'extracted-text.txt' };
    } catch (error) {
        console.error('Error performing OCR:', error);
        throw new Error('Failed to extract text from PDF');
    }
}

/**
 * Convert HTML to PDF using html2pdf.js
 */
async function htmlToPDF(htmlContent) {
    try {
        updateProgress(25);
        
        const options = {
            margin: 1,
            filename: 'converted-document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        updateProgress(50);
        
        // Create a temporary element with the HTML content
        const element = document.createElement('div');
        element.innerHTML = htmlContent;
        element.style.padding = '20px';
        element.style.fontFamily = 'Arial, sans-serif';
        
        updateProgress(75);
        
        const pdf = await html2pdf().set(options).from(element).outputPdf('blob');
        
        updateProgress(100);
        
        return { blob: pdf, filename: 'html-to-pdf.pdf' };
    } catch (error) {
        console.error('Error converting HTML to PDF:', error);
        throw new Error('Failed to convert HTML to PDF');
    }
}

/**
 * Convert Word to PDF (simulated)
 */
async function wordToPDF(file) {
    // This is a simulation. Real conversion requires a library like mammoth.js to extract HTML
    // and then convert to PDF, or a server-side solution.
    const pdf = await PDFDocument.create();
    const page = pdf.addPage();
    page.drawText('Simulated Word to PDF conversion', { x: 50, y: 750, size: 20 });
    page.drawText(`Original file: ${file.name}`, { x: 50, y: 700, size: 12 });
    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return { blob, filename: 'word-to-pdf.pdf' };
}

/**
 * Convert PowerPoint to PDF (simulated)
 */
async function powerpointToPDF(file) {
    // This is a simulation. Real conversion requires a library that can parse PPTX files.
    const pdf = await PDFDocument.create();
    const page = pdf.addPage();
    page.drawText('Simulated PowerPoint to PDF conversion', { x: 50, y: 750, size: 20 });
    page.drawText(`Original file: ${file.name}`, { x: 50, y: 700, size: 12 });
    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return { blob, filename: 'powerpoint-to-pdf.pdf' };
}

/**
 * Convert Excel to PDF (simulated)
 */
async function excelToPDF(file) {
    // This is a simulation. Real conversion requires a library like SheetJS to parse XLSX files.
    const pdf = await PDFDocument.create();
    const page = pdf.addPage();
    page.drawText('Simulated Excel to PDF conversion', { x: 50, y: 750, size: 20 });
    page.drawText(`Original file: ${file.name}`, { x: 50, y: 700, size: 12 });
    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return { blob, filename: 'excel-to-pdf.pdf' };
}

/**
 * Extract text from PDF (simulated PDF to Word)
 */
async function pdfToWord(file) {
    // This is a simulation. Real text extraction would use a library like pdf-parse.
    const fileBuffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(fileBuffer);
    let text = '';
    // This is a placeholder, as pdf-lib doesn't directly support text extraction.
    // A more robust solution would use pdf.js or pdf-parse.
    text += 'Simulated text extraction from PDF.\n';
    text += `The PDF has ${pdf.getPageCount()} pages.`;
    const blob = new Blob([text], { type: 'text/plain' });
    return { blob, filename: 'pdf-to-word.txt' };
}

// Export functions for use in tools.js
window.PDFUtils = {
    mergePDFs,
    splitPDF,
    removePages,
    extractPages,
    rotatePDF,
    imagesToPDF,
    pdfToImages,
    addPageNumbers,
    addWatermark,
    protectPDF,
    optimizePDF,
    ocrPDF,
    htmlToPDF,
    wordToPDF,
    powerpointToPDF,
    excelToPDF,
    pdfToWord,
    downloadBlob,
    readFileAsArrayBuffer,
    readFileAsDataURL
};

