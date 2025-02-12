<<<<<<< HEAD
# CssSortify 🎨

[English](#english) | [Türkçe](#türkçe)

---

# English

A VS Code extension that intelligently sorts CSS properties by length or alphabetically, making your stylesheets clean and organized.

## ✨ Features

- 🔄 **4 Different Sorting Options:**
  - Sort by Length (Descending)
  - Sort by Length (Ascending)
  - Sort Alphabetically (A-Z)
  - Sort Alphabetically (Z-A)

- 🌈 **Smart CSS Formatting:**
  - Single space after colon (`color: red`)
  - Space after commas (`rgba(0, 0, 0, 0.5)`)
  - Proper spacing for `!important` (`color: red !important`)
  - Clean up multiple spaces

- 🌍 **Multi-language Support:**
  - English
  - Turkish
  - German
  - Chinese (Simplified)
  - Chinese (Traditional)

## 🚀 Usage

1. Open your CSS file
2. Select the CSS block you want to sort (optional, entire file will be sorted if no selection)
3. Use one of these shortcuts:
   - `Ctrl+Alt+S`: Sort by length (descending)
   - `Ctrl+Alt+A`: Sort by length (ascending)
   - `Ctrl+Alt+Z`: Sort alphabetically (A-Z)
   - `Ctrl+Alt+X`: Sort alphabetically (Z-A)

Or:
1. Right-click in your CSS file
2. Select your preferred sorting option from the menu

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

- 🔄 **4 Farklı Sıralama Seçeneği:**
  - Uzunluğa Göre (Azalan)
  - Uzunluğa Göre (Artan)
  - Alfabetik (A-Z)
  - Alfabetik (Z-A)

- 🌈 **Akıllı CSS Formatı:**
  - Key-value arasında tek boşluk (`color: red`)
  - Virgüllerden sonra boşluk (`rgba(0, 0, 0, 0.5)`)
  - `!important` için düzgün boşluk (`color: red !important`)
  - Çoklu boşlukları temizleme

- 🌍 **Çoklu Dil Desteği:**
  - Türkçe
  - İngilizce
  - Almanca
  - Çince (Basitleştirilmiş)
  - Çince (Geleneksel)

## 🚀 Kullanım

1. CSS dosyanızı açın
2. Düzenlemek istediğiniz CSS bloğunu seçin (opsiyonel, seçim yapmazsanız tüm dosya düzenlenir)
3. Aşağıdaki kısayollardan birini kullanın:
   - `Ctrl+Alt+S`: Uzunluğa göre azalan sırada sırala
   - `Ctrl+Alt+A`: Uzunluğa göre artan sırada sırala
   - `Ctrl+Alt+Z`: Alfabetik sırala (A-Z)
   - `Ctrl+Alt+X`: Alfabetik sırala (Z-A)

Ya da:
1. CSS dosyanızda sağ tıklayın
2. Menüden istediğiniz sıralama seçeneğini seçin

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
=======
# CssSortify
Smart CSS property sorter with multiple sorting options
>>>>>>> ef1b36d0f0fa27b7c6db7fc9c45054b1442ef046
