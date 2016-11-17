A function for converting numbers to and from different bases w/o loss of precision.
===

Adapted from [http://www.danvk.org/hex2dec.html](http://www.danvk.org/hex2dec.html)

The problem is that parseInt("0x12345...") isn't precise enough to convert
big integers correctly. This uses strings as input and, internally, arrays as workhorses.




## API
This module exports a function, `convertBase` (this function __is__ the module export), with a few shorthand methods (as properties of the exported function).

### convertBase(string input, number fromBase, number toBase) : string
Converts a string representation of a number in base `fromBase` and converts it into a string respresentation in base `toBase`. That's it.

### hexToDec(string input)
Shorthand for `convertBase(input, 16, 10)`.

### decToHex(string input)
Shorthand for `convertBase(input, 10, 16)`.

### decToBin(string input)
Shorthand for `convertBase(input, 10, 2)`.

### binToDec(string input)
Shorthand for `convertBase(input, 2, 10)`.

### hexToBin(string input)
Shorthand for `convertBase(input, 16, 2)`.

### binToHex(string input)
Shorthand for `convertBase(input, 2, 16)`.
