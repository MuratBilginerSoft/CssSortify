# Change Log / Değişiklik Günlüğü

[English](#english) | [Türkçe](#türkçe)

---

# English

All notable changes to the "CssSortify" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.0] - 2025-03-06

### Added
- Added Russian language support
- Added "Sort by Category with Spacing" feature
  - Sorts CSS properties by category and adds spacing between different category groups
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+Shift+C)
- Added CSS Minify feature
  - Minifies CSS code and saves it as a .min.css file
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+M)
  - Removes comments, whitespace, and unnecessary characters
- Added CSS Minify In-Place feature
  - Minifies CSS code directly in the editor without creating a new file
  - Works on selected text or entire document
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+Shift+M)
- Added Extract CSS from HTML feature
  - Extracts all CSS from style tags in an HTML file and creates a separate CSS file
  - Automatically removes style tags and adds a link to the external CSS file
  - Asks for a filename or generates a random one if none provided
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+E)
- Added feature to convert inline styles to classes in HTML files
  - Convert all inline styles (Ctrl+Alt+I) or just the selected element (Ctrl+Alt+Shift+I)
  - Uses "mb" prefix followed by celestial body names for class naming (e.g., mbVenusDiv123)
  - Creates camelCase class names with element type and random number (1-1000)
- Added HTML support
  - Now works with HTML and HTM files
  - Automatically detects and processes CSS within <style> tags
  - Only shows sorting options (not minify) in HTML files
  - Maintains proper indentation within style tags
  - Preserves HTML document structure
- Added "Sort by Category" feature
  - CSS properties are now grouped into 8 logical categories:
    - Box Model (width, height, margin, padding, border, etc.)
    - Positioning (position, display, flex, grid, etc.)
    - Typography (font, text, line-height, etc.)
    - Visual/Color (color, background, opacity, etc.)
    - Animation (transition, animation, transform, etc.)
    - List and Table (list-style, table-layout, etc.)
    - User Interface (cursor, user-select, etc.)
    - Other (content, clip-path, etc.)
  - Added keyboard shortcut (Ctrl+Alt+C) for category sorting
- Added multiple sorting options
  - Sort by Length (Descending) - Ctrl+Alt+F
  - Sort by Length (Ascending) - Ctrl+Alt+A
  - Sort Alphabetically (A-Z) - Ctrl+Alt+Z
  - Sort Alphabetically (Z-A) - Ctrl+Alt+X
  - Sort by Category - Ctrl+Alt+C
  - Sort by Category with Spacing - Ctrl+Alt+Shift+C
- Added multi-language support
  - English
  - Turkish
  - German
  - Chinese (Simplified)
  - Chinese (Traditional)
  - Russian

### Changed
- Refactored codebase to use CommonJS module system
- Improved code organization with modular architecture
- Enhanced localization system with support for multiple languages
- Moved localization files to a dedicated 'locales' folder
- Improved error handling and user feedback
- Updated command titles in context menu for better usability
- Optimized extension size with webpack bundling
- Enhanced display:flex property handling to always appear at the top of its group
- Improved flex property ordering to follow a logical sequence
- Organized context menu items under a "CssSortify" submenu for cleaner UI

### Fixed
- Fixed CSS property formatting issues
- Fixed localization message handling
- Fixed module import/export issues
- Fixed property formatting and semicolon issues
- Fixed indentation in media queries and nested selectors
- Fixed multiple spaces between properties

## [0.1.3] - 2025-02-12

### Added
- Added validation for CSS selector selection
- Added error messages for invalid selections
- Added support for nested CSS selectors
- Added proper indentation for media queries

### Fixed
- Fixed property formatting and semicolon issues
- Fixed indentation in media queries and nested selectors
- Fixed multiple spaces between properties

### Changed
- Improved code organization with webpack bundling
- Optimized extension size

## [0.1.2] - 2025-02-12

### Changed
- Optimized extension to work exclusively with CSS files
- Added webpack bundling to reduce extension size
- Removed HTML support

