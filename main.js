// Main JavaScript file for PDF Tools website
// Handles navigation, dark mode, language switching, and tool management

// Global variables
let currentLanguage = 'en';
let recentTools = JSON.parse(localStorage.getItem('recentTools')) || [];

// Language translations
const translations = {
    en: {
        title: 'PDF Tools - Free Online PDF Editor',
        heroTitle: 'Free PDF Tools Online',
        heroSubtitle: 'Edit, convert, merge, split, and secure your PDF files - all in your browser',
        secure: '100% Secure',
        fast: 'Lightning Fast',
        mobile: 'Mobile Friendly',
        recentlyUsed: 'Recently Used',
        organizePdf: 'Organize PDF',
        convertTo: 'Convert to PDF',
        convertFrom: 'Convert from PDF',
        editPdf: 'Edit PDF',
        pdfSecurity: 'PDF Security',
        // Tool names
        mergePdf: 'Merge PDF',
        splitPdf: 'Split PDF',
        removePages: 'Remove Pages',
        extractPages: 'Extract Pages',
        rotatePdf: 'Rotate PDF',
        jpgToPdf: 'JPG to PDF',
        wordToPdf: 'Word to PDF',
        powerpointToPdf: 'PowerPoint to PDF',
        excelToPdf: 'Excel to PDF',
        htmlToPdf: 'HTML to PDF',
        pdfToJpg: 'PDF to JPG',
        pdfToWord: 'PDF to Word',
        pdfToPowerpoint: 'PDF to PowerPoint',
        pdfToExcel: 'PDF to Excel',
        pdfToPdfa: 'PDF to PDF/A',
        addPageNumbers: 'Add Page Numbers',
        addWatermark: 'Add Watermark',
        cropPdf: 'Crop PDF',
        editText: 'Edit Text',
        comparePdfs: 'Compare PDFs',
        signPdf: 'Sign PDF',
        redactPdf: 'Redact PDF',
        unlockPdf: 'Unlock PDF',
        protectPdf: 'Protect PDF',
        repairPdf: 'Repair PDF',
        optimizePdf: 'Optimize PDF',
        ocrPdf: 'OCR PDF',
        scanToPdf: 'Scan to PDF'
    },
    hi: {
        title: 'PDF टूल्स - मुफ्त ऑनलाइन PDF एडिटर',
        heroTitle: 'मुफ्त PDF टूल्स ऑनलाइन',
        heroSubtitle: 'अपनी PDF फाइलों को संपादित, परिवर्तित, मर्ज, विभाजित और सुरक्षित करें',
        secure: '100% सुरक्षित',
        fast: 'बिजली की तेजी',
        mobile: 'मोबाइल फ्रेंडली',
        recentlyUsed: 'हाल ही में उपयोग किया गया',
        organizePdf: 'PDF व्यवस्थित करें',
        convertTo: 'PDF में कन्वर्ट करें',
        convertFrom: 'PDF से कन्वर्ट करें',
        editPdf: 'PDF संपादित करें',
        pdfSecurity: 'PDF सुरक्षा'
    },
    es: {
        title: 'Herramientas PDF - Editor PDF Gratuito en Línea',
        heroTitle: 'Herramientas PDF Gratuitas en Línea',
        heroSubtitle: 'Edita, convierte, combina, divide y protege tus archivos PDF en tu navegador',
        secure: '100% Seguro',
        fast: 'Súper Rápido',
        mobile: 'Compatible con Móviles',
        recentlyUsed: 'Usado Recientemente',
        organizePdf: 'Organizar PDF',
        convertTo: 'Convertir a PDF',
        convertFrom: 'Convertir desde PDF',
        editPdf: 'Editar PDF',
        pdfSecurity: 'Seguridad PDF'
    },
    fr: {
        title: 'Outils PDF - Éditeur PDF Gratuit en Ligne',
        heroTitle: 'Outils PDF Gratuits en Ligne',
        heroSubtitle: 'Éditez, convertissez, fusionnez, divisez et sécurisez vos fichiers PDF dans votre navigateur',
        secure: '100% Sécurisé',
        fast: 'Ultra Rapide',
        mobile: 'Compatible Mobile',
        recentlyUsed: 'Récemment Utilisé',
        organizePdf: 'Organiser PDF',
        convertTo: 'Convertir en PDF',
        convertFrom: 'Convertir depuis PDF',
        editPdf: 'Éditer PDF',
        pdfSecurity: 'Sécurité PDF'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize language selector
    initializeLanguageSelector();
    
    // Load recent tools
    loadRecentTools();
    
    // Add smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Initialize tool modal
    initializeToolModal();
}

// Dark mode functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    }
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Language selector functionality
function initializeLanguageSelector() {
    const languageSelector = document.getElementById('languageSelector');
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    languageSelector.value = savedLanguage;
    currentLanguage = savedLanguage;
    
    languageSelector.addEventListener('change', function() {
        currentLanguage = this.value;
        localStorage.setItem('language', currentLanguage);
        updateLanguage();
    });
    
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLanguage];
    if (!t) return;
    
    // Update page title
    document.title = t.title;
    
    // Update hero section
    const heroTitle = document.querySelector('section h1');
    const heroSubtitle = document.querySelector('section p');
    if (heroTitle) heroTitle.textContent = t.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
    
    // Update feature badges
    const featureBadges = document.querySelectorAll('.bg-white\\/20 .backdrop-blur-sm');
    // Note: This is a simplified implementation. In a real app, you'd have more specific selectors
}

