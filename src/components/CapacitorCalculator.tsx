
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Zap } from 'lucide-react';

interface CapacitorResult {
  capacitance: string;
  numericCode: string;
  colorCode: string[];
  colorNames: string[];
}

const CapacitorCalculator = () => {
  const [capacitance, setCapacitance] = useState('');
  const [unit, setUnit] = useState('uF');
  const [numericCode, setNumericCode] = useState('');
  const [result, setResult] = useState<CapacitorResult | null>(null);

  // Tabella dei codici colore per condensatori al tantalio
  const colorCodes = {
    '0': { color: '#000000', name: 'Nero' },
    '1': { color: '#8B4513', name: 'Marrone' },
    '2': { color: '#FF0000', name: 'Rosso' },
    '3': { color: '#FFA500', name: 'Arancione' },
    '4': { color: '#FFFF00', name: 'Giallo' },
    '5': { color: '#008000', name: 'Verde' },
    '6': { color: '#0000FF', name: 'Blu' },
    '7': { color: '#800080', name: 'Viola' },
    '8': { color: '#808080', name: 'Grigio' },
    '9': { color: '#FFFFFF', name: 'Bianco' }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calcolatore Condensatori
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Converte tra capacità, codici numerici e codici colore per condensatori ceramici e al tantalio
          </p>
        </div>

        <Tabs defaultValue="to-code" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="to-code">Capacità → Codice</TabsTrigger>
            <TabsTrigger value="to-capacitance">Codice → Capacità</TabsTrigger>
          </TabsList>

          <TabsContent value="to-code">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Converti Capacità in Codice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="capacitance">Capacità</Label>
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
                    <Label htmlFor="unit">Unità</Label>
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
                      Calcola
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
                  Converti Codice in Capacità
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numericCode">Codice Numerico (3 cifre)</Label>
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
                      Calcola
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
              <CardTitle className="text-green-700">Risultato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Capacità</h3>
                  <p className="text-2xl font-bold text-blue-800">{result.capacitance}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2">Codice Numerico</h3>
                  <p className="text-2xl font-bold text-purple-800">{result.numericCode}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">Codice Colore</h3>
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
            <CardTitle>Tabella di Riferimento Colori</CardTitle>
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
