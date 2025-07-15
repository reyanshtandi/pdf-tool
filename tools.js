// Tools.js - Individual tool processing logic
// This file handles the processing logic for each PDF tool

// Override the processFiles function from main.js
window.processFiles = async function(toolId, files) {
    try {
        showProgress();
        
        let result;
        
        switch(toolId) {
            case 'merge-pdf':
                result = await processMergePDF(files);
                break;
            case 'split-pdf':
                result = await processSplitPDF(files[0]);
                break;
            case 'remove-pages':
                result = await processRemovePages(files[0]);
                break;
            case 'extract-pages':
                result = await processExtractPages(files[0]);
                break;
            case 'rotate-pdf':
                result = await processRotatePDF(files[0]);
                break;
            case 'jpg-to-pdf':
                result = await processImagesToPDF(files);
                break;
            case 'word-to-pdf':
                result = await processWordToPDF(files[0]);
                break;
            case 'powerpoint-to-pdf':
                result = await processPowerpointToPDF(files[0]);
                break;
            case 'excel-to-pdf':
                result = await processExcelToPDF(files[0]);
                break;
            case 'html-to-pdf':
                result = await processHTMLToPDF(files[0]);
                break;
            case 'pdf-to-jpg':
                result = await processPDFToImages(files[0]);
                break;
            case 'pdf-to-word':
                result = await processPDFToWord(files[0]);
                break;
            case 'pdf-to-powerpoint':
                result = await processPDFToPowerpoint(files[0]);
                break;
            case 'pdf-to-excel':
                result = await processPDFToExcel(files[0]);
                break;
            case 'pdf-to-pdfa':
                result = await processPDFToPDFA(files[0]);
                break;
            case 'add-page-numbers':
                result = await processAddPageNumbers(files[0]);
                break;
            case 'add-watermark':
                result = await processAddWatermark(files[0]);
                break;
            case 'crop-pdf':
                result = await processCropPDF(files[0]);
                break;
            case 'edit-text':
                result = await processEditText(files[0]);
                break;
            case 'compare-pdfs':
                result = await processComparePDFs(files);
                break;
            case 'sign-pdf':
                result = await processSignPDF(files[0]);
                break;
            case 'redact-pdf':
                result = await processRedactPDF(files[0]);
                break;
            case 'unlock-pdf':
                result = await processUnlockPDF(files[0]);
                break;
            case 'protect-pdf':
                result = await processProtectPDF(files[0]);
                break;
            case 'repair-pdf':
                result = await processRepairPDF(files[0]);
                break;
            case 'optimize-pdf':
                result = await processOptimizePDF(files[0]);
                break;
            case 'ocr-pdf':
                result = await processOCRPDF(files[0]);
                break;
            case 'scan-to-pdf':
                result = await processScanToPDF(files);
                break;
            default:
                throw new Error('Unknown tool: ' + toolId);
        }
        
        if (Array.isArray(result)) {
            // Multiple files result
            showMultipleResults(result);
        } else {
            // Single file result
            showResult(result);
        }
        
    } catch (error) {
        console.error('Processing error:', error);
        showError(error.message);
    }
};

// Individual tool processing functions

async function processMergePDF(files) {
    if (files.length < 2) {
        throw new Error('Please select at least 2 PDF files to merge');
    }
    
    const options = {
        order: document.getElementById('pageOrder')?.value || 'original'
    };
    
    return await PDFUtils.mergePDFs(files, options);
}

async function processSplitPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    return await PDFUtils.splitPDF(file);
}

async function processRemovePages(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // For demo purposes, remove pages 2 and 4
    // In a real implementation, you'd get this from user input
    const pagesToRemove = [2, 4];
    
    return await PDFUtils.removePages(file, pagesToRemove);
}

async function processExtractPages(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // For demo purposes, extract pages 1 and 3
    // In a real implementation, you'd get this from user input
    const pagesToExtract = [1, 3];
    
    return await PDFUtils.extractPages(file, pagesToExtract);
}

async function processRotatePDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Rotate 90 degrees clockwise
    return await PDFUtils.rotatePDF(file, 90);
}

async function processImagesToPDF(files) {
    if (files.length === 0) {
        throw new Error('Please select at least one image file');
    }
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
        throw new Error('Please select only image files (JPG, PNG, GIF, BMP, WebP)');
    }
    
    return await PDFUtils.imagesToPDF(files);
}

async function processWordToPDF(file) {
    if (!file || (!file.name.endsWith('.docx') && !file.name.endsWith('.doc'))) {
        throw new Error('Please select a valid Word document (.docx or .doc)');
    }
    
    return await PDFUtils.wordToPDF(file);
}

async function processPowerpointToPDF(file) {
    if (!file || (!file.name.endsWith('.pptx') && !file.name.endsWith('.ppt'))) {
        throw new Error('Please select a valid PowerPoint presentation (.pptx or .ppt)');
    }
    
    return await PDFUtils.powerpointToPDF(file);
}