// Recent tools functionality
function loadRecentTools() {
    const recentToolsSection = document.getElementById('recentTools');
    const recentToolsGrid = document.getElementById('recentToolsGrid');
    
    if (recentTools.length === 0) {
        recentToolsSection.classList.add('hidden');
        return;
    }
    
    recentToolsSection.classList.remove('hidden');
    recentToolsGrid.innerHTML = '';
    
    recentTools.forEach(toolId => {
        const toolInfo = getToolInfo(toolId);
        if (toolInfo) {
            const toolCard = createToolCard(toolInfo);
            recentToolsGrid.appendChild(toolCard);
        }
    });
}

function addToRecentTools(toolId) {
    // Remove if already exists
    recentTools = recentTools.filter(id => id !== toolId);
    
    // Add to beginning
    recentTools.unshift(toolId);
    
    // Keep only last 3
    recentTools = recentTools.slice(0, 3);
    
    // Save to localStorage
    localStorage.setItem('recentTools', JSON.stringify(recentTools));
    
    // Reload recent tools display
    loadRecentTools();
}

function getToolInfo(toolId) {
    const toolMap = {
        'merge-pdf': { name: 'Merge PDF', icon: 'fas fa-compress-arrows-alt', description: 'Combine multiple PDFs into one' },
        'split-pdf': { name: 'Split PDF', icon: 'fas fa-expand-arrows-alt', description: 'Extract pages into separate PDFs' },
        'remove-pages': { name: 'Remove Pages', icon: 'fas fa-trash-alt', description: 'Delete unwanted pages' },
        'extract-pages': { name: 'Extract Pages', icon: 'fas fa-file-export', description: 'Extract specific pages' },
        'rotate-pdf': { name: 'Rotate PDF', icon: 'fas fa-redo-alt', description: 'Rotate pages to correct orientation' },
        'jpg-to-pdf': { name: 'JPG to PDF', icon: 'fas fa-image', description: 'Convert images to PDF' },
        'word-to-pdf': { name: 'Word to PDF', icon: 'fas fa-file-word', description: 'Convert DOCX files to PDF' },
        'powerpoint-to-pdf': { name: 'PowerPoint to PDF', icon: 'fas fa-file-powerpoint', description: 'Convert PPTX to PDF' },
        'excel-to-pdf': { name: 'Excel to PDF', icon: 'fas fa-file-excel', description: 'Convert XLSX to PDF' },
        'html-to-pdf': { name: 'HTML to PDF', icon: 'fas fa-code', description: 'Convert web pages to PDF' },
        'pdf-to-jpg': { name: 'PDF to JPG', icon: 'fas fa-image', description: 'Extract pages as images' },
        'pdf-to-word': { name: 'PDF to Word', icon: 'fas fa-file-word', description: 'Convert PDF to DOCX' },
        'pdf-to-powerpoint': { name: 'PDF to PowerPoint', icon: 'fas fa-file-powerpoint', description: 'Convert PDF to PPTX' },
        'pdf-to-excel': { name: 'PDF to Excel', icon: 'fas fa-file-excel', description: 'Convert PDF to XLSX' },
        'pdf-to-pdfa': { name: 'PDF to PDF/A', icon: 'fas fa-file-archive', description: 'Convert to archival format' },
        'add-page-numbers': { name: 'Add Page Numbers', icon: 'fas fa-list-ol', description: 'Number your pages' },
        'add-watermark': { name: 'Add Watermark', icon: 'fas fa-tint', description: 'Add text or image watermark' },
        'crop-pdf': { name: 'Crop PDF', icon: 'fas fa-crop-alt', description: 'Trim page margins' },
        'edit-text': { name: 'Edit Text', icon: 'fas fa-font', description: 'Modify PDF text content' },
        'compare-pdfs': { name: 'Compare PDFs', icon: 'fas fa-not-equal', description: 'Find differences between files' },
        'sign-pdf': { name: 'Sign PDF', icon: 'fas fa-signature', description: 'Add digital signature' },
        'redact-pdf': { name: 'Redact PDF', icon: 'fas fa-marker', description: 'Black out sensitive information' },
        'unlock-pdf': { name: 'Unlock PDF', icon: 'fas fa-unlock', description: 'Remove password protection' },
        'protect-pdf': { name: 'Protect PDF', icon: 'fas fa-lock', description: 'Add password protection' },
        'repair-pdf': { name: 'Repair PDF', icon: 'fas fa-wrench', description: 'Fix corrupted files' },
        'optimize-pdf': { name: 'Optimize PDF', icon: 'fas fa-compress', description: 'Reduce file size' },
        'ocr-pdf': { name: 'OCR PDF', icon: 'fas fa-eye', description: 'Extract text from scanned PDFs' },
        'scan-to-pdf': { name: 'Scan to PDF', icon: 'fas fa-scanner', description: 'Convert scanned images to PDF' }
    };
    
    return toolMap[toolId];
}

