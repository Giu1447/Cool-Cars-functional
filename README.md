# Kompetenznachweis – Projekt "Cool Cars"

**Name**: Sven Lübcke, Giulian Mazzeo
**Datum der Abgabe**: 08.01.2025

---

## **Einleitung**

### **Projektbeschreibung und Zielsetzung**
Das Projekt "Cool Cars" ist eine Auto Website, bei der man auf eine Datenbank mit verschiedenen Autos zugreifen kann. Man kann die Autos dann nach verschiedenen Möglichkeiten filtern. Ziel war es eine Website zu machen wobei man die Autos filtern kann und dabei hauptsächlich auf funktionale Programmierung setzt.

### **Verwendete Technologien**

- **Frontend**:
    - _Next.js_
    - _React_
    - _CSS_
- **Backend**: Spring Boot
---
### **Persönliche Kompetenzstufe – Giulian Mazzeo**

Ich würde meine Kompetenzstufe als **Fortgeschritten** einordnen.

#### **Begründung**

- **Pure Functions**:  
    Reine Funktionen nehmen Eingabedaten, verarbeiten sie und geben ein neues Ergebnis zurück, ohne den Originalzustand zu verändern.
    
    **Beispiel**:
    
    ```javascript
    function filterCars(cars, searchTerm) {
        return cars.filter(
            (car) =>
                car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    ```
    

---

- **Immutable Data Structures**:  
    React-States wie `cars` oder `searchTerm` wurden niemals direkt verändert. Stattdessen habe ich immer Kopien des Zustands erstellt, was die Fehlerminimierung erleichtert hat.

---

- **Higher-Order Functions**:  
    Funktionen wie `map`, `filter` und `sort` wurden verwendet, um die Datenverarbeitung einfacher und deklarativ zu gestalten. 
    
    **Sortierlogik-Beispiel**:
    
    ```javascript
    function sortCars(cars, sortCategory, isAscending) {
        const order = isAscending ? 1 : -1;
        return [...cars].sort((a, b) => {
            if (sortCategory === "alphabet") {
                return order * a.brand.localeCompare(b.brand);
            } else if (sortCategory === "horsepower") {
                return order * (a.horsePower - b.horsePower);
            }
            return 0;
        });
    }
    ```
    

---

### **Persönliche Kompetenzstufe – Sven Lübcke**

Ich würde mein Kompetenz ebenfalls als **Fortgeschritten** einschätzen.

#### **Begründung**

- **Pure Functions**:  
    Ich habe auch Funktionen die den Originalzustand nicht verändern.
    
    **Beispiel:
    
    ```javascript
    function getCarDetails(car) {
        return {
            fullName: `${car.brand} ${car.model}`,
            powerToWeight: car.horsePower / car.weight,
        };
    }
    ```
    

---

- **Immutable Data Structures**:  
    Ich habe darauf geachtet Änderungen nur über Kopien der Daten vorzunehmen. 
    
    **Beispiel**:
    
    ```javascript
    const updatedCars = [...cars];
    updatedCars.push(newCar);
    setCars(updatedCars);
    ```
    

---

- **Higher-Order Functions**:  
    Ich habe Higher-Order Functions häufig genutzt, um die Verarbeitung der Daten übersichtlich und einfach umzusetzen. Vor allem bei der Paginierung habe ich diese Funktionen verwendet.
    **Beispiel**:
    
    ```javascript
    function paginateCars(cars, page, itemsPerPage) {
        const startIndex = (page - 1) * itemsPerPage;
        return cars.slice(startIndex, startIndex + itemsPerPage);
    }
    ```
    

---

## **Umsetzung der Funktionalen Programmierung**

### **Pure Functions**

Im gesamten Projekt wurde darauf geachtet, reine Funktionen zu verwenden. Diese Funktionen nehmen Eingabewerte, verarbeiten sie und geben ein neues Ergebnis zurück, ohne dabei den Zustand außerhalb der Funktion zu beeinflussen.

#### **Unterschied zur imperativen Programmierung**

In der imperativen Programmierung hätte man möglicherweise den Zustand direkt geändert, was schwer nachzuverfolgende Fehler verursachen kann. Durch den funktionalen Ansatz bleibt der ursprüngliche Zustand unverändert, und Fehlerquellen werden minimiert.

### **Memoization**

Zur Verbesserung der Performance wurden `useMemo`-Hooks eingesetzt, um komplexe Berechnungen wie Filter- und Sortieroperationen nur dann auszuführen, wenn die relevanten Abhängigkeiten sich ändern.

```javascript
const processedCars = useMemo(() => {
    let result = filterCars(cars, searchTerm);
    return sortCars(result, sortCategory, isAscending);
}, [cars, searchTerm, sortCategory, isAscending]);
```

### **Pagination mit Paginierung**

Die Paginierung wurde ebenfalls mit einem funktionalen Ansatz umgesetzt, um die Anzeige von Datensätzen effizient zu steuern:

```javascript
const currentCars = useMemo(() => {
    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    return processedCars.slice(indexOfFirstCar, indexOfLastCar);
}, [processedCars, currentPage, itemsPerPage]);
```

---

## **Reflexion**

### **Herausforderungen und Lösungen**

1. **Filter- und Sortierlogik**:
    
    - **Herausforderung**: Die korrekte Reihenfolge der Autos zu garantieren und diese nach verschiedenen Kriterien zu sortieren.
    - **Lösung**: Higher-Order Functions und reine Funktionen ermöglichten es, die Filter- und Sortierlogik sauber zu implementieren.
2. **Paginierung und Performance**:
    
    - **Herausforderung**: Die Datenmenge sollte nicht auf einmal gerendert werden, um die Performance der Anwendung sicherzustellen.
    - **Lösung**: Einsatz von `useMemo` und Paginierungslogik, um nur den aktuell sichtbaren Teil der Daten zu berechnen und anzuzeigen.
3. **Frontend-Performance**:
    
    - **Herausforderung**: Verzögerungen bei der Suche zu minimieren.
    - **Lösung**: Implementierung von Debouncing, um unnötige Rechenoperationen zu vermeiden:
        
        ```javascript
        let debounceTimeout;
        function handleSearch(value) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                setSearchTerm(value);
            }, 300);
        }
        ```
        

### **Was wir gelernt habe**

Durch das Projekt haben wir gelernt, wie funktionale Programmierung gezielt eingesetzt werden kann, um die Lesbarkeit des Codes in passenden Situationen zu verbessern.

---

## **Notengebung**

### **Selbstbewertung**

Giulian Mazzeo: **5.5**
Sven Lübcke: **5.5**

Wir haben nicht nur alle Anforderungen erfüllt, sondern zusätzlich auch die Funktion zur Hinzufügung neuer Autos erfolgreich implementiert.