async function processExcelToPDF(file) {
    if (!file || (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls'))) {
        throw new Error('Please select a valid Excel spreadsheet (.xlsx or .xls)');
    }
    
    return await PDFUtils.excelToPDF(file);
}

async function processHTMLToPDF(file) {
    if (!file || (!file.name.endsWith('.html') && !file.name.endsWith('.htm'))) {
        throw new Error('Please select a valid HTML file (.html or .htm)');
    }
    
    // Read HTML content
    const htmlContent = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
    
    return await PDFUtils.htmlToPDF(htmlContent);
}

async function processPDFToImages(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    return await PDFUtils.pdfToImages(file);
}

async function processPDFToWord(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    return await PDFUtils.pdfToWord(file);
}

async function processPDFToPowerpoint(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate PowerPoint conversion
    updateProgress(50);
    
    const textContent = 'PDF to PowerPoint Conversion\n\n';
    const content = textContent + 'This is a simulated conversion to PowerPoint format.\n';
    const content2 = content + 'In a real implementation, PDF content would be\n';
    const finalContent = content2 + 'extracted and formatted for PowerPoint slides.';
    
    updateProgress(100);
    
    const blob = new Blob([finalContent], { type: 'text/plain' });
    return { blob, filename: 'pdf-to-powerpoint.txt' };
}

async function processPDFToExcel(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate Excel conversion
    updateProgress(50);
    
    const csvContent = 'PDF to Excel Conversion\n';
    const csvContent2 = csvContent + 'Column 1,Column 2,Column 3\n';
    const csvContent3 = csvContent2 + 'Data 1,Data 2,Data 3\n';
    const finalContent = csvContent3 + 'This is simulated table data from PDF';
    
    updateProgress(100);
    
    const blob = new Blob([finalContent], { type: 'text/csv' });
    return { blob, filename: 'pdf-to-excel.csv' };
}

async function processPDFToPDFA(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate PDF/A conversion
    updateProgress(50);
    const fileBuffer = await PDFUtils.readFileAsArrayBuffer(file);
    updateProgress(100);
    
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    return { blob, filename: 'document-pdfa.pdf' };
}

async function processAddPageNumbers(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    const options = {
        position: 'bottom-right',
        fontSize: 12,
        startFrom: 1
    };
    
    return await PDFUtils.addPageNumbers(file, options);
}

async function processAddWatermark(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    const watermarkText = document.getElementById('watermarkText')?.value || 'WATERMARK';
    const position = document.getElementById('watermarkPosition')?.value || 'center';
    const opacity = parseFloat(document.getElementById('watermarkOpacity')?.value || '0.5');
    
    const options = {
        position,
        opacity,
        fontSize: 48,
        rotation: 45
    };
    
    return await PDFUtils.addWatermark(file, watermarkText, options);
}

async function processCropPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate crop operation
    updateProgress(50);
    const fileBuffer = await PDFUtils.readFileAsArrayBuffer(file);
    updateProgress(100);
    
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    return { blob, filename: 'cropped-document.pdf' };
}

async function processEditText(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate text editing
    updateProgress(50);
    const fileBuffer = await PDFUtils.readFileAsArrayBuffer(file);
    updateProgress(100);
    
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    return { blob, filename: 'edited-document.pdf' };
}

async function processComparePDFs(files) {
    if (files.length !== 2) {
        throw new Error('Please select exactly 2 PDF files to compare');
    }
    
    // Simulate comparison
    updateProgress(50);
    
    const comparisonReport = `PDF Comparison Report
    
File 1: ${files[0].name}
File 2: ${files[1].name}

Comparison Results:
- Page count differences: Detected
- Content differences: Found on pages 2, 5, 7
- Formatting differences: Minor variations detected

This is a simulated comparison report.
In a real implementation, detailed differences would be highlighted.`;
    
    updateProgress(100);
    
    const blob = new Blob([comparisonReport], { type: 'text/plain' });
    return { blob, filename: 'comparison-report.txt' };
}

async function processSignPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate digital signature
    updateProgress(50);
    const fileBuffer = await PDFUtils.readFileAsArrayBuffer(file);
    updateProgress(100);
    
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    return { blob, filename: 'signed-document.pdf' };
}

async function processRedactPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate redaction
    updateProgress(50);
    const fileBuffer = await PDFUtils.readFileAsArrayBuffer(file);
    updateProgress(100);
    
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    return { blob, filename: 'redacted-document.pdf' };
}

async function processUnlockPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate password removal
    updateProgress(50);
    const fileBuffer = await PDFUtils.readFileAsArrayBuffer(file);
    updateProgress(100);
    
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    return { blob, filename: 'unlocked-document.pdf' };
}