function createToolCard(toolInfo) {
    const card = document.createElement('div');
    card.className = 'tool-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center cursor-pointer';
    card.onclick = () => openTool(toolInfo.id);
    
    card.innerHTML = `
        <div class="text-4xl text-primary mb-4">
            <i class="${toolInfo.icon}"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${toolInfo.name}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">${toolInfo.description}</p>
    `;
    
    return card;
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tool modal functionality
function initializeToolModal() {
    const modal = document.getElementById('toolModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeToolModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeToolModal();
        }
    });
}

function openTool(toolId) {
    const toolInfo = getToolInfo(toolId);
    if (!toolInfo) return;
    
    // Add to recent tools
    addToRecentTools(toolId);
    
    // Update modal title
    document.getElementById('toolModalTitle').textContent = toolInfo.name;
    
    // Load tool content
    loadToolContent(toolId);
    
    // Show modal
    document.getElementById('toolModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeToolModal() {
    document.getElementById('toolModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Clear modal content
    document.getElementById('toolModalContent').innerHTML = '';
}

function loadToolContent(toolId) {
    const content = document.getElementById('toolModalContent');
    
    // Create base tool interface
    content.innerHTML = `
        <div class="space-y-6">
            <!-- File Upload Area -->
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <div class="space-y-4">
                    <div class="text-4xl text-gray-400">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Choose files or drag and drop
                        </h3>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">
                            Select PDF files from your device
                        </p>
                    </div>
                    <div>
                        <input type="file" id="fileInput" class="hidden" multiple accept=".pdf,.jpg,.jpeg,.png,.docx,.pptx,.xlsx,.html">
                        <button onclick="document.getElementById('fileInput').click()" 
                                class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            Select Files
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- File List -->
            <div id="fileList" class="hidden">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Selected Files</h4>
                <div id="fileItems" class="space-y-2">
                    <!-- File items will be added here -->
                </div>
            </div>
            
            <!-- Tool Options -->
            <div id="toolOptions" class="hidden">
                <!-- Tool-specific options will be loaded here -->
            </div>
            
            <!-- Progress Bar -->
            <div id="progressContainer" class="hidden">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Processing...</span>
                    <span id="progressText" class="text-sm text-gray-500 dark:text-gray-400">0%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div id="progressBar" class="bg-primary h-2 rounded-full progress-bar" style="width: 0%"></div>
                </div>
            </div>
            
            <!-- Result Area -->
            <div id="resultArea" class="hidden">
                <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div class="flex items-center">
                        <div class="text-green-400 mr-3">
                            <i class="fas fa-check-circle text-xl"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-green-800 dark:text-green-200 font-medium">Processing Complete!</h4>
                            <p class="text-green-600 dark:text-green-300 text-sm">Your file has been processed successfully.</p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button id="downloadBtn" class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            <i class="fas fa-download mr-2"></i>Download Result
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <button onclick="closeToolModal()" 
                        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-4 py-2 rounded-lg transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>Back
                </button>
                <button id="processBtn" 
                        class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled>
                    <i class="fas fa-cog mr-2"></i>Process Files
                </button>
            </div>
        </div>
    `;
    
    // Initialize file handling for this tool
    initializeFileHandling(toolId);
    
    // Load tool-specific options
    loadToolOptions(toolId);
}

function initializeFileHandling(toolId) {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const fileItems = document.getElementById('fileItems');
    const processBtn = document.getElementById('processBtn');
    
    // Update file input accept attribute based on tool
    updateFileInputAccept(toolId, fileInput);
    
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            displayFiles(files);
            fileList.classList.remove('hidden');
            processBtn.disabled = false;
        }
    });
    
    // Add drag and drop functionality
    const dropZone = fileInput.parentElement.parentElement.parentElement;
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('border-primary', 'bg-primary-light');
    });
    
    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dropZone.classList.remove('border-primary', 'bg-primary-light');
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('border-primary', 'bg-primary-light');
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            displayFiles(files);
            fileList.classList.remove('hidden');
            processBtn.disabled = false;
        }
    });
    
    // Process button click handler
    processBtn.addEventListener('click', function() {
        processFiles(toolId, Array.from(fileInput.files));
    });
}

