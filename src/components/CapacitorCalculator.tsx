import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Zap, Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';

interface CapacitorResult {
  capacitance: string;
  numericCode: string;
  colorCode: string[];
  colorNames: string[];
}

const CapacitorCalculator = () => {
  const { language, toggleLanguage } = useLanguage();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="ml-4"
            >
              <Languages className="w-4 h-4 mr-2" />
              {language === 'it' ? 'EN' : 'IT'}
            </Button>
          </div>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <Tabs defaultValue="to-code" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="to-code">{t.capacityToCode}</TabsTrigger>
            <TabsTrigger value="to-capacitance">{t.codeToCapacity}</TabsTrigger>
            <TabsTrigger value="color-to-capacitance">{t.colorToCapacity}</TabsTrigger>
          </TabsList>

          <TabsContent value="to-code">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {t.convertCapacityTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="capacitance">{t.capacity}</Label>
                    <Input
                      id="capacitance"
                      type="number"
                      step="any"
                      value={capacitance}
                      onChange={(e) => setCapacitance(e.target.value)}
                      placeholder="es. 10"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">{t.unit}</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pF">pF (picofarad)</SelectItem>
                        <SelectItem value="nF">nF (nanofarad)</SelectItem>
                        <SelectItem value="uF">µF (microfarad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={convertCapacitanceToCode}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      {t.calculate}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="to-capacitance">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {t.convertCodeTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numericCode">{t.numericCode}</Label>
                    <Input
                      id="numericCode"
                      type="text"
                      maxLength={3}
                      value={numericCode}
                      onChange={(e) => setNumericCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="es. 106"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={convertCodeToCapacitance}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      {t.calculate}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="color-to-capacitance">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {t.convertColorTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="firstBand">{t.firstBand}</Label>
                    <Select value={firstBand} onValueChange={setFirstBand}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleziona colore" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(colorCodes).slice(1).map(([digit, { color, name }]) => (
                          <SelectItem key={digit} value={digit}>
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
                    <Label htmlFor="secondBand">{t.secondBand}</Label>
                    <Select value={secondBand} onValueChange={setSecondBand}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleziona colore" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(colorCodes).map(([digit, { color, name }]) => (
                          <SelectItem key={digit} value={digit}>
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
                    <Label htmlFor="multiplier">{t.multiplier}</Label>
                    <Select value={multiplierBand} onValueChange={setMultiplierBand}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleziona colore" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(colorCodes).map(([digit, { color, name }]) => (
                          <SelectItem key={digit} value={digit}>
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
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
          <Card className="mt-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-700">{t.result}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">{t.capacity}</h3>
                  <p className="text-2xl font-bold text-blue-800">{result.capacitance}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2">{t.numericCode}</h3>
                  <p className="text-2xl font-bold text-purple-800">{result.numericCode}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">{t.colorCode}</h3>
                  <div className="flex justify-center gap-2 mt-2">
                    {result.colorCode.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-8 h-12 rounded border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p className="text-xs mt-1 font-medium">{result.colorNames[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{t.colorReference}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(colorCodes).map(([digit, { color, name }]) => (
                <div key={digit} className="text-center p-3 border rounded-lg bg-gray-50">
                  <div
                    className="w-6 h-8 mx-auto rounded border-2 border-gray-300 shadow-sm mb-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p className="font-bold text-lg">{digit}</p>
                  <p className="text-sm text-gray-600">{name}</p>
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