## [0.0.4] - 2025-02-12

### Added
- New extension icon
- Added Windsurf and Cursor IDE support
- Additional keywords for better marketplace visibility

## [0.0.3] - 2025-02-12

### Changed
- Updated package.json categories and keywords

## [0.0.2] - 2025-02-12

### Changed
- Updated extension icon

## [0.0.1] - 2025-02-12

### Added
- Initial release
- Multiple sorting options (length ascending/descending, alphabetical A-Z/Z-A)
- Multi-language support (English, Turkish, German, Simplified Chinese, Traditional Chinese)
- Smart CSS property formatting

---

# Türkçe

"CssSortify" eklentisine yapılan tüm önemli değişiklikler bu dosyada belgelenecektir.

Dosyanın nasıl yapılandırılacağına dair öneriler için [Keep a Changelog](http://keepachangelog.com/) adresine bakabilirsiniz.

## [1.0.0] - 2025-03-06

### Eklenenler
- Rusça dil desteği eklendi
- "Kategoriye Göre Aralıklı Sıralama" özelliği eklendi
  - CSS özelliklerini kategoriye göre sıralar ve farklı kategori grupları arasına boşluk ekler
  - Sağ tık menüsü ve klavye kısayolu (Ctrl+Alt+Shift+C) ile erişilebilir
- CSS Minify özelliği eklendi
  - CSS kodunu sıkıştırır ve .min.css olarak kaydeder
  - Sağ tık menüsü ve klavye kısayolu (Ctrl+Alt+M) ile erişilebilir
  - Yorumları, boşlukları ve gereksiz karakterleri kaldırır
- CSS Minify In-Place özelliği eklendi
  - CSS kodunu doğrudan editörde sıkıştırır, yeni bir dosya oluşturmaz
  - Seçili metin veya tüm belge üzerinde çalışır
  - Sağ tık menüsü ve klavye kısayolu (Ctrl+Alt+Shift+M) ile erişilebilir
- HTML'den CSS Çıkarma özelliği eklendi
  - Bir HTML dosyasındaki tüm CSS'i style etiketlerinden çıkarır ve ayrı bir CSS dosyası oluşturur
  - Style etiketlerini otomatik olarak kaldırır ve harici CSS dosyasına bir bağlantı ekler
  - Bir dosya adı ister veya hiçbiri sağlanmazsa rastgele bir ad oluşturur
  - Sağ tık menüsü ve klavye kısayolu (Ctrl+Alt+E) ile erişilebilir
- HTML dosyalarındaki inline stilleri class'lara dönüştürme özelliği eklendi
  - Tüm inline stilleri (Ctrl+Alt+I) veya sadece seçili elementi (Ctrl+Alt+Shift+I) dönüştürür
  - Class isimlendirmesi için "mb" öneki ve gök cismi isimleri kullanır (örn. mbVenusDiv123)
  - Element türü ve rastgele bir sayı (1-1000) içeren camelCase class isimleri oluşturur
- HTML desteği eklendi
  - Şimdi HTML ve HTM dosyalarıyla çalışır
  - <style> etiketleri içindeki CSS'i otomatik olarak algılar ve işler
  - Sadece HTML dosyalarında sıralama seçenekleri (minify değil) gösterir
  - Style etiketleri içindeki doğru girintiyi korur
  - HTML belge yapısını korur
- "Kategoriye Göre Sıralama" özelliği eklendi
  - CSS özellikleri şimdi 8 mantıksal kategoriye gruplandırılır:
    - Kutu Modeli (width, height, margin, padding, border, vb.)
    - Konumlandırma (position, display, flex, grid, vb.)
    - Tipografi (font, text, line-height, vb.)
    - Görsel/Renk (color, background, opacity, vb.)
    - Animasyon (transition, animation, transform, vb.)
    - Liste ve Tablo (list-style, table-layout, vb.)
    - Kullanıcı Arayüzü (cursor, user-select, vb.)
    - Diğer (content, clip-path, vb.)
  - Kategori sıralaması için klavye kısayolu (Ctrl+Alt+C) eklendi
- Çoklu sıralama seçenekleri eklendi
  - Uzunluğa Göre Sırala (Azalan) - Ctrl+Alt+F
  - Uzunluğa Göre Sırala (Artan) - Ctrl+Alt+A
  - Alfabetik Sırala (A-Z) - Ctrl+Alt+Z
  - Alfabetik Sırala (Z-A) - Ctrl+Alt+X
  - Kategoriye Göre Sırala - Ctrl+Alt+C
  - Kategoriye Göre Aralıklı Sırala - Ctrl+Alt+Shift+C
- Çoklu dil desteği eklendi
  - İngilizce
  - Türkçe
  - Almanca
  - Basitleştirilmiş Çince
  - Geleneksel Çince
  - Rusça

### Değişenler
- Kod tabanı CommonJS modül sistemini kullanacak şekilde yeniden yapılandırıldı
- Modüler mimari ile kod organizasyonu iyileştirildi
- Çoklu dil desteği ile yerelleştirme sistemi geliştirildi
- Yerelleştirme dosyaları 'locales' adlı özel bir klasöre taşındı
- Hata işleme ve kullanıcı geri bildirimi iyileştirildi
- Sağ tık menüsündeki komut başlıkları daha iyi kullanılabilirlik için güncellendi
- Webpack paketleme ile eklenti boyutu optimize edildi
- display:flex özelliğinin her zaman grubunun en üstünde görünmesi için iyileştirildi
- flex özelliklerinin mantıksal bir sırayla sıralanması için iyileştirildi
- Sağ tık menüsü öğeleri daha temiz bir UI için "CssSortify" alt menüsüne taşındı

### Düzeltilenler
- CSS özellik biçimlendirme sorunları düzeltildi
- Yerelleştirme mesaj işleme sorunları düzeltildi
- Modül içe/dışa aktarma sorunları düzeltildi
- Özellik biçimlendirme ve noktalı virgül sorunları düzeltildi
- Medya sorguları ve iç içe seçicilerde girinti sorunları düzeltildi
- Özellikler arasındaki çoklu boşluk sorunları düzeltildi

## [0.1.3] - 2025-02-12

### Eklenenler
- CSS seçici seçimi için doğrulama eklendi
- Geçersiz seçimler için hata mesajları eklendi
- İç içe CSS seçicileri için destek eklendi
- Medya sorguları için düzgün girinti eklendi

### Düzeltilenler
- Özellik biçimlendirme ve noktalı virgül sorunları düzeltildi
- Medya sorguları ve iç içe seçicilerde girinti sorunları düzeltildi
- Özellikler arasındaki çoklu boşluk sorunları düzeltildi

### Değişenler
- Webpack paketleme ile kod organizasyonu iyileştirildi
- Eklenti boyutu optimize edildi

## [0.1.2] - 2025-02-12

### Değişenler
- Eklenti yalnızca CSS dosyalarıyla çalışacak şekilde optimize edildi
- Eklenti boyutunu azaltmak için webpack paketleme eklendi
- HTML desteği kaldırıldı

## [0.0.4] - 2025-02-12

### Eklenenler
- Yeni eklenti simgesi
- Windsurf ve Cursor IDE desteği eklendi
- Marketplace'de daha iyi görünürlük için ek anahtar kelimeler eklendi

## [0.0.3] - 2025-02-12

### Değişenler
- package.json kategorileri ve anahtar kelimeleri güncellendi

## [0.0.2] - 2025-02-12

### Değişenler
- Eklenti simgesi güncellendi

## [0.0.1] - 2025-02-12

### Eklenenler
- İlk sürüm
- Çoklu sıralama seçenekleri (uzunluğa göre artan/azalan, alfabetik A-Z/Z-A)
- Çoklu dil desteği (İngilizce, Türkçe, Almanca, Basitleştirilmiş Çince, Geleneksel Çince)
- Akıllı CSS özellik biçimlendirme