function updateFileInputAccept(toolId, fileInput) {
    const acceptMap = {
        'merge-pdf': '.pdf',
        'split-pdf': '.pdf',
        'remove-pages': '.pdf',
        'extract-pages': '.pdf',
        'rotate-pdf': '.pdf',
        'jpg-to-pdf': '.jpg,.jpeg,.png,.gif,.bmp,.webp',
        'word-to-pdf': '.docx,.doc',
        'powerpoint-to-pdf': '.pptx,.ppt',
        'excel-to-pdf': '.xlsx,.xls',
        'html-to-pdf': '.html,.htm',
        'pdf-to-jpg': '.pdf',
        'pdf-to-word': '.pdf',
        'pdf-to-powerpoint': '.pdf',
        'pdf-to-excel': '.pdf',
        'pdf-to-pdfa': '.pdf',
        'add-page-numbers': '.pdf',
        'add-watermark': '.pdf',
        'crop-pdf': '.pdf',
        'edit-text': '.pdf',
        'compare-pdfs': '.pdf',
        'sign-pdf': '.pdf',
        'redact-pdf': '.pdf',
        'unlock-pdf': '.pdf',
        'protect-pdf': '.pdf',
        'repair-pdf': '.pdf',
        'optimize-pdf': '.pdf',
        'ocr-pdf': '.pdf',
        'scan-to-pdf': '.jpg,.jpeg,.png,.gif,.bmp,.webp'
    };
    
    fileInput.accept = acceptMap[toolId] || '.pdf';
}

