# CssSortify 🎨

[English](#english) | [Türkçe](#türkçe)

---

# English

A VS Code extension that intelligently sorts CSS properties by length or alphabetically, making your stylesheets clean and organized.

## ✨ Features

- 🔄 **Multiple Sorting Options:**
  - Sort by Length (Descending)
  - Sort by Length (Ascending)
  - Sort Alphabetically (A-Z)
  - Sort Alphabetically (Z-A)
  - Sort by Category (Box Model, Positioning, Typography, etc.)
  - Sort by Category with Spacing between groups

- 🌈 **Smart CSS Formatting:**
  - Single space after colon (`color: red`)
  - Space after commas (`rgba(0, 0, 0, 0.5)`)
  - Proper spacing for `!important` (`color: red !important`)
  - Clean up multiple spaces

- 🧩 **CSS Minification:**
  - Minify CSS and save as .min.css file (Ctrl+Alt+M)
  - Minify CSS in-place (Ctrl+Alt+Shift+M)
  - Remove comments, whitespace, and unnecessary characters

- 📦 **HTML Integration:**
  - Extract CSS from HTML to external file (Ctrl+Alt+E)
  - Convert inline styles to classes (Ctrl+Alt+I)
  - Convert selected element's inline style to class (Ctrl+Alt+Shift+I)
  - Smart class naming with celestial body names

- 🌍 **Multi-language Support:**
  - English
  - Turkish
  - German
  - Russian
  - Chinese (Simplified)
  - Chinese (Traditional)

## 🚀 Usage

1. Open your CSS or HTML file
2. Select the CSS block you want to sort (optional, entire file will be sorted if no selection)
3. Use one of these shortcuts:
   - `Ctrl+Alt+F`: Sort by length (descending)
   - `Ctrl+Alt+A`: Sort by length (ascending)
   - `Ctrl+Alt+Z`: Sort alphabetically (A-Z)
   - `Ctrl+Alt+X`: Sort alphabetically (Z-A)
   - `Ctrl+Alt+C`: Sort by category
   - `Ctrl+Alt+Shift+C`: Sort by category with spacing
   - `Ctrl+Alt+M`: Minify CSS and save as .min.css
   - `Ctrl+Alt+Shift+M`: Minify CSS in-place
   - `Ctrl+Alt+E`: Extract CSS from HTML to external file
   - `Ctrl+Alt+I`: Convert all inline styles to classes
   - `Ctrl+Alt+Shift+I`: Convert selected element's inline style to class

Or:
1. Right-click in your CSS or HTML file
2. Select your preferred option from the CssSortify submenu

## 📝 Example

**Input:**
```css
.example {
    color:red;
    margin:    20px;
    background-color:     #fff;
    padding:0;
    border:1px solid rgba(0,0,0,0.1);
    position:relative!important;
}
```

**1. Sort by Length (Descending):**
```css
.example {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative !important;
    background-color: #fff;
    margin: 20px;
    color: red;
    padding: 0;
}
```

**2. Sort by Length (Ascending):**
```css
.example {
    padding: 0;
    color: red;
    margin: 20px;
    background-color: #fff;
    position: relative !important;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
```

**3. Sort Alphabetically (A-Z):**
```css
.example {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: red;
    margin: 20px;
    padding: 0;
    position: relative !important;
}
```

**4. Sort Alphabetically (Z-A):**
```css
.example {
    position: relative !important;
    padding: 0;
    margin: 20px;
    color: red;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #fff;
}
```

**5. Sort by Category:**
```css
.example {
    margin: 20px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative !important;
    background-color: #fff;
    color: red;
}
```

**6. Sort by Category with Spacing:**
```css
.example {
    margin: 20px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    position: relative !important;
    
    background-color: #fff;
    color: red;
}
```

## ⚙️ Requirements

- Visual Studio Code 1.85.0 or higher

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b super-feature`)
3. Commit your changes (`git commit -m 'Add some super feature'`)
4. Push to the branch (`git push origin super-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

# Türkçe

CSS özelliklerini uzunluğa veya alfabetik sıraya göre akıllıca düzenleyen VS Code eklentisi.

## ✨ Özellikler

- 🔄 **Çoklu Sıralama Seçenekleri:**
  - Uzunluğa Göre (Azalan)
  - Uzunluğa Göre (Artan)
  - Alfabetik (A-Z)
  - Alfabetik (Z-A)
  - Kategoriye Göre (Kutu Modeli, Konumlandırma, Tipografi, vb.)
  - Kategoriye Göre Aralıklı Sıralama

- 🌈 **Akıllı CSS Formatı:**
  - Key-value arasında tek boşluk (`color: red`)
  - Virgüllerden sonra boşluk (`rgba(0, 0, 0, 0.5)`)
  - `!important` için düzgün boşluk (`color: red !important`)
  - Çoklu boşlukları temizleme

- 🧩 **CSS Minifikasyonu:**
  - CSS'i sıkıştırıp .min.css olarak kaydetme (Ctrl+Alt+M)
  - CSS'i yerinde sıkıştırma (Ctrl+Alt+Shift+M)
  - Yorumları, boşlukları ve gereksiz karakterleri kaldırma

- 📦 **HTML Entegrasyonu:**
  - HTML'den CSS'i harici dosyaya çıkarma (Ctrl+Alt+E)
  - Inline stilleri class'lara dönüştürme (Ctrl+Alt+I)
  - Seçili elementin inline stilini class'a dönüştürme (Ctrl+Alt+Shift+I)
  - Gök cisimlerinden esinlenen akıllı class isimlendirme

- 🌍 **Çoklu Dil Desteği:**
  - Türkçe
  - İngilizce
  - Almanca
  - Rusça
  - Çince (Basitleştirilmiş)
  - Çince (Geleneksel)

## 🚀 Kullanım

1. CSS veya HTML dosyanızı açın
2. Düzenlemek istediğiniz CSS bloğunu seçin (opsiyonel, seçim yapmazsanız tüm dosya düzenlenir)
3. Aşağıdaki kısayollardan birini kullanın:
   - `Ctrl+Alt+F`: Uzunluğa göre azalan sırada sırala
   - `Ctrl+Alt+A`: Uzunluğa göre artan sırada sırala
   - `Ctrl+Alt+Z`: Alfabetik sırala (A-Z)
   - `Ctrl+Alt+X`: Alfabetik sırala (Z-A)
   - `Ctrl+Alt+C`: Kategoriye göre sırala
   - `Ctrl+Alt+Shift+C`: Kategoriye göre aralıklı sırala
   - `Ctrl+Alt+M`: CSS'i sıkıştır ve .min.css olarak kaydet
   - `Ctrl+Alt+Shift+M`: CSS'i yerinde sıkıştır
   - `Ctrl+Alt+E`: HTML'den CSS'i harici dosyaya çıkar
   - `Ctrl+Alt+I`: Tüm inline stilleri class'lara dönüştür
   - `Ctrl+Alt+Shift+I`: Seçili elementin inline stilini class'a dönüştür

Ya da:
1. CSS veya HTML dosyanızda sağ tıklayın
2. CssSortify alt menüsünden istediğiniz seçeneği seçin

## 📝 Örnek

**Girdi:**
```css
.example {
    color:red;
    margin:    20px;
    background-color:     #fff;
    padding:0;
    border:1px solid rgba(0,0,0,0.1);
    position:relative!important;
}
```

**1. Uzunluğa Göre (Azalan):**
```css
.example {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative !important;
    background-color: #fff;
    margin: 20px;
    color: red;
    padding: 0;
}
```

**2. Uzunluğa Göre (Artan):**
```css
.example {
    padding: 0;
    color: red;
    margin: 20px;
    background-color: #fff;
    position: relative !important;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
```

**3. Alfabetik (A-Z):**
```css
.example {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: red;
    margin: 20px;
    padding: 0;
    position: relative !important;
}
```

**4. Alfabetik (Z-A):**
```css
.example {
    position: relative !important;
    padding: 0;
    margin: 20px;
    color: red;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #fff;
}
```

**5. Kategoriye Göre:**
```css
.example {
    margin: 20px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative !important;
    background-color: #fff;
    color: red;
}
```

**6. Kategoriye Göre Aralıklı:**
```css
.example {
    /* Kutu Modeli */
    margin: 20px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    /* Konumlandırma */
    position: relative !important;
    
    /* Görsel/Renk */
    background-color: #fff;
    color: red;
}
```

## ⚙️ Gereksinimler

- Visual Studio Code 1.85.0 veya üstü

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch'inizi oluşturun (`git checkout -b super-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Süper özellik eklendi'`)
4. Branch'inizi push edin (`git push origin super-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.