async function processProtectPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    const password = document.getElementById('pdfPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    if (!password) {
        throw new Error('Please enter a password');
    }
    
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }
    
    const permissions = {
        allowPrinting: document.getElementById('allowPrinting')?.checked || false,
        allowCopying: document.getElementById('allowCopying')?.checked || false,
        allowModifying: document.getElementById('allowModifying')?.checked || false
    };
    
    return await PDFUtils.protectPDF(file, password, permissions);
}

async function processRepairPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    // Simulate repair
    updateProgress(50);
    const fileBuffer = await PDFUtils.readFileAsArrayBuffer(file);
    updateProgress(100);
    
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    return { blob, filename: 'repaired-document.pdf' };
}

async function processOptimizePDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    return await PDFUtils.optimizePDF(file);
}

async function processOCRPDF(file) {
    if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
    }
    
    return await PDFUtils.ocrPDF(file);
}

async function processScanToPDF(files) {
    if (files.length === 0) {
        throw new Error('Please select at least one image file');
    }
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
        throw new Error('Please select only image files (JPG, PNG, GIF, BMP, WebP)');
    }
    
    return await PDFUtils.imagesToPDF(files);
}

// Helper functions for UI updates

function showError(message) {
    document.getElementById('progressContainer').classList.add('hidden');
    document.getElementById('processBtn').disabled = false;
    
    const errorArea = document.createElement('div');
    errorArea.className = 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4';
    errorArea.innerHTML = `
        <div class="flex items-center">
            <div class="text-red-400 mr-3">
                <i class="fas fa-exclamation-circle text-xl"></i>
            </div>
            <div class="flex-1">
                <h4 class="text-red-800 dark:text-red-200 font-medium">Processing Error</h4>
                <p class="text-red-600 dark:text-red-300 text-sm">${message}</p>
            </div>
        </div>
        <div class="mt-4">
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <i class="fas fa-times mr-2"></i>Dismiss
            </button>
        </div>
    `;
    
    // Remove existing result/error areas
    const existingResult = document.getElementById('resultArea');
    const existingError = document.querySelector('.bg-red-50, .bg-red-900\\/20');
    if (existingResult) existingResult.remove();
    if (existingError) existingError.remove();
    
    // Add error area
    const toolModalContent = document.getElementById('toolModalContent');
    toolModalContent.appendChild(errorArea);
}

function showResult(result) {
    document.getElementById('progressContainer').classList.add('hidden');
    document.getElementById('resultArea').classList.remove('hidden');
    
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = () => {
        PDFUtils.downloadBlob(result.blob, result.filename);
        showNotification('File downloaded successfully!', 'success');
    };
}

function showMultipleResults(results) {
    document.getElementById('progressContainer').classList.add('hidden');
    
    // Create custom result area for multiple files
    const resultArea = document.createElement('div');
    resultArea.className = 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4';
    
    let resultHTML = `
        <div class="flex items-center mb-4">
            <div class="text-green-400 mr-3">
                <i class="fas fa-check-circle text-xl"></i>
            </div>
            <div class="flex-1">
                <h4 class="text-green-800 dark:text-green-200 font-medium">Processing Complete!</h4>
                <p class="text-green-600 dark:text-green-300 text-sm">${results.length} files have been processed successfully.</p>
            </div>
        </div>
        <div class="space-y-2">
    `;
    
    results.forEach((result, index) => {
        resultHTML += `
            <div class="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="flex items-center">
                    <div class="text-primary mr-3">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <span class="text-gray-900 dark:text-white font-medium">${result.filename}</span>
                </div>
                <button onclick="downloadSingleResult(${index})" 
                        class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <i class="fas fa-download mr-2"></i>Download
                </button>
            </div>
        `;
    });
    
    resultHTML += `
        </div>
        <div class="mt-4">
            <button onclick="downloadAllResults()" 
                    class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors">
                <i class="fas fa-download mr-2"></i>Download All Files
            </button>
        </div>
    `;
    
    resultArea.innerHTML = resultHTML;
    
    // Remove existing result areas
    const existingResult = document.getElementById('resultArea');
    if (existingResult) existingResult.remove();
    
    // Add new result area
    const toolModalContent = document.getElementById('toolModalContent');
    toolModalContent.appendChild(resultArea);
    
    // Store results globally for download functions
    window.currentResults = results;
}

// Global functions for multiple file downloads
window.downloadSingleResult = function(index) {
    const result = window.currentResults[index];
    PDFUtils.downloadBlob(result.blob, result.filename);
    showNotification(`${result.filename} downloaded successfully!`, 'success');
};

window.downloadAllResults = function() {
    window.currentResults.forEach(result => {
        PDFUtils.downloadBlob(result.blob, result.filename);
    });
    showNotification(`All ${window.currentResults.length} files downloaded successfully!`, 'success');
};