function displayFiles(files) {
    const fileItems = document.getElementById('fileItems');
    fileItems.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg';
        
        fileItem.innerHTML = `
            <div class="flex items-center">
                <div class="text-primary mr-3">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div>
                    <div class="font-medium text-gray-900 dark:text-white">${file.name}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <button onclick="removeFile(${index})" class="text-red-500 hover:text-red-700 p-1">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        fileItems.appendChild(fileItem);
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeFile(index) {
    const fileInput = document.getElementById('fileInput');
    const files = Array.from(fileInput.files);
    files.splice(index, 1);
    
    // Create new FileList
    const dt = new DataTransfer();
    files.forEach(file => dt.items.add(file));
    fileInput.files = dt.files;
    
    if (files.length === 0) {
        document.getElementById('fileList').classList.add('hidden');
        document.getElementById('processBtn').disabled = true;
    } else {
        displayFiles(files);
    }
}

function loadToolOptions(toolId) {
    const toolOptions = document.getElementById('toolOptions');
    
    // Tool-specific options will be implemented in tools.js
    // This is a placeholder for the interface
    
    switch(toolId) {
        case 'merge-pdf':
            toolOptions.innerHTML = `
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Merge Options</h4>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Page Order
                        </label>
                        <select id="pageOrder" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="original">Keep original order</option>
                            <option value="alphabetical">Sort alphabetically</option>
                            <option value="size">Sort by file size</option>
                        </select>
                    </div>
                </div>
            `;
            toolOptions.classList.remove('hidden');
            break;
            
        case 'add-watermark':
            toolOptions.innerHTML = `
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Watermark Options</h4>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Watermark Text
                        </label>
                        <input type="text" id="watermarkText" placeholder="Enter watermark text" 
                               class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Position
                            </label>
                            <select id="watermarkPosition" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option value="center">Center</option>
                                <option value="top-left">Top Left</option>
                                <option value="top-right">Top Right</option>
                                <option value="bottom-left">Bottom Left</option>
                                <option value="bottom-right">Bottom Right</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Opacity
                            </label>
                            <input type="range" id="watermarkOpacity" min="0.1" max="1" step="0.1" value="0.5"
                                   class="w-full">
                        </div>
                    </div>
                </div>
            `;
            toolOptions.classList.remove('hidden');
            break;
            
        case 'protect-pdf':
            toolOptions.innerHTML = `
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Protection Options</h4>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input type="password" id="pdfPassword" placeholder="Enter password" 
                               class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <input type="password" id="confirmPassword" placeholder="Confirm password" 
                               class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    </div>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" id="allowPrinting" class="mr-2">
                            <span class="text-sm text-gray-700 dark:text-gray-300">Allow printing</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="allowCopying" class="mr-2">
                            <span class="text-sm text-gray-700 dark:text-gray-300">Allow copying text</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="allowModifying" class="mr-2">
                            <span class="text-sm text-gray-700 dark:text-gray-300">Allow modifying</span>
                        </label>
                    </div>
                </div>
            `;
            toolOptions.classList.remove('hidden');
            break;
            
        default:
            // Most tools don't need special options
            break;
    }
}

// Process files function - will be implemented in tools.js
function processFiles(toolId, files) {
    // Show progress
    showProgress();
    
    // This will be implemented in tools.js with actual PDF processing logic
    setTimeout(() => {
        updateProgress(100);
        showResult('processed-file.pdf');
    }, 2000);
}

function showProgress() {
    document.getElementById('progressContainer').classList.remove('hidden');
    document.getElementById('processBtn').disabled = true;
}

function updateProgress(percentage) {
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = percentage + '%';
}

function showResult(filename) {
    document.getElementById('progressContainer').classList.add('hidden');
    document.getElementById('resultArea').classList.remove('hidden');
    
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = () => downloadFile(filename);
}

function downloadFile(filename) {
    // This will be implemented with actual file download logic
    console.log('Downloading:', filename);
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="mr-3">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 
                    'fa-info-circle'
                }"></i>
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

