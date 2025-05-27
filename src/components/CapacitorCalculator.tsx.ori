
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Zap, Languages, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { translations } from '@/utils/translations';

interface CapacitorResult {
  capacitance: string;
  numericCode: string;
  colorCode: string[];
  colorNames: string[];
}

const CapacitorCalculator = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];
  
  const [capacitance, setCapacitance] = useState('');
  const [unit, setUnit] = useState('uF');
  const [numericCode, setNumericCode] = useState('');
  const [firstBand, setFirstBand] = useState('');
  const [secondBand, setSecondBand] = useState('');
  const [multiplierBand, setMultiplierBand] = useState('');
  const [result, setResult] = useState<CapacitorResult | null>(null);

  // Tabella dei codici colore per condensatori al tantalio
  const colorCodes = {
    '0': { color: '#000000', name: language === 'it' ? 'Nero' : 'Black' },
    '1': { color: '#8B4513', name: language === 'it' ? 'Marrone' : 'Brown' },
    '2': { color: '#FF0000', name: language === 'it' ? 'Rosso' : 'Red' },
    '3': { color: '#FFA500', name: language === 'it' ? 'Arancione' : 'Orange' },
    '4': { color: '#FFFF00', name: language === 'it' ? 'Giallo' : 'Yellow' },
    '5': { color: '#008000', name: language === 'it' ? 'Verde' : 'Green' },
    '6': { color: '#0000FF', name: language === 'it' ? 'Blu' : 'Blue' },
    '7': { color: '#800080', name: language === 'it' ? 'Viola' : 'Violet' },
    '8': { color: '#808080', name: language === 'it' ? 'Grigio' : 'Grey' },
    '9': { color: '#FFFFFF', name: language === 'it' ? 'Bianco' : 'White' }
  };

  const convertCapacitanceToCode = () => {
    if (!capacitance) return;

    let valueInPicofarads = parseFloat(capacitance);
    
    // Converte in picofarad
    switch (unit) {
      case 'uF':
        valueInPicofarads *= 1000000;
        break;
      case 'nF':
        valueInPicofarads *= 1000;
        break;
      case 'pF':
        // già in picofarad
        break;
    }

    // Genera il codice numerico a 3 cifre
    const valueStr = Math.round(valueInPicofarads).toString();
    let numCode = '';
    
    if (valueInPicofarads < 100) {
      numCode = Math.round(valueInPicofarads).toString().padStart(2, '0');
    } else {
      const significantDigits = valueStr.substring(0, 2);
      const multiplier = valueStr.length - 2;
      numCode = significantDigits + multiplier.toString();
    }

    // Genera il codice colore
    const colors: string[] = [];
    const colorNames: string[] = [];
    
    for (let digit of numCode) {
      colors.push(colorCodes[digit as keyof typeof colorCodes].color);
      colorNames.push(colorCodes[digit as keyof typeof colorCodes].name);
    }

    setResult({
      capacitance: `${capacitance} ${unit}`,
      numericCode: numCode,
      colorCode: colors,
      colorNames: colorNames
    });
  };

  const convertCodeToCapacitance = () => {
    if (!numericCode || numericCode.length !== 3) return;

    const firstDigit = parseInt(numericCode[0]);
    const secondDigit = parseInt(numericCode[1]);
    const multiplier = parseInt(numericCode[2]);

    const valueInPicofarads = (firstDigit * 10 + secondDigit) * Math.pow(10, multiplier);

    let displayValue = valueInPicofarads;
    let displayUnit = 'pF';

    if (valueInPicofarads >= 1000000) {
      displayValue = valueInPicofarads / 1000000;
      displayUnit = 'µF';
    } else if (valueInPicofarads >= 1000) {
      displayValue = valueInPicofarads / 1000;
      displayUnit = 'nF';
    }

    const colors: string[] = [];
    const colorNames: string[] = [];
    
    for (let digit of numericCode) {
      colors.push(colorCodes[digit as keyof typeof colorCodes].color);
      colorNames.push(colorCodes[digit as keyof typeof colorCodes].name);
    }

    setResult({
      capacitance: `${displayValue} ${displayUnit}`,
      numericCode: numericCode,
      colorCode: colors,
      colorNames: colorNames
    });
  };

  const convertColorToCapacitance = () => {
    if (!firstBand || !secondBand || !multiplierBand) return;

    const code = firstBand + secondBand + multiplierBand;
    const firstDigit = parseInt(firstBand);
    const secondDigit = parseInt(secondBand);
    const multiplier = parseInt(multiplierBand);

    const valueInPicofarads = (firstDigit * 10 + secondDigit) * Math.pow(10, multiplier);

    let displayValue = valueInPicofarads;
    let displayUnit = 'pF';

    if (valueInPicofarads >= 1000000) {
      displayValue = valueInPicofarads / 1000000;
      displayUnit = 'µF';
    } else if (valueInPicofarads >= 1000) {
      displayValue = valueInPicofarads / 1000;
      displayUnit = 'nF';
    }

    const colors: string[] = [];
    const colorNames: string[] = [];
    
    for (let digit of code) {
      colors.push(colorCodes[digit as keyof typeof colorCodes].color);
      colorNames.push(colorCodes[digit as keyof typeof colorCodes].name);
    }

    setResult({
      capacitance: `${displayValue} ${displayUnit}`,
      numericCode: code,
      colorCode: colors,
      colorNames: colorNames
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <div className="flex gap-2 ml-4">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="dark:border-gray-600 dark:text-gray-300"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              <Button
                onClick={toggleLanguage}
                variant="outline"
                size="sm"
                className="dark:border-gray-600 dark:text-gray-300"
              >
                <Languages className="w-4 h-4 mr-2" />
                {t.language}
              </Button>
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.subtitle}
          </p>
        </div>

        <Tabs defaultValue="to-code" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 dark:bg-gray-800">
            <TabsTrigger value="to-code" className="dark:data-[state=active]:bg-gray-700">{t.capacityToCode}</TabsTrigger>
            <TabsTrigger value="to-capacitance" className="dark:data-[state=active]:bg-gray-700">{t.codeToCapacity}</TabsTrigger>
            <TabsTrigger value="color-to-capacitance" className="dark:data-[state=active]:bg-gray-700">{t.colorToCapacity}</TabsTrigger>
          </TabsList>

          <TabsContent value="to-code">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Calculator className="w-5 h-5" />
                  {t.convertCapacityTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="capacitance" className="dark:text-gray-200">{t.capacity}</Label>
                    <Input
                      id="capacitance"
                      type="number"
                      step="any"
                      value={capacitance}
                      onChange={(e) => setCapacitance(e.target.value)}
                      placeholder="es. 10"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit" className="dark:text-gray-200">{t.unit}</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="pF" className="dark:text-white dark:focus:bg-gray-600">pF (picofarad)</SelectItem>
                        <SelectItem value="nF" className="dark:text-white dark:focus:bg-gray-600">nF (nanofarad)</SelectItem>
                        <SelectItem value="uF" className="dark:text-white dark:focus:bg-gray-600">µF (microfarad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={convertCapacitanceToCode}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700"
                    >
                      {t.calculate}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="to-capacitance">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Calculator className="w-5 h-5" />
                  {t.convertCodeTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numericCode" className="dark:text-gray-200">{t.numericCode}</Label>
                    <Input
                      id="numericCode"
                      type="text"
                      maxLength={3}
                      value={numericCode}
                      onChange={(e) => setNumericCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="es. 106"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={convertCodeToCapacitance}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 dark:from-green-600 dark:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700"
                    >
                      {t.calculate}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="color-to-capacitance">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Calculator className="w-5 h-5" />
                  {t.convertColorTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="firstBand" className="dark:text-gray-200">{t.firstBand}</Label>
                    <Select value={firstBand} onValueChange={setFirstBand}>
                      <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Seleziona colore" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        {Object.entries(colorCodes).slice(1).map(([digit, { color, name }]) => (
                          <SelectItem key={digit} value={digit} className="dark:text-white dark:focus:bg-gray-600">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: color }}
                              ></div>
                              {name} ({digit})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="secondBand" className="dark:text-gray-200">{t.secondBand}</Label>
                    <Select value={secondBand} onValueChange={setSecondBand}>
                      <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Seleziona colore" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        {Object.entries(colorCodes).map(([digit, { color, name }]) => (
                          <SelectItem key={digit} value={digit} className="dark:text-white dark:focus:bg-gray-600">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: color }}
                              ></div>
                              {name} ({digit})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="multiplier" className="dark:text-gray-200">{t.multiplier}</Label>
                    <Select value={multiplierBand} onValueChange={setMultiplierBand}>
                      <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Seleziona colore" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        {Object.entries(colorCodes).map(([digit, { color, name }]) => (
                          <SelectItem key={digit} value={digit} className="dark:text-white dark:focus:bg-gray-600">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: color }}
                              ></div>
                              {name} (×10^{digit})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={convertColorToCapacitance}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700"
                    >
                      {t.calculate}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {result && (
          <Card className="mt-8 shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">{t.result}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{t.capacity}</h3>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{result.capacitance}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">{t.numericCode}</h3>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{result.numericCode}</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">{t.colorCode}</h3>
                  <div className="flex justify-center gap-2 mt-2">
                    {result.colorCode.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-8 h-12 rounded border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p className="text-xs mt-1 font-medium dark:text-gray-300">{result.colorNames[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8 shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-300">
          <CardHeader>
            <CardTitle className="dark:text-white">{t.colorReference}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(colorCodes).map(([digit, { color, name }]) => (
                <div key={digit} className="text-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div
                    className="w-6 h-8 mx-auto rounded border-2 border-gray-300 dark:border-gray-600 shadow-sm mb-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p className="font-bold text-lg dark:text-white">{digit}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CapacitorCalculator;
